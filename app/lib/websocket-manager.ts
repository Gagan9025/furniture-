// WebSocket manager for real-time updates
// This creates a mock WebSocket implementation that works with React Router and Vite

import { broadcastContentUpdate, type ContentUpdate } from './products';

declare global {
  interface Window {
    __REALTIME_UPDATES__: {
      handlers: Array<(data: any) => void>;
      broadcast: (data: any) => void;
    };
  }
}

// Initialize global update handler
if (typeof window !== 'undefined') {
  if (!window.__REALTIME_UPDATES__) {
    window.__REALTIME_UPDATES__ = {
      handlers: [],
      broadcast: (data: any) => {
        // When an update is received, broadcast it to all registered handlers
        window.__REALTIME_UPDATES__.handlers.forEach(handler => {
          try {
            handler(data);
          } catch (error) {
            console.error('Error in realtime update handler:', error);
          }
        });
      }
    };
  }
}

// Function to register a handler for real-time updates
export function registerUpdateHandler(handler: (data: ContentUpdate) => void) {
  if (typeof window !== 'undefined' && window.__REALTIME_UPDATES__) {
    window.__REALTIME_UPDATES__.handlers.push(handler);
    
    // Return a function to unregister the handler
    return () => {
      const index = window.__REALTIME_UPDATES__.handlers.indexOf(handler);
      if (index !== -1) {
        window.__REALTIME_UPDATES__.handlers.splice(index, 1);
      }
    };
  }
  
  // Return a no-op function if not in browser
  return () => {};
}

// Function to broadcast an update (used by the server simulation)
export function broadcastUpdateFromServer(update: ContentUpdate) {
  if (typeof window !== 'undefined' && window.__REALTIME_UPDATES__) {
    window.__REALTIME_UPDATES__.broadcast(update);
  }
}

// Initialize the handler that will broadcast to the local state management
if (typeof window !== 'undefined' && window.__REALTIME_UPDATES__) {
  registerUpdateHandler((update: ContentUpdate) => {
    // Broadcast the update to the local event system
    broadcastContentUpdate(update);
  });
}
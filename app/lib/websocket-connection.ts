// WebSocket connection manager for real-time updates
import { broadcastContentUpdate, type ContentUpdate } from './products';

class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private handlers: Array<(data: ContentUpdate) => void> = [];
  private isConnected = false;

  constructor() {
    this.connect();
  }

  private connect() {
    // In development, we'll use a fallback mechanism since direct WebSocket might not work
    // with React Router dev server. We'll simulate WebSocket behavior using fetch polling.
    
    // This is a simulated WebSocket connection using periodic polling
    this.simulateWebSocketConnection();
  }

  private simulateWebSocketConnection() {
    // Poll the server periodically to check for updates
    const pollForUpdates = async () => {
      try {
        // We'll use localStorage to simulate server-side updates
        const lastUpdateStr = localStorage.getItem('__SIMULATED_SERVER_UPDATES__');
        if (lastUpdateStr) {
          const lastUpdate = JSON.parse(lastUpdateStr);
          // Clear the stored update to prevent duplicate processing
          localStorage.removeItem('__SIMULATED_SERVER_UPDATES__');
          
          // Process the update
          this.processUpdate(lastUpdate);
        }
      } catch (error) {
        console.error('Error polling for updates:', error);
      }
      
      // Schedule next poll
      setTimeout(pollForUpdates, 2000); // Poll every 2 seconds
    };
    
    // Start polling
    pollForUpdates();
    this.isConnected = true;
  }

  private processUpdate(update: ContentUpdate) {
    // Broadcast the update to all registered handlers
    this.handlers.forEach(handler => {
      try {
        handler(update);
      } catch (error) {
        console.error('Error in update handler:', error);
      }
    });
  }

  public addHandler(handler: (data: ContentUpdate) => void) {
    this.handlers.push(handler);
    return () => {
      const index = this.handlers.indexOf(handler);
      if (index !== -1) {
        this.handlers.splice(index, 1);
      }
    };
  }

  public broadcastLocally(update: ContentUpdate) {
    // Directly broadcast to local handlers (for immediate updates)
    this.processUpdate(update);
  }

  public getIsConnected() {
    return this.isConnected;
  }
}

// Create a singleton instance
const wsManager = new WebSocketManager();
export default wsManager;

// Also export a function to simulate server updates
export function simulateServerUpdate(update: ContentUpdate) {
  // Store the update in localStorage for the simulated connection to pick up
  localStorage.setItem('__SIMULATED_SERVER_UPDATES__', JSON.stringify(update));
}
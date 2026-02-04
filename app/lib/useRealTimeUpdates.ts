import { useEffect, useRef } from 'react';
import { broadcastContentUpdate, type ContentUpdate } from './products';
import wsManager from './websocket-connection';

// Client-side hook to listen for server-side real-time updates
export function useRealTimeUpdates() {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Register the update handler with the WebSocket manager
    const unsubscribe = wsManager.addHandler((update: ContentUpdate) => {
      broadcastContentUpdate(update);
    });
    
    // Store the unsubscribe function for cleanup
    unsubscribeRef.current = unsubscribe;

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // Return a function to manually trigger updates (for testing purposes)
  const triggerUpdate = (update: ContentUpdate) => {
    broadcastContentUpdate(update);
  };

  return { triggerUpdate };
}

// Alternative implementation using a polling approach for reliability
export function usePollingUpdates(refreshCallback: () => void, interval: number = 30000) {
  useEffect(() => {
    const pollInterval = setInterval(refreshCallback, interval);
    
    return () => {
      clearInterval(pollInterval);
    };
  }, [refreshCallback, interval]);
}
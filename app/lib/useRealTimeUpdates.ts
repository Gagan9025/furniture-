import { useEffect, useRef } from 'react';
import { broadcastContentUpdate, type ContentUpdate } from './products';

// Client-side hook to listen for server-side real-time updates
export function useRealTimeUpdates() {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Check if EventSource is available (browser environment)
    if (typeof window !== 'undefined' && window.EventSource) {
      // Connect to the SSE endpoint
      eventSourceRef.current = new EventSource('/api/updates');
      
      // When we receive an update from the server, broadcast it locally
      eventSourceRef.current.onmessage = (event) => {
        try {
          const update: ContentUpdate = JSON.parse(event.data);
          broadcastContentUpdate(update);
        } catch (error) {
          console.error('Error parsing server update:', error);
        }
      };
      
      // Handle errors
      eventSourceRef.current.onerror = (error) => {
        console.error('SSE connection error:', error);
        if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
          console.log('SSE connection closed');
        }
      };
      
      // Cleanup function
      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
      };
    } else {
      console.warn('EventSource is not supported in this browser');
    }
  }, []);

  // Return a function to manually trigger updates (for testing purposes)
  const triggerUpdate = (update: ContentUpdate) => {
    broadcastContentUpdate(update);
  };

  return { triggerUpdate };
}

// Alternative implementation using a polling approach for now
export function usePollingUpdates(refreshCallback: () => void, interval: number = 30000) {
  useEffect(() => {
    const pollInterval = setInterval(refreshCallback, interval);
    
    return () => {
      clearInterval(pollInterval);
    };
  }, [refreshCallback, interval]);
}
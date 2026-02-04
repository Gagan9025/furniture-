import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

// Store for active connections (using global to persist across module reloads)
declare global {
  var sseConnections: Map<string, ReadableStreamDefaultController>;
  var sseLastUpdate: any;
}

if (!global.sseConnections) {
  global.sseConnections = new Map<string, ReadableStreamDefaultController>();
}
const connections = global.sseConnections;

if (!global.sseLastUpdate) {
  global.sseLastUpdate = null;
}
let lastUpdate = global.sseLastUpdate;

// SSE Headers
const sseHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Access-Control-Allow-Origin": "*",
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Generate a unique ID for this connection
      const connectionId = `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Store the connection controller
      connections.set(connectionId, controller);

      // Send the last update if available
      if (lastUpdate) {
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(lastUpdate)}\n\n`)
        );
      }

      // Send a ping periodically to keep the connection alive
      const interval = setInterval(() => {
        controller.enqueue(new TextEncoder().encode(": ping\n\n"));
      }, 30000);

      // Handle connection close
      const onClose = () => {
        clearInterval(interval);
        connections.delete(connectionId);
      };

      // We can't directly attach event listeners, but the controller will be cleaned up when the connection closes
    }
  });

  return new Response(stream, { headers: sseHeaders });
}

// Function to broadcast updates to all connected clients
export function broadcastUpdate(update: any) {
  lastUpdate = update;
  global.sseLastUpdate = update;
  
  for (const [connectionId, controller] of connections) {
    try {
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify(update)}\n\n`)
      );
    } catch (error) {
      // Connection likely closed, remove it
      connections.delete(connectionId);
    }
  }
}

// Export the broadcast function for use in other modules
export { broadcastUpdate as broadcastServerUpdate };

// Action to receive update requests from admin panel
export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  
  // Broadcast the update to all connected clients
  broadcastUpdate(data);
  
  return { success: true };
}
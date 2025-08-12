#!/usr/bin/env node
import { createServer } from "./server.js";
import { API_KEY } from "./config.js";

/**
 * Main function - Program entry point
 */
async function main() {
  // Ensure API key exists
  if (!API_KEY) {
    console.error("SEARCH1API_KEY environment variable is not set");
    process.exit(1);
  }

  try {
    console.error("Starting Search1API MCP server");
    const server = createServer();
    
    // Start server
    await server.start();
    console.error("Server started successfully");
    
    // Handle process exit signals
    setupExitHandlers(server);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

/**
 * Set up process exit signal handlers
 */
function setupExitHandlers(server: any) {
  const exitHandler = async () => {
    console.error("Shutting down server...");
    await server.stop();
    process.exit(0);
  };

  // Handle various exit signals
  process.on("SIGINT", exitHandler);
  process.on("SIGTERM", exitHandler);
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);
}

// Start program
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

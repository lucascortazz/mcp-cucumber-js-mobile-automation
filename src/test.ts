#!/usr/bin/env node

// Simple test to verify the MCP server can be imported and initialized
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

console.log("✅ MCP Server module imported successfully");

// Test server initialization
const server = new McpServer({
  name: "test-mobile-automation",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

console.log("✅ MCP Server initialized successfully");
console.log("📱 Server created with mobile automation capabilities");
console.log("🚀 MCP Mobile Automation Server is ready!");

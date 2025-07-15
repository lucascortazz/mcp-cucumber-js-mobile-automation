# GitHub Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## MCP Server for Mobile Automation

This is a Model Context Protocol (MCP) server project that provides mobile automation testing capabilities. The server integrates with the existing Cucumber.js mobile automation framework to expose mobile testing tools to AI assistants.

### Key Context

- **Framework**: TypeScript-based MCP server using @modelcontextprotocol/sdk
- **Purpose**: Expose mobile testing capabilities (calculator tests, device management, test execution)
- **Integration**: Connects to existing Cucumber.js mobile automation framework
- **Target**: Provide mobile automation tools to AI assistants via MCP

### Development Guidelines

1. **MCP Tools**: Focus on creating meaningful tools that expose mobile automation capabilities
2. **Type Safety**: Use TypeScript and Zod for proper schema validation
3. **Integration**: Leverage existing Cucumber.js framework from the parent project
4. **Documentation**: Maintain clear tool descriptions and parameter schemas

### Resources

- MCP Documentation: https://modelcontextprotocol.io/llms-full.txt
- SDK Reference: https://github.com/modelcontextprotocol/create-python-server
- You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt

### Tools to Implement

- **run_calculator_test**: Execute calculator app tests
- **get_device_info**: Get available device information
- **execute_cucumber_scenario**: Run specific test scenarios
- **get_test_results**: Retrieve test execution results
- **upload_apk**: Upload APK files to BrowserStack

# MCP Mobile Automation Server

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-orange)](https://modelcontextprotocol.io/)

A Model Context Protocol (MCP) server that provides mobile automation testing capabilities through integration with Cucumber.js framework. This server exposes mobile testing tools to AI assistants, enabling automated testing of mobile applications.

## 🚀 Features

- **Calculator App Testing** - Execute comprehensive calculator functionality tests
- **Device Management** - Get information about available devices and configurations
- **Test Execution** - Run specific Cucumber scenarios with custom parameters
- **APK Management** - Upload APK files to BrowserStack for testing
- **Multilingual Support** - Demonstrate multilingual device parsing capabilities
- **Project Status** - Get current project configuration and status

## 📋 Available Tools

### 1. `run_calculator_test`
Execute calculator app tests using the Cucumber.js framework.

**Parameters:**
- `scenario` (optional): Specific scenario to run (e.g., "Basic Calculator Addition")
- `device` (optional): Device to test on (e.g., "iPhone 12")
- `os_version` (optional): OS version (e.g., "14")

### 2. `get_test_scenarios`
Get a list of available test scenarios from feature files.

### 3. `get_device_info`
Get information about available devices and configurations.

### 4. `execute_cucumber_scenario`
Run a specific Cucumber scenario with custom parameters.

**Parameters:**
- `feature`: Feature file name (e.g., "calculator.feature")
- `scenario_name` (optional): Specific scenario name to run
- `device` (optional): Device to test on
- `platform` (optional): Platform to test on (iOS/Android)

### 5. `upload_apk`
Upload APK file to BrowserStack for testing.

**Parameters:**
- `apk_path`: Path to APK file (relative to project root)

### 6. `get_project_status`
Get current status and configuration of the mobile automation project.

### 7. `run_multilingual_demo`
Execute multilingual device parsing demonstration.

**Parameters:**
- `language` (optional): Language to demo (english/portuguese/spanish/all)

## 🛠 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mcp-cucumber-js-mobile-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Prerequisites
- Node.js 16 or higher
- TypeScript
- Access to the parent Cucumber.js mobile automation project at:
  `/Users/lucascortazzo/code/cucumber-js-mobile-automation`

### VS Code Integration
The server includes a VS Code MCP configuration file at `.vscode/mcp.json`. This allows you to debug and test the MCP server directly in VS Code.

### Claude Desktop Integration
To use this server with Claude Desktop, add the following to your Claude Desktop configuration:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\\Claude\\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mobile-automation": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-cucumber-js-mobile-automation/build/index.js"]
    }
  }
}
```

## 🚦 Usage

### Running the Server
```bash
# Start the server
npm start

# Or run in development mode
npm run dev
```

### Example Commands
Once connected to an MCP client (like Claude Desktop), you can use these commands:

- "Run calculator tests on iPhone 12"
- "Show me available test scenarios"
- "Execute the Basic Calculator Addition scenario"
- "Get device information"
- "Upload the Calculator.apk file"
- "Show project status"
- "Run multilingual demo in Portuguese"

## 🔗 Integration

This MCP server integrates with the existing Cucumber.js mobile automation framework located at:
`/Users/lucascortazzo/code/cucumber-js-mobile-automation`

The server provides a bridge between MCP clients and the mobile automation testing capabilities, allowing AI assistants to:
- Execute mobile tests
- Manage test scenarios
- Handle device configurations
- Process test results

## 📝 Development

### Project Structure
```
mcp-cucumber-js-mobile-automation/
├── src/
│   └── index.ts          # Main MCP server implementation
├── build/                # Compiled JavaScript output
├── .vscode/
│   └── mcp.json         # VS Code MCP configuration
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tsconfig.json
└── README.md
```

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the MCP server
- `npm run dev` - Build and start in development mode

### Debugging
You can debug this MCP server using VS Code with the included MCP configuration. The server logs to stderr, so you can monitor its activity during development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test the server
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ using the Model Context Protocol SDK and TypeScript.

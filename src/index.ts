#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from "child_process";
import { readFileSync, existsSync } from "fs";
import * as path from "path";

// Configuration
const CUCUMBER_PROJECT_PATH = "/Users/lucascortazzo/code/cucumber-js-mobile-automation";

// Create server instance
const server = new McpServer({
  name: "mobile-automation",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function to execute shell commands
async function executeCommand(command: string, args: string[], cwd?: string): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { 
      cwd: cwd || CUCUMBER_PROJECT_PATH,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code || 0 });
    });
  });
}

// Helper function to read file contents
function readProjectFile(filePath: string): string {
  const fullPath = path.join(CUCUMBER_PROJECT_PATH, filePath);
  if (!existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return readFileSync(fullPath, 'utf-8');
}

// Tool: Run Calculator Tests
server.tool(
  "run_calculator_test",
  "Execute calculator app tests using Cucumber.js framework",
  {
    scenario: z.string().optional().describe("Specific scenario to run (e.g., 'Basic Calculator Addition')"),
    device: z.string().optional().describe("Device to test on (e.g., 'iPhone 12')"),
    os_version: z.string().optional().describe("OS version (e.g., '14')"),
  },
  async ({ scenario, device, os_version }) => {
    try {
      // Set environment variables
      const env = process.env;
      if (device) env.DEVICE = device;
      if (os_version) env.OS_VERSION = os_version;

      // Build command
      let command = "npm";
      let args = ["test"];
      
      if (scenario) {
        args = ["run", "test:calculator", "--", "--grep", scenario];
      } else {
        args = ["run", "test:calculator"];
      }

      console.error(`Executing: ${command} ${args.join(' ')}`);
      
      const result = await executeCommand(command, args);
      
      return {
        content: [
          {
            type: "text",
            text: `Calculator Test Results:\n\nSTDOUT:\n${result.stdout}\n\nSTDERR:\n${result.stderr}\n\nExit Code: ${result.exitCode}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error running calculator tests: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Get Available Test Scenarios
server.tool(
  "get_test_scenarios",
  "Get list of available test scenarios from feature files",
  {},
  async () => {
    try {
      const calculatorFeature = readProjectFile('features/calculator.feature');
      const reminderFeature = readProjectFile('features/openReminders.feature');
      
      // Extract scenarios from feature files
      const extractScenarios = (content: string) => {
        const scenarios = [];
        const lines = content.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('Scenario:')) {
            scenarios.push(line.trim().replace('Scenario:', '').trim());
          }
        }
        return scenarios;
      };

      const calculatorScenarios = extractScenarios(calculatorFeature);
      const reminderScenarios = extractScenarios(reminderFeature);

      return {
        content: [
          {
            type: "text",
            text: `Available Test Scenarios:\n\n📱 Calculator App:\n${calculatorScenarios.map(s => `  • ${s}`).join('\n')}\n\n📋 Reminder App:\n${reminderScenarios.map(s => `  • ${s}`).join('\n')}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading test scenarios: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Get Device Information
server.tool(
  "get_device_info",
  "Get information about available devices and configurations",
  {},
  async () => {
    try {
      const packageJson = JSON.parse(readProjectFile('package.json'));
      const scripts = packageJson.scripts || {};
      
      const deviceInfo = {
        supportedPlatforms: ["iOS", "Android"],
        testScripts: Object.keys(scripts).filter(key => key.startsWith('test')),
        sampleDevices: [
          "iPhone 12",
          "iPhone 13",
          "iPhone 14 Pro",
          "iPhone 15",
          "iPad Pro"
        ],
        sampleOSVersions: ["14", "15", "16", "17"],
        capabilities: [
          "Calculator app testing",
          "Reminder app testing",
          "BrowserStack integration",
          "Multilingual support"
        ]
      };

      return {
        content: [
          {
            type: "text",
            text: `Device Information:\n\n${JSON.stringify(deviceInfo, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting device info: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Execute Cucumber Scenario
server.tool(
  "execute_cucumber_scenario",
  "Run a specific Cucumber scenario with custom parameters",
  {
    feature: z.string().describe("Feature file name (e.g., 'calculator.feature')"),
    scenario_name: z.string().optional().describe("Specific scenario name to run"),
    device: z.string().optional().describe("Device to test on"),
    platform: z.enum(["iOS", "Android"]).optional().describe("Platform to test on"),
  },
  async ({ feature, scenario_name, device, platform }) => {
    try {
      // Set environment variables
      const env = process.env;
      if (device) env.DEVICE = device;
      if (platform) env.PLATFORM = platform;

      let command = "npx";
      let args = ["cucumber-js", `features/${feature}`];
      
      if (scenario_name) {
        args.push("--name", scenario_name);
      }

      const result = await executeCommand(command, args);
      
      return {
        content: [
          {
            type: "text",
            text: `Cucumber Execution Results:\n\nFeature: ${feature}\n${scenario_name ? `Scenario: ${scenario_name}\n` : ''}Device: ${device || 'default'}\nPlatform: ${platform || 'default'}\n\nSTDOUT:\n${result.stdout}\n\nSTDERR:\n${result.stderr}\n\nExit Code: ${result.exitCode}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing Cucumber scenario: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Upload APK to BrowserStack
server.tool(
  "upload_apk",
  "Upload APK file to BrowserStack for testing",
  {
    apk_path: z.string().describe("Path to APK file (relative to project root)"),
  },
  async ({ apk_path }) => {
    try {
      const command = "node";
      const args = ["utils/upload-apk-to-browserstack.js", apk_path];
      
      const result = await executeCommand(command, args);
      
      return {
        content: [
          {
            type: "text",
            text: `APK Upload Results:\n\nAPK Path: ${apk_path}\n\nSTDOUT:\n${result.stdout}\n\nSTDERR:\n${result.stderr}\n\nExit Code: ${result.exitCode}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error uploading APK: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Get Project Status
server.tool(
  "get_project_status",
  "Get current status and configuration of the mobile automation project",
  {},
  async () => {
    try {
      const packageJson = JSON.parse(readProjectFile('package.json'));
      const cucumberConfig = existsSync(path.join(CUCUMBER_PROJECT_PATH, 'cucumber.js')) 
        ? readProjectFile('cucumber.js')
        : "No cucumber.js config found";
      
      const projectStatus = {
        projectName: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        scripts: packageJson.scripts,
        dependencies: packageJson.dependencies,
        devDependencies: packageJson.devDependencies,
        cucumberConfig: cucumberConfig
      };

      return {
        content: [
          {
            type: "text",
            text: `Project Status:\n\n${JSON.stringify(projectStatus, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting project status: ${error}`,
          },
        ],
      };
    }
  },
);

// Tool: Run Multilingual Demo
server.tool(
  "run_multilingual_demo",
  "Execute multilingual device parsing demonstration",
  {
    language: z.enum(["english", "portuguese", "spanish", "all"]).optional().describe("Language to demo"),
  },
  async ({ language }) => {
    try {
      const command = "node";
      const args = ["utils/multilingual-demo.js"];
      
      if (language && language !== "all") {
        args.push(`--${language}`);
      }
      
      const result = await executeCommand(command, args);
      
      return {
        content: [
          {
            type: "text",
            text: `Multilingual Demo Results:\n\nLanguage: ${language || 'all'}\n\nSTDOUT:\n${result.stdout}\n\nSTDERR:\n${result.stderr}\n\nExit Code: ${result.exitCode}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error running multilingual demo: ${error}`,
          },
        ],
      };
    }
  },
);

// Main function to run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mobile Automation MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

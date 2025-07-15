#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var zod_1 = require("zod");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path = require("path");
// Configuration
var CUCUMBER_PROJECT_PATH = "/Users/lucascortazzo/code/cucumber-js-mobile-automation";
// Create server instance
var server = new mcp_js_1.McpServer({
    name: "mobile-automation",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function to execute shell commands
function executeCommand(command, args, cwd) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var child = (0, child_process_1.spawn)(command, args, {
                        cwd: cwd || CUCUMBER_PROJECT_PATH,
                        stdio: ['pipe', 'pipe', 'pipe']
                    });
                    var stdout = '';
                    var stderr = '';
                    child.stdout.on('data', function (data) {
                        stdout += data.toString();
                    });
                    child.stderr.on('data', function (data) {
                        stderr += data.toString();
                    });
                    child.on('close', function (code) {
                        resolve({ stdout: stdout, stderr: stderr, exitCode: code || 0 });
                    });
                })];
        });
    });
}
// Helper function to read file contents
function readProjectFile(filePath) {
    var fullPath = path.join(CUCUMBER_PROJECT_PATH, filePath);
    if (!(0, fs_1.existsSync)(fullPath)) {
        throw new Error("File not found: ".concat(filePath));
    }
    return (0, fs_1.readFileSync)(fullPath, 'utf-8');
}
// Tool: Run Calculator Tests
server.tool("run_calculator_test", "Execute calculator app tests using Cucumber.js framework", {
    scenario: zod_1.z.string().optional().describe("Specific scenario to run (e.g., 'Basic Calculator Addition')"),
    device: zod_1.z.string().optional().describe("Device to test on (e.g., 'iPhone 12')"),
    os_version: zod_1.z.string().optional().describe("OS version (e.g., '14')"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var env, command, args, result, error_1;
    var scenario = _b.scenario, device = _b.device, os_version = _b.os_version;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                env = process.env;
                if (device)
                    env.DEVICE = device;
                if (os_version)
                    env.OS_VERSION = os_version;
                command = "npm";
                args = ["test"];
                if (scenario) {
                    args = ["run", "test:calculator", "--", "--grep", scenario];
                }
                else {
                    args = ["run", "test:calculator"];
                }
                console.error("Executing: ".concat(command, " ").concat(args.join(' ')));
                return [4 /*yield*/, executeCommand(command, args)];
            case 1:
                result = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Calculator Test Results:\n\nSTDOUT:\n".concat(result.stdout, "\n\nSTDERR:\n").concat(result.stderr, "\n\nExit Code: ").concat(result.exitCode),
                            },
                        ],
                    }];
            case 2:
                error_1 = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Error running calculator tests: ".concat(error_1),
                            },
                        ],
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Tool: Get Available Test Scenarios
server.tool("get_test_scenarios", "Get list of available test scenarios from feature files", {}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var calculatorFeature, reminderFeature, extractScenarios, calculatorScenarios, reminderScenarios;
    return __generator(this, function (_a) {
        try {
            calculatorFeature = readProjectFile('features/calculator.feature');
            reminderFeature = readProjectFile('features/openReminders.feature');
            extractScenarios = function (content) {
                var scenarios = [];
                var lines = content.split('\n');
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    if (line.trim().startsWith('Scenario:')) {
                        scenarios.push(line.trim().replace('Scenario:', '').trim());
                    }
                }
                return scenarios;
            };
            calculatorScenarios = extractScenarios(calculatorFeature);
            reminderScenarios = extractScenarios(reminderFeature);
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Available Test Scenarios:\n\n\uD83D\uDCF1 Calculator App:\n".concat(calculatorScenarios.map(function (s) { return "  \u2022 ".concat(s); }).join('\n'), "\n\n\uD83D\uDCCB Reminder App:\n").concat(reminderScenarios.map(function (s) { return "  \u2022 ".concat(s); }).join('\n')),
                        },
                    ],
                }];
        }
        catch (error) {
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Error reading test scenarios: ".concat(error),
                        },
                    ],
                }];
        }
        return [2 /*return*/];
    });
}); });
// Tool: Get Device Information
server.tool("get_device_info", "Get information about available devices and configurations", {}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var packageJson, scripts, deviceInfo;
    return __generator(this, function (_a) {
        try {
            packageJson = JSON.parse(readProjectFile('package.json'));
            scripts = packageJson.scripts || {};
            deviceInfo = {
                supportedPlatforms: ["iOS", "Android"],
                testScripts: Object.keys(scripts).filter(function (key) { return key.startsWith('test'); }),
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
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Device Information:\n\n".concat(JSON.stringify(deviceInfo, null, 2)),
                        },
                    ],
                }];
        }
        catch (error) {
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Error getting device info: ".concat(error),
                        },
                    ],
                }];
        }
        return [2 /*return*/];
    });
}); });
// Tool: Execute Cucumber Scenario
server.tool("execute_cucumber_scenario", "Run a specific Cucumber scenario with custom parameters", {
    feature: zod_1.z.string().describe("Feature file name (e.g., 'calculator.feature')"),
    scenario_name: zod_1.z.string().optional().describe("Specific scenario name to run"),
    device: zod_1.z.string().optional().describe("Device to test on"),
    platform: zod_1.z.enum(["iOS", "Android"]).optional().describe("Platform to test on"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var env, command, args, result, error_2;
    var feature = _b.feature, scenario_name = _b.scenario_name, device = _b.device, platform = _b.platform;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                env = process.env;
                if (device)
                    env.DEVICE = device;
                if (platform)
                    env.PLATFORM = platform;
                command = "npx";
                args = ["cucumber-js", "features/".concat(feature)];
                if (scenario_name) {
                    args.push("--name", scenario_name);
                }
                return [4 /*yield*/, executeCommand(command, args)];
            case 1:
                result = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Cucumber Execution Results:\n\nFeature: ".concat(feature, "\n").concat(scenario_name ? "Scenario: ".concat(scenario_name, "\n") : '', "Device: ").concat(device || 'default', "\nPlatform: ").concat(platform || 'default', "\n\nSTDOUT:\n").concat(result.stdout, "\n\nSTDERR:\n").concat(result.stderr, "\n\nExit Code: ").concat(result.exitCode),
                            },
                        ],
                    }];
            case 2:
                error_2 = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Error executing Cucumber scenario: ".concat(error_2),
                            },
                        ],
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Tool: Upload APK to BrowserStack
server.tool("upload_apk", "Upload APK file to BrowserStack for testing", {
    apk_path: zod_1.z.string().describe("Path to APK file (relative to project root)"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var command, args, result, error_3;
    var apk_path = _b.apk_path;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                command = "node";
                args = ["utils/upload-apk-to-browserstack.js", apk_path];
                return [4 /*yield*/, executeCommand(command, args)];
            case 1:
                result = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "APK Upload Results:\n\nAPK Path: ".concat(apk_path, "\n\nSTDOUT:\n").concat(result.stdout, "\n\nSTDERR:\n").concat(result.stderr, "\n\nExit Code: ").concat(result.exitCode),
                            },
                        ],
                    }];
            case 2:
                error_3 = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Error uploading APK: ".concat(error_3),
                            },
                        ],
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Tool: Get Project Status
server.tool("get_project_status", "Get current status and configuration of the mobile automation project", {}, function () { return __awaiter(void 0, void 0, void 0, function () {
    var packageJson, cucumberConfig, projectStatus;
    return __generator(this, function (_a) {
        try {
            packageJson = JSON.parse(readProjectFile('package.json'));
            cucumberConfig = (0, fs_1.existsSync)(path.join(CUCUMBER_PROJECT_PATH, 'cucumber.js'))
                ? readProjectFile('cucumber.js')
                : "No cucumber.js config found";
            projectStatus = {
                projectName: packageJson.name,
                version: packageJson.version,
                description: packageJson.description,
                scripts: packageJson.scripts,
                dependencies: packageJson.dependencies,
                devDependencies: packageJson.devDependencies,
                cucumberConfig: cucumberConfig
            };
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Project Status:\n\n".concat(JSON.stringify(projectStatus, null, 2)),
                        },
                    ],
                }];
        }
        catch (error) {
            return [2 /*return*/, {
                    content: [
                        {
                            type: "text",
                            text: "Error getting project status: ".concat(error),
                        },
                    ],
                }];
        }
        return [2 /*return*/];
    });
}); });
// Tool: Run Multilingual Demo
server.tool("run_multilingual_demo", "Execute multilingual device parsing demonstration", {
    language: zod_1.z.enum(["english", "portuguese", "spanish", "all"]).optional().describe("Language to demo"),
}, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var command, args, result, error_4;
    var language = _b.language;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                command = "node";
                args = ["utils/multilingual-demo.js"];
                if (language && language !== "all") {
                    args.push("--".concat(language));
                }
                return [4 /*yield*/, executeCommand(command, args)];
            case 1:
                result = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Multilingual Demo Results:\n\nLanguage: ".concat(language || 'all', "\n\nSTDOUT:\n").concat(result.stdout, "\n\nSTDERR:\n").concat(result.stderr, "\n\nExit Code: ").concat(result.exitCode),
                            },
                        ],
                    }];
            case 2:
                error_4 = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: "Error running multilingual demo: ".concat(error_4),
                            },
                        ],
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Main function to run the server
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    console.error("Mobile Automation MCP Server running on stdio");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
});

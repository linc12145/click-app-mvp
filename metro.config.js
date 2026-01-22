const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

console.log(" [DEBUG] Loading Metro Config");
console.log(" [DEBUG] __dirname:", __dirname);
const projectRoot = __dirname;
const configPath = path.join(projectRoot, "tailwind.config.js");
const inputPath = path.join(projectRoot, "global.css");

console.log(" [DEBUG] Expected Config Path:", configPath);
try {
    const twConfig = require(configPath);
    console.log(" [DEBUG] Successfully required tailwind.config.js");
    console.log(" [DEBUG] Presets length:", twConfig.presets ? twConfig.presets.length : "undefined");
} catch (e) {
    console.error(" [DEBUG] Failed to require tailwind.config.js:", e);
}

const config = getDefaultConfig(projectRoot);

module.exports = withNativeWind(config, {
    input: inputPath,
    configPath: configPath
});

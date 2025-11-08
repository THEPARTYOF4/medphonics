// Import API keys from Python file and export for JavaScript use
const fs = require('fs');
const path = require('path');

// Read and parse the Python API_KEY file
const apiKeyFile = path.join(__dirname, 'API_KEY.py');
const apiKeyContent = fs.readFileSync(apiKeyFile, 'utf8');

// Extract API keys using regex
const geminiKeyMatch = apiKeyContent.match(/GEMINI_API_KEY\s*=\s*["']([^"']+)["']/);
const mapsKeyMatch = apiKeyContent.match(/MAPS_API_KEY\s*=\s*["']([^"']+)["']/);

// Export the API keys
module.exports = {
    GEMINI_API_KEY: geminiKeyMatch ? geminiKeyMatch[1] : '',
    MAPS_API_KEY: mapsKeyMatch ? mapsKeyMatch[1] : ''
};
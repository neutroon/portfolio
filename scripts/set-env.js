const fs = require("fs");
const path = require("path");

// Paths
const envFile = path.join(__dirname, "../src/environments/environment.ts");
const templateFile = path.join(
  __dirname,
  "../src/environments/environment.template.ts"
);

// Create environments directory if it doesn't exist
const envDir = path.dirname(envFile);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Read the current environment file if it exists
function readEnvFile() {
  try {
    return fs.readFileSync(envFile, "utf8");
  } catch (error) {
    return null;
  }
}

// Read the template file
function readTemplateFile() {
  try {
    return fs.readFileSync(templateFile, "utf8");
  } catch (error) {
    console.error("Template file not found:", templateFile);
    process.exit(1);
  }
}

// Write to the environment file
function writeEnvFile(content) {
  fs.writeFileSync(envFile, content);
}

// Main logic
const currentEnv = readEnvFile();
const template = readTemplateFile();

if (!currentEnv) {
  // If environment file doesn't exist, create it from template
  writeEnvFile(template);
  console.log(
    "Created environment.ts from template. Please add your GitHub token."
  );
} else {
  // If it exists, check if it has a token
  const hasToken = currentEnv.includes("githubToken:");
  if (!hasToken) {
    // If no token, update from template but preserve any existing token
    const tokenMatch = currentEnv.match(/githubToken:\s*['"]([^'"]+)['"]/);
    const token = tokenMatch ? tokenMatch[1] : "";

    const updatedContent = template.replace(
      /githubToken:\s*['"][^'"]*['"]/,
      `githubToken: '${token}'`
    );

    writeEnvFile(updatedContent);
    console.log("Updated environment.ts while preserving your token.");
  } else {
    console.log(
      "Environment file already exists with a token. No changes needed."
    );
  }
}

const fs = require("fs");
const path = require("path");

// Paths
const envPath = path.join(__dirname, "src/environments/environment.ts");
const prodEnvPath = path.join(
  __dirname,
  "src/environments/environment.prod.ts"
);
const templatePath = path.join(
  __dirname,
  "src/environments/environment.template.ts"
);

// Create environments directory if it doesn't exist
if (!fs.existsSync(path.dirname(envPath))) {
  fs.mkdirSync(path.dirname(envPath), { recursive: true });
}

// Function to read environment file
function readEnvFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return null;
  }
}

// Function to write environment file
function writeEnvFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${path.basename(filePath)}`);
}

// Read current environment file
const currentEnv = readEnvFile(envPath);
const template = readEnvFile(templatePath);

if (!currentEnv) {
  // If no environment file exists, create it from template
  if (template) {
    writeEnvFile(envPath, template);
    console.log("Created environment.ts from template");
  } else {
    console.error("Template file not found!");
    process.exit(1);
  }
} else {
  // Extract token from current environment
  const tokenMatch = currentEnv.match(/githubToken:\s*['"]([^'"]+)['"]/);
  const token = tokenMatch ? tokenMatch[1] : "";

  if (token) {
    // Create production environment with the same token
    const prodContent = `export const environment = {
  production: true,
  githubToken: '${token}',
  environment: 'production'
};`;
    writeEnvFile(prodEnvPath, prodContent);
    console.log("Updated environment.prod.ts with current token");
  } else {
    console.log("No token found in environment.ts");
  }
}

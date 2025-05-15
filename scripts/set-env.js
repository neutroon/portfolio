const fs = require("fs");
const path = require("path");

// Paths
const envPath = path.join(__dirname, "../src/environments/environment.ts");
const templatePath = path.join(
  __dirname,
  "../src/environments/environment.template.ts"
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

// Read template file
const template = readEnvFile(templatePath);

if (!template) {
  console.error("Template file not found!");
  process.exit(1);
}

// Create or update environment file
writeEnvFile(envPath, template);
console.log(
  "Environment file has been set up. Please add your GitHub token to src/environments/environment.ts"
);

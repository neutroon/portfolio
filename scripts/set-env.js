const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../src/environments/environment.ts");
const templatePath = path.join(
  __dirname,
  "../src/environments/environment.template.ts"
);

// Read the template file
const template = fs.readFileSync(templatePath, "utf8");

// Create the environment file if it doesn't exist
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, template);
  console.log("Created environment.ts from template");
} else {
  console.log("environment.ts already exists");
}

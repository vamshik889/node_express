✅ 1. npm vs npx vs yarn
🔹 npm — Node Package Manager
Used to install, remove, and manage packages.

bash
Copy
Edit
npm install express       # install to dependencies
npm install nodemon --save-dev  # dev dependency
npm uninstall express
🔹 npx — Node Package Executor
Used to execute a package directly without installing it globally.

bash
Copy
Edit
npx create-react-app my-app     # uses create-react-app without global install
npx nodemon app.js              # run nodemon if it exists locally
✅ When to use npx?
When you want to run a CLI tool just once without polluting global space.

🔹 yarn — Alternative to npm (by Facebook)
Used for faster installs, offline caching, and deterministic dependencies.

bash
Copy
Edit
yarn install
yarn add express
yarn remove express
🔍 Today, most projects are fine with either. But stick to one per project — don’t mix npm and yarn.

✅ 2. package.json & package-lock.json
📦 package.json
This is the manifest file of your project.

Contains:

Project name, version

Scripts

Dependencies (dependencies and devDependencies)

Metadata (author, license)

🧠 Example:
json
Copy
Edit
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
📦 package-lock.json
This is an auto-generated file that locks the exact versions of every installed package and their sub-dependencies.

Feature	package.json	package-lock.json
Manual file	✅ Yes	❌ No (auto-generated)
Defines dependencies	✅ Yes	✅ Yes (with exact versions)
Used by npm install	✅ Yes	✅ Yes
For reproducibility	❌ No	✅ Yes

✅ 3. Semantic Versioning (^, ~, 1.2.3)
Semantic Versioning: MAJOR.MINOR.PATCH
Example: ^1.2.3

Prefix	Meaning
1.2.3	Install only 1.2.3
^1.2.3	Allow upgrades up to 1.x.x (e.g., 1.3.0, but not 2.0.0)
~1.2.3	Allow patch updates only (e.g., 1.2.4, but not 1.3.0)

❗ In production, prefer exact versions or lock file to avoid surprises.

✅ 4. Local vs Global Packages
🔹 Local Packages
Installed in your project (node_modules)
Accessible via scripts or require().

bash
Copy
Edit
npm install lodash         # installed locally
🔹 Global Packages
Installed system-wide
Available from terminal anywhere

bash
Copy
Edit
npm install -g nodemon
Local	Global
Used in code (require/import)	Used in CLI (commands)
Project-specific	Shared system-wide

🔑 Tools like nodemon, typescript, eslint are often installed globally for convenience.

✅ 5. Useful CLI Tools (with install and usage)
🔧 nodemon
Automatically restarts the server on file changes (for development).

bash
Copy
Edit
npm install nodemon --save-dev
Usage:

bash
Copy
Edit
npx nodemon index.js
In package.json:

json
Copy
Edit
"scripts": {
  "dev": "nodemon index.js"
}
🔧 dotenv
Loads environment variables from .env file.

bash
Copy
Edit
npm install dotenv
.env

ini
Copy
Edit
PORT=5000
DB_URL=mongodb://localhost/mydb
Usage in code:

js
Copy
Edit
require('dotenv').config();
console.log(process.env.PORT);
✅ Best practice for handling sensitive data

🔧 concurrently
Run multiple npm scripts in parallel (like backend + frontend).

bash
Copy
Edit
npm install concurrently --save-dev
Usage:

json
Copy
Edit
"scripts": {
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
✅ Interview Q&A Summary
❓Q1: Difference between npm and npx?
A:

npm is used to install/manage packages

npx is used to run a package CLI without installing it globally

❓Q2: Why is package-lock.json important?
A:
It locks down the exact versions of every installed package and sub-dependency, ensuring consistent installs across teams.

❓Q3: What does ^ and ~ mean in versions?
A:

^1.2.3: allows upgrades to 1.x.x

~1.2.3: allows only 1.2.x

❓Q4: When do you install packages globally?
A:
When you need to run CLI tools (like nodemon, eslint, typescript) system-wide, not per project.

❓Q5: What is dotenv used for?
A:
To load environment variables from a .env file into process.env. Useful for keeping config data private.


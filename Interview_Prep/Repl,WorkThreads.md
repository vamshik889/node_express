✅ 1. REPL (Read-Eval-Print Loop)
🔹 What is REPL?
REPL is the interactive shell that comes with Node.js.

REPL = Read → Eval → Print → Loop

It's useful for:

Trying out Node.js commands

Debugging quickly

Experimenting with JavaScript syntax

🔹 Start REPL:
bash
Copy
Edit
$ node
🔹 Sample Session:
bash
Copy
Edit
> 2 + 3
5

> const a = 10
undefined

> a * 2
20
🔹 Use .help for REPL commands
Command	Action
.exit	Exit REPL
.editor	Multi-line mode
.save file.js	Save current session
.load file.js	Load a JS file into REPL

✅ 2. process Module
🔹 What is process?
The process object is a global in Node.js that provides information and control over the current Node.js process.

🔹 Useful APIs:
js
Copy
Edit
process.argv        // CLI arguments
process.env         // Environment variables
process.exit()      // Exit manually
process.cwd()       // Current working directory
process.memoryUsage() // Memory stats
process.on('exit', handler)
✅ Example: CLI Tool with process.argv
js
Copy
Edit
// greet.js
const [,, name] = process.argv;
console.log(`Hello, ${name || 'Guest'}!`);
bash
Copy
Edit
$ node greet.js Vamshi
Hello, Vamshi!
✅ Example: Using process.env
js
Copy
Edit
// config.js
console.log(process.env.NODE_ENV);
Run it:

bash
Copy
Edit
NODE_ENV=production node config.js
✅ 3. child_process Module
🔹 Why use it?
To run other scripts or system commands from your Node.js app.

Common use cases:

Run shell commands (ls, mkdir, etc.)

Spawn another Node app

Automate dev/build tasks

🔹 Key APIs:
exec() – runs command in a shell (buffered)

spawn() – streams output (for large data)

fork() – spawns new Node.js process with IPC

✅ exec() Example:
js
Copy
Edit
const { exec } = require('child_process');

exec('ls -l', (err, stdout, stderr) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Output:', stdout);
});
✅ spawn() Example:
js
Copy
Edit
const { spawn } = require('child_process');

const child = spawn('ping', ['-c', '2', 'google.com']);

child.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
});

child.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
});
✅ fork() Example (used for Node scripts)
js
Copy
Edit
// parent.js
const { fork } = require('child_process');

const child = fork('child.js');

child.on('message', msg => {
    console.log('Received from child:', msg);
});

child.send('start');

// child.js
process.on('message', msg => {
    console.log('Parent sent:', msg);
    process.send('Child done processing');
});
✅ 4. worker_threads Module
A modern way to use multi-threading in Node.js (since v10.5+)

By default, Node.js is single-threaded. worker_threads allows you to run JavaScript code in parallel using threads — great for CPU-heavy work (e.g. crypto, image processing).

🔹 When to use?
When you have a CPU-intensive task

Need to avoid blocking the event loop

Want to stay inside Node (vs using child_process)

✅ Example: Using Worker Threads
js
Copy
Edit
// main.js
const { Worker } = require('worker_threads');

function runWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');
        worker.on('message', resolve);
        worker.on('error', reject);
    });
}

runWorker().then(result => console.log('Result:', result));
js
Copy
Edit
// worker.js
const { parentPort } = require('worker_threads');

// simulate CPU task
let sum = 0;
for (let i = 0; i < 1e9; i++) {
    sum += i;
}

parentPort.postMessage(sum);
✅ Interview Questions & Answers
❓Q1: What is REPL in Node.js?
A: REPL stands for Read-Eval-Print Loop. It's the Node interactive shell that evaluates JavaScript expressions. It helps in testing small code snippets.

❓Q2: What are process.argv and process.env?
A:

process.argv: an array of command-line arguments

process.env: an object containing environment variables

❓Q3: Difference between spawn() and exec()?
A:

spawn() streams output in real time — better for large data.

exec() buffers all output and gives it at once — good for simple commands.

❓Q4: Why use worker_threads over child_process?
A: worker_threads share memory and run in the same process (faster for CPU-heavy JavaScript logic). child_process is separate — more isolated but heavier.

❓Q5: How can you prevent a Node process from exiting on uncaught error?
A:

js
Copy
Edit
process.on('uncaughtException', err => {
    console.error('Uncaught error:', err);
});

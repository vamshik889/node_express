✅ What Is Non-blocking I/O?
I/O = Input/Output operations, like:

Reading files

Querying a database

Calling an API

Reading network sockets

In non-blocking I/O, these operations don’t block the execution of other code. The system continues executing while the I/O happens in the background.

🧠 Real-world Analogy
Imagine a waiter in a restaurant:

Blocking waiter: Waits at a customer’s table until the food is cooked before serving the next customer.

Non-blocking waiter (Node.js): Takes orders from other customers while the kitchen prepares the food. Once food is ready, he serves it.

Node.js is that non-blocking waiter. 🍽️

✅ Blocking vs Non-blocking Code
🛑 Blocking Example
js
Copy
Edit
const fs = require('fs');

const data = fs.readFileSync('file.txt'); // ❌ blocks the entire thread
console.log('File content:', data.toString());
console.log('This runs after reading the file');
✅ Non-blocking Example
js
Copy
Edit
const fs = require('fs');

fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log('File content:', data.toString());
});

console.log('This runs while the file is being read');
📌 readFileSync() blocks — readFile() does not.

✅ How Node.js Handles Non-blocking I/O
Key Components:
Event Loop: Central controller that keeps checking for I/O events and executes callbacks.

libuv: A C++ library under Node.js that handles I/O operations in the background using a thread pool.

Callback Queue: Stores callbacks to be executed when I/O is complete.

Flow:
vbnet
Copy
Edit
JS Code ➝ Async I/O call ➝ libuv handles it ➝ Result returned via callback ➝ Event loop processes callback
✅ Example: Async HTTP Request
js
Copy
Edit
const https = require('https');

https.get('https://jsonplaceholder.typicode.com/posts', (res) => {
  let data = '';

  res.on('data', chunk => { data += chunk });
  res.on('end', () => { console.log('Fetched:', data.slice(0, 100)); });
});

console.log('This prints immediately');
✅ While the data is fetched, the event loop keeps processing other code.

🧪 Use Case: File Upload Server (Non-blocking)
js
Copy
Edit
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    const writeStream = fs.createWriteStream('upload.txt');

    req.pipe(writeStream); // ✅ Non-blocking streaming
    req.on('end', () => {
      res.end('Upload done');
    });
  } else {
    res.end('Send a POST request');
  }
}).listen(3000);
📌 The server streams the file — it doesn't load the whole file in memory!

✅ Interview Insights
🧠 Q: Why is Node.js good for I/O-heavy applications?

Because of its non-blocking architecture, Node can handle thousands of I/O operations (e.g., API calls, file reads) concurrently without blocking the main thread.

🧠 Q: When does non-blocking I/O become a problem?

When CPU-intensive tasks (like image processing) are run on the main thread — it blocks the event loop. You’d use worker threads or offload it to services.

✅ Summary Table
Feature	Blocking I/O	Non-blocking I/O
Execution flow	Stops until I/O finishes	Continues executing other code
Resource usage	Less efficient	Highly efficient for I/O-heavy tasks
Common in	Traditional languages	Node.js, Go, Python (asyncio)
Node.js style	❌ fs.readFileSync()	✅ fs.readFile()
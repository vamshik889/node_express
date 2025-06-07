🔶 1. fs – File System
🔍 What is it?
Used to read, write, update, delete files/directories.

🔧 Common Methods:
Method	Purpose
fs.readFile	Read content from a file
fs.writeFile	Write content to a file
fs.appendFile	Add content to a file
fs.unlink	Delete a file
fs.mkdir, rmdir	Create/remove directories

🧪 Example:
js
Copy
Edit
const fs = require('fs');

// Write to a file
fs.writeFileSync('message.txt', 'Hello Node!');

// Read from a file
const data = fs.readFileSync('message.txt', 'utf8');
console.log(data); // Output: Hello Node!
💼 Real-world:
Logging

Reading config files

Saving user uploads

🧠 Interview Tip:
What's the difference between readFileSync and readFile?

Sync blocks the thread, Async uses a callback and is non-blocking.

🔷 2. http – Server & Client
🔍 What is it?
Used to create HTTP servers (backend API) and make HTTP requests.

🧪 Example: Create a server
js
Copy
Edit
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node!");
});

server.listen(3000, () => console.log("Server running on port 3000"));
💼 Real-world:
Create web servers (used under the hood in Express)

Mock HTTP APIs

Load testing

🧠 Interview Tip:
Node uses a single-threaded event loop, so non-blocking code (like http) is key.

🟣 3. path – File & Folder Paths
🔍 What is it?
Helps you work with file paths in a platform-independent way.

🧪 Example:
js
Copy
Edit
const path = require('path');

const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log(filePath); // Absolute path

console.log(path.basename(filePath)); // file.txt
console.log(path.extname(filePath));  // .txt
💼 Real-world:
Dynamic file path creation

Cross-platform support (/ in Linux vs \\ in Windows)

🧠 Interview Tip:
Never hardcode slashes; use path.join() or path.resolve() for clean and safe paths.

🟢 4. os – System Info
🔍 What is it?
Gives info about the operating system.

🧪 Example:
js
Copy
Edit
const os = require('os');

console.log(os.platform());       // win32, linux, darwin
console.log(os.totalmem());      // total RAM in bytes
console.log(os.freemem());       // free RAM
console.log(os.cpus());          // CPU info
console.log(os.userInfo());      // Logged-in user info
💼 Real-world:
Debugging

System monitoring tools

Logging environment info in production

🧠 Interview Tip:
os is used for platform-based configurations (e.g., for different environments).

🟡 5. url – URL Parser
🔍 What is it?
Used to parse and manipulate URLs.

🧪 Example:
js
Copy
Edit
const url = require('url');

const myUrl = new URL('https://example.com/products?category=books&id=10');

console.log(myUrl.pathname); // /products
console.log(myUrl.searchParams.get('category')); // books
💼 Real-world:
Parsing query strings in server requests

Constructing or validating URLs in services

🧠 Interview Tip:
While URL is now built-in via the global object, require('url') was used heavily in older Node versions.

🔁 Summary Table:
Module	Main Use	Tip
fs	Read/write files	Prefer async methods
http	Build API/server	Non-blocking I/O is key
path	Handle file paths	Use for cross-platform paths
os	Get system info	Useful for diagnostics
url	Parse/build URLs	Great for request/query parsing






✅ 1. How do you handle file uploads in Node.js? (using fs + streams)
Answer:
To handle file uploads, we use middleware like multer (for Express apps) or busboy/formidable for raw Node.js. These tools stream the file content directly to the disk to avoid memory overload.

Example with fs + streams:

js
Copy
Edit
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    const fileStream = fs.createWriteStream('./uploaded_file.txt');

    req.pipe(fileStream); // stream request body to file
    req.on('end', () => {
      res.end('File uploaded!');
    });
  } else {
    res.end('Send a POST request with file data.');
  }
}).listen(3000);
✅ Key concept: We avoid buffering the full file in memory. pipe() connects readable and writable streams directly.

🔹 In Express: you'd use multer for easy multipart form handling.

✅ 2. How do you parse query parameters in a request? (using url module)
Answer:
You can parse the query string using Node’s built-in url module or the newer URL class.

Example (using url):

js
Copy
Edit
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // `true` gives query as object
  const { name, age } = parsedUrl.query;

  res.end(`Hello ${name}, you are ${age} years old.`);
}).listen(3000);
Example (using URL):

js
Copy
Edit
const { URL } = require('url');
const myUrl = new URL('http://localhost:3000/user?name=vamshi&role=admin');

console.log(myUrl.searchParams.get('name')); // 'vamshi'
✅ In Express: use req.query.

✅ 3. What’s the difference between path.join() and path.resolve()?
Answer:

Feature	path.join()	path.resolve()
Base	Joins paths relative to current dir	Resolves to an absolute path
/ handling	Normalizes slashes	Treats first absolute path as root
Use case	Build relative paths	Build absolute paths

Example:

js
Copy
Edit
const path = require('path');

console.log(path.join('folder', 'file.txt'));  
// ➜ 'folder/file.txt'

console.log(path.resolve('folder', 'file.txt')); 
// ➜ '/abs/path/to/folder/file.txt' (depends on cwd)

console.log(path.resolve('/app', 'folder'));    
// ➜ '/app/folder'
✅ join() is like smart string concatenation
✅ resolve() gives an absolute path based on your current working directory

🧠 Interview trick: resolve() is often used when reading/writing files in a CLI app.

✅ 4. How does Node.js handle multiple requests on a single thread?
(Event Loop + http)

Answer:
Node.js uses a single-threaded, non-blocking event loop model. The http server listens for incoming requests and uses the event loop to offload blocking I/O operations (like DB, FS, etc.) to the libuv thread pool or OS, and continues handling new requests.

Example:

js
Copy
Edit
const http = require('http');

http.createServer((req, res) => {
  setTimeout(() => {
    res.end('Done'); // Simulate async work
  }, 1000);
}).listen(3000);
✅ Even if 100 users hit this server, Node won't block — it registers a callback and keeps going.
✅ I/O (DB, FS) is handled asynchronously.

🧠 Interview Note:

Node isn't multi-threaded for JavaScript execution, but it can handle concurrent I/O via the event loop + libuv (under the hood).

✅ TL;DR: Summary
Question	Short Answer
File upload	Use fs.createWriteStream() or multer to stream data
Parse query	Use url.parse() or new URL()
join vs resolve	join: relative; resolve: absolute
Handle multiple reqs	Event loop + async I/O keeps Node non-blocking


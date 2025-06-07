✅ What is a Buffer?
A Buffer is a built-in object in Node.js used to store binary data (like images, files) in memory.

Node handles data as streams of bytes, and buffers are temporary containers for those bytes.

🔧 Example:
js
Copy
Edit
const buffer = Buffer.from('Hello');
console.log(buffer); // <Buffer 48 65 6c 6c 6f>
console.log(buffer.toString()); // Hello
✅ Use cases:
File reading/writing

Network protocols (TCP sockets)

Working with binary data (e.g., images, videos)

Streaming audio/video content

✅ What are Streams?
A Stream is like a water pipe: data flows piece by piece instead of all at once.

This is efficient and memory-friendly for large data (e.g., huge files or live video).

Node has 4 types of streams:

Type	Example
Readable	Reading from a file
Writable	Writing to a file
Duplex	TCP socket (read & write)
Transform	Encrypting/compressing while streaming

✅ Reading a File with Streams
js
Copy
Edit
const fs = require('fs');

// Create a readable stream
const readStream = fs.createReadStream('input.txt', 'utf8');

// Listen for chunks of data
readStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});

readStream.on('end', () => {
  console.log('Finished reading');
});
✅ Instead of loading the whole file into memory, readStream processes it chunk by chunk.

✅ Writing to a File with Streams
js
Copy
Edit
const fs = require('fs');

// Create a writable stream
const writeStream = fs.createWriteStream('output.txt');

// Write data in chunks
writeStream.write('Hello ');
writeStream.write('World\n');

writeStream.end(); // Close the stream

writeStream.on('finish', () => {
  console.log('File written successfully');
});
✅ Piping: Read ➝ Write
js
Copy
Edit
const fs = require('fs');

const reader = fs.createReadStream('input.txt');
const writer = fs.createWriteStream('output.txt');

// Automatically read and write
reader.pipe(writer);
✅ .pipe() takes care of flow control and is very efficient.

✅ Real-world Use Case
🔄 Streaming large file uploads/downloads

Let’s say you’re building a file uploader like Google Drive:

Use readable stream to receive the file

Use writable stream to store it on disk or forward to cloud

Piping avoids memory overload on large files

✅ Buffer vs Stream
Feature	Buffer	Stream
Data Size	Entire data in memory	Piece by piece (chunked)
Memory Use	High for large data	Efficient & scalable
Speed	Slower for big data	Faster due to flow control
Usage	Binary manipulation	File reading, video/audio

✅ Interview-Oriented Questions
❓ Q: What is a Buffer in Node.js?
A Buffer is a temporary storage for binary data in memory, especially used when working with streams and binary content.

❓ Q: Why use Streams?
To handle large amounts of data efficiently by processing it in chunks instead of loading all at once in memory.

❓ Q: What does .pipe() do in streams?
It connects a readable stream to a writable stream, transferring data automatically and efficiently with built-in backpressure handling.

✅ Practice: Mini Project
Task: Build a file copy utility with streams

js
Copy
Edit
const fs = require('fs');

const source = fs.createReadStream('bigfile.mp4');
const destination = fs.createWriteStream('copy.mp4');

source.pipe(destination);
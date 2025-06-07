✅ express.json() and express.urlencoded()
These two are built-in Express middlewares to parse incoming request bodies.

🔹 express.json()
Purpose:
Parses incoming JSON payloads from requests like POST /api/data.

js
Copy
Edit
app.use(express.json());
🔧 Example:
js
Copy
Edit
app.post('/api/data', (req, res) => {
  console.log(req.body);  // Parsed JSON object
  res.send('Received');
});
Client sends:

http
Copy
Edit
POST /api/data
Content-Type: application/json

{
  "name": "Vamshi"
}
🔹 express.urlencoded({ extended: true })
Purpose:
Parses URL-encoded data (e.g., from HTML forms: x-www-form-urlencoded).

js
Copy
Edit
app.use(express.urlencoded({ extended: true }));
extended: false → only parses simple key-value pairs (querystring)

extended: true → can parse nested objects (qs library)

🔧 Example:
js
Copy
Edit
<form method="POST" action="/submit">
  <input name="user" value="vamshi" />
  <input name="age" value="30" />
</form>
In route:

js
Copy
Edit
app.post('/submit', (req, res) => {
  console.log(req.body); // { user: 'vamshi', age: '30' }
});
✅ When to use:
Middleware	Used for
express.json()	JSON APIs (React, mobile apps)
express.urlencoded()	Traditional HTML forms

✅ Always use both in production apps unless you're only dealing with APIs.

✅ File Upload Handling with multer
🔹 What is multer?
Multer is a middleware to handle multipart/form-data, used for file uploads.

🔧 Install:
bash
Copy
Edit
npm install multer
✅ Basic Setup
js
Copy
Edit
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // saves files to /uploads

app.post('/upload', upload.single('myFile'), (req, res) => {
  console.log(req.file); // file info
  res.send('File uploaded!');
});
upload.single('fieldname') → for one file

upload.array('fieldname', maxCount) → multiple files

upload.fields([{ name, maxCount }, ...]) → different fields

✅ File + Text Together:
js
Copy
Edit
app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.body.username);  // Form field
  console.log(req.file);           // Uploaded file
});
✅ Custom storage:
js
Copy
Edit
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });
🔐 File type filter:
js
Copy
Edit
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});
✅ Example HTML for file upload:
html
Copy
Edit
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="myFile" />
  <button type="submit">Upload</button>
</form>
✅ Interview Tip:
Multer handles multipart forms; express.json() and express.urlencoded() cannot handle files.

✅ CORS (Cross-Origin Resource Sharing)
🔹 What is CORS?
CORS is a browser security feature that blocks API requests from different origins unless allowed.

If you're building frontend (React) + backend (Express) separately, you need CORS enabled.

🔧 Install & Use:
bash
Copy
Edit
npm install cors
js
Copy
Edit
const cors = require('cors');
app.use(cors());
✅ Allow specific origin:
js
Copy
Edit
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // allow cookies
}));
✅ CORS Preflight:
For PUT, DELETE, Content-Type: application/json, browsers first send an OPTIONS request. CORS must be enabled to respond correctly.

✅ Interview Q&A
❓Q1: What is express.json() and when should you use it?
A:
express.json() parses incoming requests with JSON payloads and puts the data in req.body. Used in APIs receiving JSON data.

❓Q2: What’s the difference between express.urlencoded({ extended: false }) and { extended: true }?
A:

false: uses Node’s built-in querystring module — handles simple form fields

true: uses qs library — handles nested fields and arrays

❓Q3: Why do we need multer?
A:
To handle file uploads in Express. It parses multipart/form-data, which express.json() and express.urlencoded() cannot handle.

❓Q4: What is CORS and how do you handle it in Express?
A:
CORS restricts cross-origin HTTP requests. You handle it using the cors middleware and configure allowed origins.

❓Q5: Can CORS errors be solved from the frontend?
A:
No. CORS errors are enforced by the browser and must be handled on the server.

✅ Summary
Middleware	Purpose
express.json()	Parse JSON payloads
express.urlencoded()	Parse form submissions
multer	Handle file uploads
cors	Allow cross-origin API requests


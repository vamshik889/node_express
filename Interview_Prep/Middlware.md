✅ 1. Theory: What is Middleware in Node.js?
🔸 Definition:
Middleware is a function that has access to the request, response, and next objects in the request-response cycle.
It’s used to intercept, modify, or log incoming requests or outgoing responses.

🔸 Signature of a Middleware:
js
Copy
Edit
function middleware(req, res, next) {
    // logic
    next(); // pass control to the next middleware
}
✅ 2. Core Concepts to Remember
Concept	Description
req, res, next	The standard middleware function signature
next()	Moves control to the next middleware or route handler
Order matters	Middleware runs in the order they are defined
Types of middleware	Built-in, third-party, custom (user-defined)
Use cases	Logging, auth, error handling, parsing JSON, request validation, etc.

✅ 3. Production-Ready Custom Middleware Code
👇 Custom logger middleware (logger.js)
js
Copy
Edit
// logger.js
function logger(req, res, next) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
    next(); // Important!
}

module.exports = logger;
👇 Apply in main Express app (app.js)
js
Copy
Edit
const express = require('express');
const logger = require('./logger');

const app = express();

// Use your middleware
app.use(logger);

app.get('/', (req, res) => {
    res.send('Home Route');
});

app.get('/about', (req, res) => {
    res.send('About Route');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
✅ 4. Practical Use Cases
Use Case	Example
Logging	Request logs for debugging / monitoring
Auth check	Check if token or session exists (isAuthenticated)
CORS setup	Custom header setup for cross-origin requests
Request timing	Measure how long a route takes to respond
Error handling	Centralized error middleware to handle all exceptions

✅ 5. Interview Questions & Answers
❓Q1: What is middleware in Express?
A: Middleware is a function that runs during the request/response lifecycle. It has access to req, res, and next. It can modify the request or response, end the request cycle, or pass control to the next middleware.

❓Q2: Can you write a custom middleware in Express?
A: Yes. Example:

js
Copy
Edit
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
Use it with app.use(logger).

❓Q3: What happens if you forget to call next() in a middleware?
A: The request will hang because Express won't move to the next middleware or route handler. The request cycle won't complete.

❓Q4: Can you write middleware for a specific route only?
A: Yes. Example:

js
Copy
Edit
app.get('/admin', authMiddleware, (req, res) => {
    res.send('Admin Area');
});
❓Q5: How do you handle errors in middleware?
A: Use an error-handling middleware:

js
Copy
Edit
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}
app.use(errorHandler);
✅ Bonus: Middleware Flow Diagram
css
Copy
Edit
Client ---> [middleware1] ---> [middleware2] ---> [route handler] ---> [response]
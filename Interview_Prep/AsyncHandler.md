✅ Why asyncHandler is important
🔥 Problem:
In Express, async/await errors don’t get caught by the default error handler unless you manually use try/catch or next(err) in every route.

Example:

js
Copy
Edit
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id); // ❌ if error, Express won’t catch it
  res.json(user);
});
If User.findById() throws an error (e.g., DB down), the server crashes silently or logs an unhandled rejection.

✅ Solution: Use asyncHandler
Wrap your async route functions in an asyncHandler() to automatically forward errors to Express’s error middleware.

🔧 How to build asyncHandler
You can use express-async-handler (npm package) or create your own lightweight version.

🔹 Option 1: Install and use express-async-handler
bash
Copy
Edit
npm install express-async-handler
js
Copy
Edit
const asyncHandler = require('express-async-handler');
Usage:

js
Copy
Edit
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
}));
🔹 Option 2: Custom asyncHandler function
js
Copy
Edit
// utils/asyncHandler.js
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
Usage is exactly the same:

js
Copy
Edit
const asyncHandler = require('./utils/asyncHandler');
🔁 Full Example: With Express + Mongoose
js
Copy
Edit
const express = require('express');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const app = express();
app.use(express.json());

// Sample Mongoose model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
}));

// Route with asyncHandler
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
}));

// Global error handler (must be at the end)
app.use((err, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({ message: err.message });
});

app.listen(3000, () => console.log('Server started'));
✅ Benefits of using asyncHandler
✅ Benefit	🚫 Without asyncHandler
Clean code — no repetitive try/catch	Lots of repeated try/catch
Automatic error forwarding	Need to use next(err) manually
Better production error tracking	Hard to find async crashes

💬 Interview Q&A
❓Q1: Why do we need asyncHandler in Express?
A:
Because async/await errors inside route handlers won’t be caught by Express’s default error middleware unless manually forwarded using try/catch and next(err). asyncHandler simplifies this.

❓Q2: Can we use a custom implementation of asyncHandler?
A:
Yes, it's just a higher-order function that wraps an async route and forwards any error to next().

❓Q3: Do we still need try/catch in every async route if we use asyncHandler?
A:
No. Unless you want to handle the error in a custom way inside the route itself.

✅ Summary
Use asyncHandler() to cleanly handle errors in async/await routes.

It saves you from writing try/catch blocks repeatedly.

All errors are automatically passed to the central error middleware.


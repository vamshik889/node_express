✅ 1. Rate Limiting in Express.js
🧠 What is Rate Limiting?
It limits how many requests a client (usually by IP) can make in a specific time window.

Example:
"Max 100 requests per IP per 15 minutes"

✅ Why is it important?
🛡️ Prevents	🔍 Example
API Abuse	Scripts hitting endpoints nonstop
DDoS Attacks	Massive request floods
Brute-force attempts	Login forms

⚙️ Install & Setup
bash
Copy
Edit
npm install express-rate-limit
🛠️ Implement Middleware
js
Copy
Edit
// middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
✅ Apply in app.js
js
Copy
Edit
const express = require('express');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(rateLimiter); // apply to all requests
You can also apply rate limiter only to certain routes (like login).

js
Copy
Edit
app.use('/api/auth/login', rateLimiter);
💬 Interview Q&A
❓Q: How do you prevent abuse of an API?
A: Use rate-limiting middleware like express-rate-limit to restrict how many requests an IP can make in a given timeframe.

✅ 2. Helmet.js — Set Secure HTTP Headers
🧠 What is Helmet.js?
Helmet sets various HTTP headers that help protect your app from well-known web vulnerabilities.

✅ Install
bash
Copy
Edit
npm install helmet
🛠️ Use in App
js
Copy
Edit
const helmet = require('helmet');

app.use(helmet());
🚀 What does Helmet protect against?
Header	Purpose
X-Content-Type-Options	Prevents MIME type sniffing
X-DNS-Prefetch-Control	Controls DNS prefetching
X-Frame-Options	Prevents clickjacking (iframe protection)
Strict-Transport-Security	Enforces HTTPS
X-XSS-Protection	Enables XSS filters in older browsers
Content-Security-Policy	Prevents XSS & data injection (configurable)

🛡️ Example with CSP (Content Security Policy)
js
Copy
Edit
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
✅ Summary
Feature	Tool	Benefit
Rate Limiting	express-rate-limit	Prevent abuse, brute-force, DDoS
Secure Headers	helmet	Protect against common web attacks

💬 Interview Combo Question
❓Q: How do you secure your Express.js API?
A:

Use helmet to set secure HTTP headers

Use express-rate-limit to limit request rates

Use input validation (e.g. express-validator)

Use CORS for origin control

Sanitize input (prevent NoSQL injection & XSS)
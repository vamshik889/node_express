🧠 What is API Versioning?
API versioning means creating different versions of the same API (like /api/v1/ and /api/v2/) to allow:

Backward compatibility

Gradual rollout of new features

Prevent breaking changes for existing clients

✅ Why Use API Versioning?
Problem Without Versioning	Solution With Versioning
Old clients break	Old clients keep using /v1
Can’t deploy new changes	Ship changes safely in /v2
No rollback	Can roll back only /v2 logic

✅ Express.js API Versioning (Production-Ready)
We’ll structure your code like this:

bash
Copy
Edit
/routes
   ├── v1
   │   └── productRoutes.js
   └── v2
       └── productRoutes.js
/app.js
1️⃣ Create Versioned Routes
👉 /routes/v1/productRoutes.js
js
Copy
Edit
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.json({
    version: 'v1',
    message: 'Basic product list (v1)',
    data: [{ id: 1, name: 'iPhone X' }]
  });
});

module.exports = router;
👉 /routes/v2/productRoutes.js
js
Copy
Edit
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.json({
    version: 'v2',
    message: 'Advanced product list with price (v2)',
    data: [{ id: 1, name: 'iPhone X', price: 999 }]
  });
});

module.exports = router;
2️⃣ Mount the Versions in app.js
js
Copy
Edit
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Versioned Routes
app.use('/api/v1', require('./routes/v1/productRoutes'));
app.use('/api/v2', require('./routes/v2/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
📦 Example API Calls
sql
Copy
Edit
GET /api/v1/products
→ Returns basic product list

GET /api/v2/products
→ Returns product list with prices
🔁 Bonus: Handle Default Route Versioning
If you want /api/products to point to the latest version:

js
Copy
Edit
app.use('/api', require('./routes/v2/productRoutes'));
So /api/products = latest version

🧠 Interview Question & Answer
❓Q: Why do we use API versioning?
A: To avoid breaking changes for existing consumers and to allow a smooth transition between new and old logic.

❓Q: How to version an API in Express?
A: Create separate route files (e.g. /v1/, /v2/) and mount them using:

js
Copy
Edit
app.use('/api/v1', v1Router);
❓Q: What are common ways to version an API?
Method	Example	Notes
URL versioning	/api/v1/products	Most common, easy to manage
Header versioning	Accept: application/vnd.api.v1+json	Less readable, used in APIs like GitHub
Query params	/api/products?version=1	Not recommended

✅ Summary
You now know how to:

👥 Maintain multiple API versions

🔀 Route traffic based on version

🧱 Organize Express.js codebase cleanly
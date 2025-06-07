🧠 What is Pagination & Sorting?
📌 Pagination:
Splits large datasets into pages (limits what’s fetched).

Example:
GET /products?page=2&limit=10
→ Returns 10 products from index 11–20

📌 Sorting:
Returns results ordered by a field.

Example:
GET /products?sort=price&order=desc
→ Sorts products by price in descending order

⚙️ Backend: Express.js Pagination + Sorting (Mongoose Example)
Let’s assume a Product model:

js
Copy
Edit
// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
🚀 Route with Pagination & Sorting
js
Copy
Edit
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // Count total documents
    const total = await Product.countDocuments();

    // Fetch paginated and sorted products
    const products = await Product.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: products
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
🧪 Sample API Requests
bash
Copy
Edit
GET /products?page=2&limit=5&sort=price&order=desc
Returns:

Page 2

5 products per page

Sorted by price descending

✅ Frontend Example (React)
jsx
Copy
Edit
const fetchProducts = async (page, limit, sort, order) => {
  const res = await fetch(
    `/api/products?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
  );
  const data = await res.json();
  console.log(data.data);  // products
};
🧠 How to Remember
Concept	Analogy
limit	Page size (like YouTube limit of 20 results)
skip	Items to ignore (like going to page 3, skip 40 items)
sort/order	Ordering logic (think Excel column sorting)

💬 Interview Questions
❓Q: How does pagination improve performance?
A: It avoids loading all data into memory. Useful in large datasets and improves frontend performance.

❓Q: How do you implement pagination in MongoDB?
A: Use .skip() and .limit():

js
Copy
Edit
Model.find().skip((page - 1) * limit).limit(limit);
❓Q: What’s the downside of .skip() in MongoDB?
A: It becomes slower on larger skips, as MongoDB still scans skipped records. For large datasets, consider range-based pagination.

✅ Bonus: Paginated Response Format (Best Practice)
json
Copy
Edit
{
  "page": 2,
  "totalPages": 5,
  "totalItems": 50,
  "data": [ /* array of products */ ]
}




____________________

✅ What Is Filtering?
Filtering means retrieving only the items that match specific criteria — like:

Category = "electronics"

Price > 500

Name contains "apple"

🏗️ Full Express.js Implementation: Pagination + Sorting + Filtering
Here’s the upgraded route:

js
Copy
Edit
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  try {
    // ✅ Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ✅ Sorting
    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    // ✅ Filtering
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' }; // case-insensitive search
    }

    // ✅ Count total for pagination
    const total = await Product.countDocuments(filter);

    // ✅ Final query
    const products = await Product.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: products
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
🔍 Supported Query Parameters
Query Param	Example	Meaning
page	1	Pagination page
limit	10	Items per page
sort	price	Field to sort by
order	asc or desc	Sort direction
category	electronics	Filter by exact category
minPrice	500	Minimum price
maxPrice	1500	Maximum price
search	apple	Case-insensitive partial match on name

🧪 Sample API Requests
🔹 Get mobiles under 1000 sorted by price:
sql
Copy
Edit
GET /products?category=mobile&maxPrice=1000&sort=price&order=asc
🔹 Search products with name containing "apple":
sql
Copy
Edit
GET /products?search=apple
🔹 Paginate + filter + sort together:
pgsql
Copy
Edit
GET /products?page=2&limit=5&sort=price&order=desc&category=laptop&minPrice=700
💡 Frontend Integration Example
js
Copy
Edit
const fetchProducts = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/products?${query}`);
  const data = await res.json();
  console.log(data);
};

fetchProducts({
  page: 1,
  limit: 10,
  sort: 'price',
  order: 'asc',
  category: 'electronics',
  search: 'iphone',
  minPrice: 1000
});
🧠 Tips to Remember
Use req.query for dynamic filters

regex for search

$gte, $lte for price filtering

Combine all filters into a single filter object

💬 Interview-Level Q&A
❓Q: How would you implement filtering in an API with MongoDB?
A: Build a dynamic filter object from req.query, using operators like $gte, $lte, $regex, and pass it to .find(filter).

❓Q: How to prevent filter injection or abuse?
A:

Validate and sanitize input

Limit searchable fields

Use indexes on frequently filtered fields for performance
// MongoDB Cheat Sheet with Examples

// Database Operations
// Show all databases
// Output: admin      0.000GB, local      0.000GB, testDB     0.001GB
show dbs

// Switch to a database
use testDB // Output: switched to db testDB

// Create a database (happens when inserting data)
use newDB // Output: switched to db newDB

// Drop a database
db.dropDatabase() // Output: { "ok": 1 }

// Collection Operations
// Show all collections
// Output: users, products, orders
show collections

// Create a collection
db.createCollection("newCollection") // Output: { "ok": 1 }

// Drop a collection
db.users.drop() // Output: true

// Insert Operations
// Insert a single document
db.users.insertOne({ name: "John", age: 30, city: "New York" })
// Output: { acknowledged: true, insertedId: ObjectId("...") }

// Insert multiple documents
db.users.insertMany([
  { name: "Alice", age: 25, city: "London" },
  { name: "Bob", age: 28, city: "Paris" }
])
// Output: { acknowledged: true, insertedIds: { "0": ObjectId("..."), "1": ObjectId("...") } }

// Query Documents
// Find all documents
db.users.find()
// Output: Array of all documents in the collection

// Find with conditions (e.g., age > 25)
db.users.find({ age: { $gt: 25 } })
// Output: Documents with age > 25

// Update Operations
// Update one document
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })
// Output: { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

// Update many documents
db.users.updateMany({ age: { $gt: 25 } }, { $set: { status: "Active" } })
// Output: { acknowledged: true, matchedCount: 2, modifiedCount: 2 }

// Delete Operations
// Delete one document
db.users.deleteOne({ name: "Bob" })
// Output: { "acknowledged": true, "deletedCount": 1 }

// Delete many documents
db.users.deleteMany({ age: { $lt: 30 } })
// Output: { "acknowledged": true, "deletedCount": 2 }

// Aggregation
// Group by and count
db.users.aggregate([
  { $group: { _id: "$city", totalUsers: { $sum: 1 } } }
])
// Output: Array grouped by city with user counts

// Indexing
// Create an index
db.users.createIndex({ name: 1 }) // Output: "Index created: name_1"

// View indexes
db.users.getIndexes()
// Output: Array of all indexes in the collection


# MongoDB Cheat Sheet with Examples

# Database Operations
// Show all databases
// Output: admin      0.000GB, local      0.000GB, testDB     0.001GB
## show dbs

// Switch to a database
## use testDB // Output: switched to db testDB

// Create a database (happens when inserting data)
use newDB // Output: switched to db newDB

// Drop a database
## db.dropDatabase() // Output: { "ok": 1 }

// Collection Operations
// Show all collections
// Output: users, products, orders
## show collections

## Create a collection
db.createCollection("newCollection") // Output: { "ok": 1 }

## Drop a collection
db.users.drop() // Output: true

# Insert Operations
## Insert a single document
db.users.insertOne({ name: "John", age: 30, city: "New York" })
// Output: { acknowledged: true, insertedId: ObjectId("...") }

## Insert multiple documents
db.users.insertMany([
  { name: "Alice", age: 25, city: "London" },
  { name: "Bob", age: 28, city: "Paris" }
])
// Output: { acknowledged: true, insertedIds: { "0": ObjectId("..."), "1": ObjectId("...") } }

# Query Documents
## Find all documents
db.users.find()
// Output: Array of all documents in the collection

## Find with conditions (e.g., age > 25)
db.users.find({ age: { $gt: 25 } })
// Output: Documents with age > 25

## Update Operations
// Update one document
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })
// Output: { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

## Update many documents
db.users.updateMany({ age: { $gt: 25 } }, { $set: { status: "Active" } })
// Output: { acknowledged: true, matchedCount: 2, modifiedCount: 2 }

## Delete Operations
// Delete one document
db.users.deleteOne({ name: "Bob" })
// Output: { "acknowledged": true, "deletedCount": 1 }

## Delete many documents
db.users.deleteMany({ age: { $lt: 30 } })
// Output: { "acknowledged": true, "deletedCount": 2 }


## limit the records
db.students.find().limit(2)  // it will give only 2 records

## sorting the records -
 it takes an object which contains the key for which the sorting should be applied and 1 means Ascending , -1 means descending
 db.students.find().sort({name:1,age:-1})  this will sort based on both name and age

 ## skip the records

 db.students.find().skip(2) // it skips first 2 records and displays the other records

 //if the document has multiple properties like name , age, city but if we wanted to get only name and age we can do as below
 trail> db.users.find({name:"vamshiKrishna"},{age:1})  // so this will give only the name which matches vamshiKrishna and the age field even it contains city and org properties

 if we dont need the id then use below 
 db.users.find({name:"vamshiKrishna"},{age:1},{_id:0}) //means for which field we use the 0 that gets skipped in the results


## in and nin  - (in and not in)
 we can pass an array containing some properties and get the documents if those are presnet in the documents like
db.users.find({name:{$in:["domala","vamshiKrishna"]}})  this means it gives the documents which has the names as domala and vamshiKrishna

this is useful when we wanted to match the age or some number and get all the relevant docs

so if we wanted to get not in the list we can use $nin
db.users.find({age:{$nin:[50,66]}})  this means it gives the documents other than the age 50 and 66 documents



## exists - returns the documents which has the specific properties 

db.users.find({age:{$exists:true}})  // so it will give the documents which has only the age property exists in it

if we give true it gives the docs having the age key in it, if it is false then it gives the docs which dont have the age
_______________________________________________________________________________________________________________


# Aggregation
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


----------------------------------------------------------------

# example

users collection
[
  {name:"vamshi",
  meta:{color:"blue",age:25},
  hobbies:["reading","playing"]
  
  },
 {name:"jag",
  meta:{color:"red",age:26},
  hobbbies:["reading","sleeping"]
  
  },
   {name:"sriram",
  meta:{color:"pink",age:27},
  hobbies:["reading","playing"]
  
  },
]

//get the data where the color is blue and age is 25

db.users.find({meta:{"color":"blue","age":25}}) //output:   {name:"vamshi", meta:{color:"blue",age:25}}

              key and the props iniside it 

if we give the order of color and age keys incorrectly like db.users.find({meta:{"age":25,"color":"blue"}}) it wont give any results even though the order is not matter in javascript objects but we are dealing with db here and the queries wont consider it needs exact ORDER

# get user with favourie color blue - on object 
and one more issue here lets say get the user with favourite color of blue the query will be db.users.find({meta:{"color":"blue"}}) //output: no output
even though we followed the order we wont get the results for the nested objects 
so we need to use dot notation to get this db.users.find({"meta.color":"blue"}) now we will get the result

# get user with hobby of reading, coding - on array

db.users.find({hobbies:["reading","playing"]}) - incase of multiple filter values we use array to match and here also ORDER is mandatory 
if only the one value from index 0 then db.users.find({hobbies:"reading"}) this works 
but where as db.users.find({hobbies:"playing"}) this wont work 

db.users.find({hobbies:{$all:["reading","playing"]}})  // so irrespective of order it will giv ethe results of all which matches with reading , playing from hobbies  - like AND operator for OR operator we can use "in" in the above query insted of "all" 


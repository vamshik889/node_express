// import { sum } from "./app.js"; // ES6
const {sum,sub,pro,divide} = require("./app.js")
const os = require("os");
console.log("hi")
// sum(1, 2);
// sub(3, 1);
// pro(2, 6);
// console.log(os.version()); // will provide the os version details

// console.log(os.cpus()); // will provide the cpu details of our system
console.log(divide(1,2))
console.log(os.freemem()); // will provide the free memory of our system in bytes.

// import { sum } from "./app.js"; // ES6
const { sum, sub, pro } = require("./app.js"); //ES5

const os = require("os");

// sum(1, 2);
// sub(3, 1);
// pro(2, 6);
// console.log(os.version()); // will provide the os version details

// console.log(os.cpus()); // will provide the cpu details of our system

console.log(os.freemem()); // will provide the free memory of our system in bytes.

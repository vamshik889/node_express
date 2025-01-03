const even = require("is-even"); //import is-even in ES5 version.
const odd = require("is-odd"); // import is-odd in ES5

// console.log(odd(3));
// console.log(even(3));

//inbuilt or internal modules

const fs = require("fs"); //file system.

//async nature
// fs.readFile("./text.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//     console.log("CANNOT READ THE FILE");
//   } else {
//     console.log(data);
//   }
// }); //async

// console.log("bye guys!");

// readsync nature

// try {
//   const data = fs.readFileSync("./text.txt", { encoding: "utf-8" });

//   console.log(data);
// } catch (error) {
//   console.log(error);
// }

// console.log("bye guys!");

// const data = fs.writeFile(
//   "./text.txt",
//   "this is me first time writing in the file",
//   (err) => {
//     if (err) {
//       console.log("cannot write in the file");
//       console.log(err);
//     } else {
//       console.log("data has been written in the file");
//     }
//   }
// );

// append file
fs.appendFile(
  "./text.txt",
  "\nthis is me on second time writing in the file",
  (err) => {
    if (err) {
      console.log("cannot write in the file");
      console.log(err);
    } else {
      console.log("data has been written in the file");
    }
  }
);

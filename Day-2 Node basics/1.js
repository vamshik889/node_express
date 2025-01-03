//single threaded

// browser will handle async code

console.log("A");

setTimeout(() => {
  console.log("C");
}, 0); //asyncronous code
console.log("B");

// EVENT LOOP

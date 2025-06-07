✅ 1. var, let, const
🔍 Theory
var: Function-scoped, hoisted, re-declarable.

let/const: Block-scoped, not re-declarable, has Temporal Dead Zone (TDZ).

const prevents reassignment (not mutation for objects).

💡 Code
js
Copy
Edit
function test() {
  if (true) {
    var x = 1;
    let y = 2;
    const z = 3;
  }
  console.log(x); // ✅ 1
  console.log(y); // ❌ Error
}
💡 Interview Q:
Why let/const over var? TDZ safety, block scope, no re-declaration bugs.

✅ 2. Hoisting & Temporal Dead Zone (TDZ)
🔍 Theory
Hoisting: Declarations moved to top of scope.

TDZ: Time between hoisting and actual initialization for let/const.

💡 Code
js
Copy
Edit
console.log(a); // undefined
var a = 10;

console.log(b); // ❌ ReferenceError
let b = 20;
💡 Interview Q:
What’s the output of accessing a let before its declaration?

✅ 3. Closures & Lexical Scope
🔍 Theory
Closure = function + outer scope even after parent is gone.

Lexical scope = based on code location, not call stack.

💡 Code
js
Copy
Edit
function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    console.log(counter);
  };
}
const fn = outer();
fn(); // 1
fn(); // 2
💡 Interview Q:
Explain how closures help in data encapsulation.

✅ 4. Callbacks, Promises, async/await
🔍 Theory
Callback = pass function

Promise = handle async in chain

async/await = modern syntax for promises

💡 Code
js
Copy
Edit
// Callback
setTimeout(() => console.log("Done"), 1000);

// Promise
fetch(url).then(res => res.json()).catch(err => console.error(err));

// Async/Await
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (e) {
    console.error(e);
  }
}
💡 Interview Q:
Callback hell? How does async/await solve it?

✅ 5. Event Loop, Call Stack, Micro/Macro Tasks
🔍 Theory
Stack (sync), Web APIs (async), Queue (macro), Job queue (micro)

Microtasks (Promise callbacks) have higher priority than macrotasks (setTimeout)

💡 Code
js
Copy
Edit
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Output: Start → End → Promise → Timeout
✅ 6. map, filter, reduce, find
🔍 Theory
map: transform

filter: conditionally include

reduce: accumulate

find: return first match

💡 Code
js
Copy
Edit
let arr = [1, 2, 3];

arr.map(x => x * 2);       // [2, 4, 6]
arr.filter(x => x > 1);    // [2, 3]
arr.reduce((a, b) => a + b, 0); // 6
arr.find(x => x === 2);    // 2
✅ 7. Destructuring & Spread
🔍 Theory
Destructuring: pull values

Spread: clone/merge objects/arrays

💡 Code
js
Copy
Edit
const user = { name: "A", age: 20 };
const { name } = user;

const arr = [1, 2, 3];
const copy = [...arr];

const user2 = { ...user, age: 25 }; // updated
✅ 8. Object Manipulation
💡 Tricks
Add: obj.newKey = value

Delete: delete obj.key

Loop: for...in, Object.entries()

💡 Interview Q:
Deep clone vs shallow clone?

✅ 9. Arrow Functions & this
🔍 Theory
Arrow functions don't bind their own this.

Use the lexical this from outer scope.

💡 Code
js
Copy
Edit
const obj = {
  name: "A",
  say: function () {
    setTimeout(() => {
      console.log(this.name); // "A"
    }, 1000);
  },
};
✅ 10. Debouncing & Throttling
🔍 Theory
Debounce: Wait until user stops typing (delays)

Throttle: Limit how often function runs

💡 Code
js
Copy
Edit
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
✅ 11. Optional Chaining & Nullish Coalescing
🔍 Theory
obj?.prop: avoid crash if prop is undefined/null

??: only fallback if value is null/undefined

💡 Code
js
Copy
Edit
let user = {};
console.log(user?.address?.city); // undefined

let name = null;
console.log(name ?? "Guest"); // "Guest"
✅ 12. Error Handling
🔍 Theory
try/catch, throw, global error handlers

💡 Code
js
Copy
Edit
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("Invalid JSON", e);
  }
}
🧠 Interview Tips
Use real-life examples for closure (e.g. counter, form handler)

For async: Explain callback hell → Promises → async/await

Event loop: draw the timeline or explain priority of tasks

Use array functions in a project-like context (e.g. filter users)
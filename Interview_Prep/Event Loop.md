🚀 What is the Event Loop?
The Event Loop is how JavaScript handles asynchronous operations (like setTimeout, fetch, etc.) while keeping its single-threaded nature intact.

❗ JavaScript has one thread (the call stack) but uses the event loop to simulate multitasking.

🧠 Think of it like this (Real-Life Analogy):
Imagine you're a chef (JavaScript engine) in a restaurant with one stove (call stack).
You cook one dish at a time.

When an order (function) is simple, you cook it directly.

If an order (like boiling water = setTimeout) takes time, you ask the assistant (Web API) and move to the next order.

Once it's ready, the assistant places the dish in the queue (callback queue).

The event loop checks if the stove is free and then brings the dish to be cooked (executed).

🧩 Components Involved
Part	Role
Call Stack	Executes code one function at a time
Web APIs	Browser APIs like setTimeout, fetch, etc.
Callback Queue (Task Queue)	Holds setTimeout, click handlers, etc.
Microtask Queue (Job Queue)	Holds .then(), await, MutationObserver
Event Loop	Continuously checks: is call stack empty? Then push tasks from queue

🔄 Event Loop Flow
Call stack runs synchronous code.

Async tasks are sent to Web APIs.

When complete, they're moved to either:

Microtask queue (Promise.then, queueMicrotask)

Callback queue (setTimeout, setInterval)

Event Loop:

First empties microtask queue

Then processes one task from callback queue

💡 Code Example 1
js
Copy
Edit
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
🧾 Output:
sql
Copy
Edit
Start
End
Promise
Timeout
🧠 Why?
console.log("Start") and console.log("End") run first — they’re synchronous.

setTimeout is scheduled → goes to callback queue.

Promise.then → goes to microtask queue.

After call stack is empty:

Event loop runs microtasks → logs "Promise"

Then it runs one task from callback queue → logs "Timeout"

📌 Visual Summary
vbnet
Copy
Edit
                ┌──────────────────────────┐
                │      Call Stack          │
                └──────────┬───────────────┘
                           │
                ┌──────────▼───────────┐
                │    Web APIs          │
                └──────────┬───────────┘
                           │
       ┌─────────────┐     │     ┌─────────────┐
       │ Microtask Q │◄────┘     │ Callback Q  │
       └─────┬───────┘           └─────┬───────┘
             │                         │
          ┌──▼─────────────────────────▼──┐
          │         Event Loop             │
          └────────────────────────────────┘
💬 Common Interview Questions
What is the event loop?

A mechanism that allows JavaScript to perform non-blocking I/O by offloading operations to the browser and handling them via queues.

Why does Promise resolve before setTimeout?

Promises go to microtask queue, which is prioritized over the callback queue (setTimeout).

Is JavaScript synchronous or asynchronous?

It is single-threaded synchronous, but with async capabilities via the event loop.

What happens if microtasks keep adding more microtasks?

Event loop keeps executing them — this can starve the callback queue (called starvation).

🛠 Practice it Live
Paste this in browser console:

js
Copy
Edit
console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise1");
}).then(() => {
  console.log("promise2");
});

console.log("script end");
Expected:

arduino
Copy
Edit
script start
script end
promise1
promise2
setTimeout
🧠 Memory Hack
"Micro goes first, macro waits"
Microtasks (Promise, await) → Callback queue (setTimeout, DOM events)


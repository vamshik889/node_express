✅ What is EventEmitter in Node.js?
Node.js has a built-in events module that lets you create, emit, and listen for custom events.

Think of it like a radio station:

The station broadcasts (emits) a signal (event)

You can tune in (listen) and perform an action when that happens

👉 This is the Observer pattern in action.

✅ Real-World Analogy
🚦 Imagine a traffic signal system:

Signal emits "green" → Cars move

Signal emits "red" → Cars stop

Node’s EventEmitter is like that signal.

✅ Basic Flow
Import the events module

Create an EventEmitter object

Listen for a custom event using .on()

Emit that event using .emit()

✅ Example 1: Hello World
js
Copy
Edit
const EventEmitter = require('events');

// Step 1: Create an emitter
const emitter = new EventEmitter();

// Step 2: Subscribe (listen) to an event
emitter.on('greet', () => {
  console.log('Hello from the event!');
});

// Step 3: Emit the event
emitter.emit('greet'); // Output: Hello from the event!
✅ Example 2: Passing Data with Events
js
Copy
Edit
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('userCreated', (user) => {
  console.log(`User created: ${user.name}`);
});

emitter.emit('userCreated', { name: 'Vamshi', age: 25 });
✅ Real-Time Use Case
🔄 Use Case: Notify user after order is placed
js
Copy
Edit
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Event: orderPlaced
emitter.on('orderPlaced', (orderId) => {
  console.log(`Order ${orderId} has been received. Notifying warehouse...`);
});

// Simulate API logic
function placeOrder(id) {
  console.log('Placing order...');
  emitter.emit('orderPlaced', id);
}

placeOrder('ORD123');
✅ When to Use Events in Real Projects
Messaging between modules (like microservices)

Chat apps (message received)

Logging (on "error", "success")

Streaming data (file uploads, sockets)

Building your own pub-sub systems

✅ Advanced: Once Listener
js
Copy
Edit
emitter.once('login', () => {
  console.log('First-time login only');
});

emitter.emit('login'); // ✅ runs
emitter.emit('login'); // ❌ won't run again
✅ Remove Listener
js
Copy
Edit
function onSave() {
  console.log('Data saved');
}

emitter.on('save', onSave);
emitter.removeListener('save', onSave);
emitter.emit('save'); // ❌ No output
✅ Behind the Scenes in Express.js
Express’s req and res objects are event emitters.

Streams (like file reads and network sockets) use events like 'data', 'end', 'error'.

js
Copy
Edit
const fs = require('fs');
const stream = fs.createReadStream('file.txt');

stream.on('data', chunk => {
  console.log('Reading:', chunk.toString());
});
✅ Interview-Style Question
Q: How is EventEmitter used in Node.js?

EventEmitter enables the creation and handling of custom events in a decoupled way. It follows the publish-subscribe pattern where one part emits events and another listens and reacts.

Q: What are common methods of EventEmitter?

.on(event, listener)

.emit(event, data)

.once(event, listener)

.removeListener(event, fn)

✅ Summary Table
Method	Description
.on()	Listen for an event repeatedly
.once()	Listen only once
.emit()	Trigger an event
.removeListener()	Remove a specific listener
.removeAllListeners()	Remove all listeners


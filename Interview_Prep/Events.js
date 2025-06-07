
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("orderPlaced",(product)=>{
    console.log(`Order placed for item ${product}`)
})

function placeOrder(product){

    emitter.emit("orderPlaced",product)
}


placeOrder("Chair")
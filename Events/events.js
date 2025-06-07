const EventEmitter = require("events");
const ChatRoomEventEmitter = new EventEmitter();

function newPersonJoined(){
    ChatRoomEventEmitter.emit("Joined","vamshi")
}

ChatRoomEventEmitter.on("Joined",(name)=>{
    console.log(`Hi ${name}`)
})


function Main(){
newPersonJoined()

}
Main()
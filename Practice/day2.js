let fs = require("fs");
let data = "hi am vamshi"

fs.writeFileSync("./Practice day1 and 2",data);


let http = require("http");

// Create an HTTP server
let server = http.createServer((req, res) => {

    // Handle the "/about" endpoint with a GET request
    if (req.url === "/about" && req.method === "GET") {
        res.write("You are in About page"); // Write response to the client
        res.end(); // End the response
    }
    // Handle the "/adddata" endpoint with a POST request
    else if (req.url === "/adddata" && req.method === "POST") {
        
        let str = ""; // Initialize an empty string to accumulate data chunks
        
        // Listen for 'data' events when receiving request payload
        req.on("data", (chunk) => {
            str += chunk; // Append each data chunk to the `str` variable
        });

        // Listen for the 'end' event when all data has been received
        req.on("end", () => {
            console.log(str); // Log the complete payload to the console
        });

        // Write a response to the client
        res.write("New records added");
        res.end("New records page");
    }
    // Handle invalid endpoints
    else {
        res.end("Invalid end point");
    }
});

// Start the server on port 8033
server.listen(8033, () => {
    console.log("Listening to server 8033");
});

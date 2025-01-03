const http = require("http");

// 1. Basic HTTP Server
const basicServer = http.createServer((req, res) => {
    res.write("Welcome to the Basic Server!");
    res.end();
});
basicServer.listen(3000, () => console.log("Basic server running on port 3000"));

// 2. Serving Different Routes
const routeServer = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to the Home Page!");
    } else if (req.url === "/about") {
        res.write("This is the About Page.");
    } else {
        res.write("404 Not Found");
    }
    res.end();
});
routeServer.listen(3001, () => console.log("Route server running on port 3001"));

// 3. Handling HTTP Methods (GET, POST)
const methodServer = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.write("You sent a GET request.");
    } else if (req.method === "POST") {
        res.write("You sent a POST request.");
    } else {
        res.write("Unhandled HTTP method.");
    }
    res.end();
});
methodServer.listen(3002, () => console.log("Method server running on port 3002"));

// 4. Parsing Query Parameters
const queryString = require("querystring");

const queryServer = http.createServer((req, res) => {
    if (req.url.includes("?")) {
        const query = req.url.split("?")[1];
        const params = queryString.parse(query);
        res.write("Query Parameters: " + JSON.stringify(params));
    } else {
        res.write("No query parameters found.");
    }
    res.end();
});
queryServer.listen(3003, () => console.log("Query server running on port 3003"));

// 5. Sending JSON Response
const jsonServer = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    const responseObj = { message: "Hello, this is a JSON response!" };
    res.write(JSON.stringify(responseObj));
    res.end();
});
jsonServer.listen(3004, () => console.log("JSON server running on port 3004"));

// 6. Serving Static Files
const fs = require("fs");
const staticServer = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading file.");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
    } else {
        res.writeHead(404);
        res.end("File not found.");
    }
});
staticServer.listen(3005, () => console.log("Static server running on port 3005"));

// 7. Redirecting Requests
const redirectServer = http.createServer((req, res) => {
    if (req.url === "/old-route") {
        res.writeHead(301, { Location: "/new-route" });
        res.end();
    } else if (req.url === "/new-route") {
        res.write("This is the new route.");
        res.end();
    } else {
        res.write("Route not found.");
        res.end();
    }
});
redirectServer.listen(3006, () => console.log("Redirect server running on port 3006"));

// 8. Handling Large Payloads (POST Data)
const payloadServer = http.createServer((req, res) => {
    if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            res.write("Received payload: " + body);
            res.end();
        });
    } else {
        res.write("Send a POST request to test payload handling.");
        res.end();
    }
});
payloadServer.listen(3007, () => console.log("Payload server running on port 3007"));

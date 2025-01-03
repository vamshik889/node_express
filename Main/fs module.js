let fs = require("fs");

// 1. Reading a File (Asynchronous)
fs.readFile("example.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
    } else {
        console.log("File contents:", data);
    }
});

// 2. Writing to a File (Asynchronous)
let data = "Hello, this is written using fs module!";
fs.writeFile("output.txt", data, (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("File written successfully!");
    }
});

// 3. Appending to a File
let additionalData = "\nThis is appended text.";
fs.appendFile("output.txt", additionalData, (err) => {
    if (err) {
        console.error("Error appending to the file:", err);
    } else {
        console.log("Data appended successfully!");
    }
});

// 4. Checking if a File Exists
if (fs.existsSync("output.txt")) {
    console.log("File exists!");
} else {
    console.log("File does not exist.");
}

// 5. Deleting a File
fs.unlink("output.txt", (err) => {
    if (err) {
        console.error("Error deleting the file:", err);
    } else {
        console.log("File deleted successfully!");
    }
});

// 6. Creating a Directory
fs.mkdir("myDir", (err) => {
    if (err) {
        console.error("Error creating directory:", err);
    } else {
        console.log("Directory created successfully!");
    }
});

// 7. Reading the Contents of a Directory
fs.readdir("myDir", (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
    } else {
        console.log("Directory contents:", files);
    }
});

// 8. Renaming a File or Directory
fs.rename("example.txt", "renamedExample.txt", (err) => {
    if (err) {
        console.error("Error renaming the file:", err);
    } else {
        console.log("File renamed successfully!");
    }
});

// 9. Copying a File
fs.copyFile("example.txt", "copyOfExample.txt", (err) => {
    if (err) {
        console.error("Error copying the file:", err);
    } else {
        console.log("File copied successfully!");
    }
});

// 10. Watching a File for Changes
fs.watch("example.txt", (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} has been changed. Event type: ${eventType}`);
    }
});

// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    
    // Log request details
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    let contentType = 'text/html';

    //Asynchronous file reading
    fs.readFile(filePath, (err, content) => {
        console.log("File reading is done.");
        if (err) {
            //if the file is not found
            console.error(`Error reading file: ${err.message}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
        } else {
            //file FOUND!!
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
    console.log("We used asynchronous file reading, so the server can do other stuff while waiting for the file to be read.");
    console.log("As you can see this is printed before the file reading is done.");
    
    
    // //synchrnous file reading
    // try {
    //     let content = fs.readFileSync(filePath);
    //     res.writeHead(200, { 'Content-Type': contentType });
    //     res.end(content);
    // } catch (err) {
    //     console.error(`Error reading file: ${err.message}`);
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.end('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
    // }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

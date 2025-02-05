const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const formidable = require('formidable');
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Intelligent1111',
    database: 'clickfit_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL (clickfit database)');
});

// Ensure the upload directory exists inside "backend/"
const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Server setup
const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.url}`); // Debugging log

    // Handle file uploads
    if (req.method === 'POST' && req.url === '/upload') {
        const form = new formidable.IncomingForm({
            uploadDir: uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB limit
            multiples: false
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error("File upload error:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File upload failed', error: err.message }));
                return;
            }

            const fileKey = Object.keys(files)[0];
            const fileArray = files[fileKey];
            const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

            if (!file) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No file uploaded' }));
                return;
            }

            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                fs.unlink(file.filepath, () => { });
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid file type. Only images are allowed.' }));
                return;
            }

            const ext = path.extname(file.originalFilename) || ".png";
            const newFilename = `${Date.now()}${ext}`;
            const newPath = path.join(uploadDir, newFilename);

            fs.rename(file.filepath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error saving file' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: newFilename,
                    filename: newFilename,
                    fileUrl: `/upload/${newFilename}`
                }));
            });
        });
    }
    // Serve uploaded images from "backend/upload/"
    else if (req.url.startsWith('/upload/')) {
        const filePath = path.join(__dirname, 'upload', req.url.replace('/upload/', ''));
        console.log(`Serving upload file: ${filePath}`); // Debugging log

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            const extname = path.extname(filePath);
            const contentType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp'
            }[extname] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
    // Serve static frontend files from "../frontend/" (adjusting path from backend)
    else {
        let filePath = path.join(__dirname, '../frontend', req.url === '/' ? 'index.html' : req.url);
        console.log(`Serving static file: ${filePath}`); // Debugging log

        let extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.webp':
                contentType = 'image/webp';
                break;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`File not found: ${filePath}`); // Debugging log
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

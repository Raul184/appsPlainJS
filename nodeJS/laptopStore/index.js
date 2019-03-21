const fs = require('fs'); //Modules System
const http = require('http'); //Server
const url = require('url'); //url module


//Data
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');


//Parsed data
const laptopData = JSON.parse(json);


//SERVER
const server = http.createServer((req, res) => {

    const pathname = url.parse(req.url , true).pathname;
    
    const id = url.parse(req.url, true).query.id;

    if (pathname === '/products' || pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end('This is the Products page');
    } 
    else if (pathname === '/laptop' && id < laptopData.length)
    {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(`This is the page for laptop ${id}`);
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('URL not found');
    }
});


//Port
server.listen(1337, '127.0.0.1', () =>{
    console.log('Server is listening for requests');
}); 

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server =  http.createServer((req, res)=>{

    res.setHeader('Content-Type', 'text/html');

    console.log(req.url);
    let path = './docs/';

    if(req.url == '/'){
        path += 'index.html';
        res.statusCode = 200;
    }
    else if(req.url == '/home'){
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
    else if(req.url == '/joinus'){
        path += 'join.html';
        res.statusCode = 200;
    }
    else if(req.url == '/about'){
        path+= 'about.html';
        res.statusCode = 200;
    }
    else{
        path += 'notFound.html';
        res.statusCode = 404;
    }
    
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err.message);
            res.end();
        }
        else{
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', ()=>{
    console.log("Server is Listening");
    console.log(_.random(15,25));
})
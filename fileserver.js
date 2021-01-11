const { createServer } = require('http')
const fs = require('fs')
const path = require('path')

const handleError = (error, res) => {
    res.writeHead(500, {'Content-Type': 'text/plane'})
    res.end(`Error: ${error.message}`)
}

createServer((req, res) => {
    if (req.url === '/') {
        const stream = fs.createReadStream(path.join(__dirname, 'public', 'index.html'))
        stream.on('error', error => handleError(error, res))
        res.writeHead(200, {'Content-Type': 'text/html'})
        stream.pipe(res) 
    } else if (req.url.match(/.js$/)) {
        const stream = fs.createReadStream(path.join(__dirname, 'public', req.url))
        stream.on('error', error => handleError(error, res))
        res.writeHead(200, {'Content-Type': 'text/javascript'})
        stream.pipe(res)     
    } else if (req.url.match(/.css$/)) {
        const stream = fs.createReadStream(path.join(__dirname, 'public', req.url))
        stream.on('error', error => handleError(error, res))
        res.writeHead(200, {'Content-Type': 'text/css'})
        stream.pipe(res)  
    } else if (req.url.match(/.png$/)) {
        
    } else {
        res.writeHead(404, {'Content-Type': 'text/plane'})
        res.end('404')   
    }
}).listen(3001, '127.0.0.1', ()=> console.log('Сервер работает'))
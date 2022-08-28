const express = require('express');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//webSockets
io.on('connection', (socket)=>{
    socket.on('message',(msg)=>{
        const mensaje = {msg, id: socket.id}
        socket.broadcast.emit('message', mensaje);
    });
});

//settings
app.set('port', process.env.PORT || 3000);

//middlewars

//routes

//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
httpServer.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
});
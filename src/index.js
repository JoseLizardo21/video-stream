const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');
const {engine} = require('express-handlebars');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//webSockets
io.on('connection', (socket)=>{
    socket.on('sala', (sala)=>{
        socket.join(sala);
        socket.on('message', (msg)=>{
            socket.join(msg.sala);
            socket.to(msg.sala).emit('message', msg.msgJSON);
        });
    })
});

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//middlewars
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
httpServer.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
});
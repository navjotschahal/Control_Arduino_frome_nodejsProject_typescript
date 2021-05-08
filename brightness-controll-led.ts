import express = require('express');
// import http = require('http');
import socketio = require('socket.io');

let app = express();
const port = 3000
app.set("port", process.env.PORT || port);

let http = require("http").Server(app);
const server = http.listen(port, '0.0.0.0', function() {
    console.log("listening on *:3000");
  });
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
 
let SerialPort = require("serialport")//.SerialPort
let serialPort = new SerialPort("/COM3", { baudRate: 9600 });
 
// server.listen(8080);

/**Location of built UI project */
app.use(express.static('public'));             
 
var brightness = 0;
 
io.sockets.on('connection', function (socket: { on: (arg0: string, arg1: (data: any) => void) => void; emit: (arg0: string, arg1: { value: number; }) => void; }) {
    socket.on('led', function (data: { value: number; }) {
            brightness = data.value;
           
            var buf = Buffer.alloc(1);
            buf.writeUInt8(brightness, 0);
            serialPort.write(buf);
           
            io.sockets.emit('led', {value: brightness});   
    });
   
    socket.emit('led', {value: brightness});
});
 
console.log("Web Server Started go to 'http://localhost:3000' in your Browser.");

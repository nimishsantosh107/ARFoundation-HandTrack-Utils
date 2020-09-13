const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


//CONFIG VARIABLES
const PORT = process.env.PORT || 3000;
const IP4 = "192.168.1.100";

var app = express();
var httpServer = http.Server(app);
var io = socketIO(httpServer);

app.use("/test", express.static(__dirname + "/test"));

//SOCKET HANDLING
io.on("connection", (socket)=>{
	console.log("+ CONNECTED: ",socket.id);

	//CONTROLS
	socket.on('controls', (data)=>{
		console.log(data);
		io.emit('updateControls', data);
	});

	//HANDLE DISCONNECTION
	socket.on('disconnect', ()=>{
		console.log("- DISCONNECTED: ",socket.id);
	});
});

httpServer.listen(PORT, ()=>{console.log(`HTTP SERVER UP ON PORT: ${PORT}`);});

/*
data  = { controls : "play" | "pause" }
*/
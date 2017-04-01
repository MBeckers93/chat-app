const express 					= require('express');
const socketIO 					= require('socket.io');
const http						= require('http');
const path 						= require('path');
const publicPath				= path.join(__dirname, '../public');
const port 						= process.env.PORT || 3000;
const {isRealString} 			= require('./utils/validation');
const {
	generateMessage,
	generateLocationMessage
} 								= require('./utils/message');

var app 						= express();
var server 						= http.createServer(app);
var io 							= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		}

		

		socket.join(params.room);
		// socket.leave('The Office Fans');

		// io.emit -> io.to('The Office Fans').emit;
		// socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit;
		// socket.emit;

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		console.log('Create message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('Server disconnection');
		socket.broadcast.emit('newMessage', generateMessage('Admin', 'User left the chat.'));
	});
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

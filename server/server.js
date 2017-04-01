const express 			= require('express');
const socketIO 			= require('socket.io');
const http				= require('http');
const path 				= require('path');
const publicPath		= path.join(__dirname, '../public');
const port 				= process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

var app 				= express();
var server 				= http.createServer(app);
var io 					= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('joinMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message) => {
		console.log('Create message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('Server disconnection');
	});
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

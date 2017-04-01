var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
	console.log('newMessage', message);
})

socket.on('welcomeMessage', function(message) {
	console.log('welcomeMessage', message);
});

socket.on('joinMessage', function(message) {
	console.log('joinMessage', message);
});
const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from 	= 'Jan';
		var text 	= 'Automatic testing - Chat app';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		var from 	= 'Admin';
		var lat 	= '51';
		var lng 	= '5';
		var url 	= 'https://www.google.nl/maps?q=51,5'
		var coords	= generateLocationMessage(from, lat, lng);

		expect(coords.createdAt).toBeA('number');
		expect(coords).toInclude({from,url});
	});
});
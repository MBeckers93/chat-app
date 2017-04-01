const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from 	= 'Jan';
		var text 	= 'Automatic testing - Chat app';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});
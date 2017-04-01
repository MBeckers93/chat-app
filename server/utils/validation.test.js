const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
	it('Should reject non-string value', () => {
		var string 	= 01042017;
		var test 	= isRealString(string);

		expect(test).toBe(false);
	});

	it('Should reject string with only spaces', () => {
		var string 	= '                 ';
		var test 	= isRealString(string);
		
		expect(test).toBe(false);
	});

	it('Should allow string with non-space characters', () => {
		var string 	= 'This is a string';
		var test 	= isRealString(string);

		expect(test).toBe(true);
	});
});
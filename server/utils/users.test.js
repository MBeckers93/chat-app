const expect 	= require('expect');

const {Users} 	= require('./users');

describe('Users', () => {
	it('Should add new user', () => {
		var users 	= new Users();
		var user 	= {
			id: '0000001',
			name: 'Mark',
			room: 'Node Course'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});
});
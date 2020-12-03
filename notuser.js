//controller
// const users = [];

// const addUser = ({ id, name, room }) => {
//   name = name.trim().toLowerCase();
//   room = room.trim().toLowerCase();

//   const existingUser = users.find((user) => user.room === room && user.name === name);

//   if(!name || !room) return { error: 'Username and room are required.' };
//   if(existingUser) return { error: 'Username is taken.' };

//   const user = { id, name, room };

//   users.push(user);

//   return { user };
// }

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if(index !== -1) return users.splice(index, 1)[0];
// }

// const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };

//************************************************    server    ****************************************************
//socket.emit -> just to the connected user
//socket.broadcast.emit ->  to * but the connected user
//io.emit -> to * 

const socketio = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./server/controllers/user.controller');

const io = socketio(server);

io.on('connect', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	socket.on('sumbitOrder', (message, callback) => {
		const user = getUser(socket.id);
		socket.emit('message', { user: 'admin', text: `${user.name}, your order has been submitted` });

		io.to('cashier').emit('message', { user: 'admin', text: `${user.name} on table ${user.room}, ordered ${message}` });
		switch (message) {
			case 'pizza':
				io.to('chef-pizza').emit('message', { user: 'admin', text: `${user.room}, ordered 1 larg ${message}` });
				break;
			case 'burger':
				io.to('chef-burger').emit('message', { user: 'admin', text: `${user.room}, ordered 1 small ${message}` });
				break;
			default:
				break;
		}
		callback();
	});

	socket.on('disconnect', () => {
		console.log('THIS IS DISCONNECT');

		const user = removeUser(socket.id);

		if (user) {
			console.log('THIS IS DISCONNECT', user);
			io.to('cashier').emit('message', { user: 'Admin', text: `${user.name} has left on table ${user.room}.` });
			io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		}
	});
});

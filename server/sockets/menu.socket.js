module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log('THIS IS MENU SOCKET CONNECTION');

		socket.on('tableRequest', (customer, callback) => {
			callback();
		});
	});
};

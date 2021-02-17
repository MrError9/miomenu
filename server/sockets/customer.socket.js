module.exports = function(io) {
	io.on('connection', (socket) => {

		socket.on('waitingRequestResponse', (request, callback) =>{
			socket.join(request.request_id)
			callback()
		}) 
		socket.on('customerRequest', (request, callback) => {
			socket.join(request.customerId);
			io.emit('new_request', request);

			callback();
		});

		socket.on('request_result', (request, callback) => {
			console.log('server socket request', request)
			io.to(request.customerId).emit('request_response', {
        customer:request,
        result:'accepted'
			});

			callback();
		});

		socket.on('tableRequest', (customer, callback) => {
			callback();
		});
	});
};

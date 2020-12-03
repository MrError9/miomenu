const db = require('../../models');
const Customer = db.customer;
const Table = db.table;
const Request = db.request;

// Find a single customer with an id
// Path GET /api/manage/customers/:id
exports.findCustomer = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await Customer.findByPk(id);
		res.send(data);
	} catch (error) {
		console.log('single customer error', error);
		res.status(500).send({
			message: 'Error retrieving Customer with id=' + id
		});
	}
};

// Create and Save a new customer
// Path POST /api/manage/customers
exports.registerCustomer = async (req, res) => {
	// Validate request
	if (!req.body.table) {
		res.status(400).send({
			message: 'Table is empty!'
		});
		return;
	}
	// Create a Client
	const customer = {
		customer_id: Date.now() + '',
		table_id: req.body.table,
		name: 'ahmed'
	};
	// Save Client in the database
	try {
		const data = await Customer.create(customer);
		res.send(data);
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: error.message || 'Some error occurred while creating customer.'
		});
	}
};

// Send customer request
// Path GET /api/manage/requests
exports.sendRequest = async (req, res) => {
	const { customerId, name, tableId } = req.body;
	const request = {
		request_id: customerId,
		name: name,
		table_id: tableId,
		state: 'pending'
	};
	try {
		const data = await Request.create(request);
		if (data) res.send(data);
		else
			res.status(500).send({
				message: 'Error sending request'
			});
	} catch (error) {
		console.log('send request error', error);
		res.status(500).send({
			message: 'Error sending request'
		});
	}
};

// Delete a single request with an id
// Path DELETE /api/manage/requests/:id
exports.deleteRequest = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Request.destroy({
			where: { request_id: id }
		});
		if (num == 1) {
			res.send({
				message: 'request was deleted successfully!'
			});
		} else {
			res.status(500).send({
				message: `Cannot delete request with id=${id}. Maybe request was not found!`
			});
		}
	} catch (error) {
		console.log('delete request error', error);
		res.status(500).send({
			message: 'Error retrieving Customer with id=' + id
		});
	}
};

// Retrieve all customers.
// Path GET /api/manage/customers
exports.findAllCustomers = async (req, res) => {
	const { tableId } = req.query;
	var tableCondetion = tableId ? { table_id: tableId } : null;
	try {
		const { count, rows } = await Customer.findAndCountAll({
			where: tableCondetion,
			include: [ Table ],
			order: [ [ 'table_id', 'DESC' ] ]
		});
		res.send({ count, data: rows });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving Customers.'
		});
	}
};

// Retrieve all customers.
// Path DELETE /api/manage/customers
exports.deleteAllCustomers = async (req, res) => {
	const { tableId } = req.query;
	var tableCondetion = tableId ? { table_id: tableId } : null;
	try {
		const { count, rows } = await Customer.destroy({
			where: tableCondetion,
		});
		res.send({ count, data: rows });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving Customers.'
		});
	}
};

// Retrieve all customers.
// Path GET /api/manage/customers
exports.findAllRequests = async (req, res) => {
	const { tableId } = req.query;
	var tableCondetion = tableId ? { table_id: tableId } : null;
	try {
		const { count, rows } = await Request.findAndCountAll({
			where: tableCondetion,
			include: [ Table ],
			order: [ [ 'table_id', 'DESC' ] ]
		});
		res.send({ count, data: rows });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving Requests.'
		});
	}
};

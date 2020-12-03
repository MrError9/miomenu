const db = require('../models');
const Customer = db.customer;
const Request = db.request;

// Find a single customer with an id
// Path GET /api/table/customers/:id
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
// Path POST /api/table/customers
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
// Path GET /api/table/requests
exports.sendRequest = async (req, res) => {
	const { customerId, name, tableId } = req.body;
	const request = {
		request_id: customerId,
		name: name,
		table_id: tableId,
		state:'pending'
	};
	console.log('request', request)
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

// Find a single customer with an id
// Path GET /api/table/requests/:id
exports.findRequest = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await Request.findByPk(id);
		res.send(data);
	} catch (error) {
		console.log('request error', error);
		res.status(500).send({
			message: 'Error retrieving request with id=' + id
		});
	}
};

// Retrieve all Clients from the database.
// Path GET /api/clients/
// exports.findAll = async (req, res) => {
// 	const { category, limit, offset } = req.query;

// 	var categoryCondetion = category ? { category_id: category } : null;

// 	try {
// 		const { count, rows } = await Menu.findAndCountAll({
// 			where: categoryCondetion,
// 			include: [ { model: User, as: 'chef' }, { model: Category, as: 'category' }, Sizes ],
// 			limit: limit ? parseInt(limit) : 15,
// 			offset: offset ? parseInt(offset) : 0,
// 			order: [ [ 'category_id', 'DESC' ] ]
// 		});
// 		res.send({ count, data: rows });
// 	} catch (error) {
// 		res.status(500).send({
// 			message: error.message || 'Some error occurred while retrieving menu.'
// 		});
// 	}
// };

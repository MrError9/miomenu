const db = require('../models');
const Menu = db.menu_item;
const Sizes = db.item_size;
const Category = db.item_category;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Client
// Path POST /api/clients/
// exports.create = (req, res) => {
// 	console.log('this ios craete clients');
// 	// Validate request
// 	if (!req.body.name || !req.body.type) {
// 		res.status(400).send({
// 			message: 'Client name & type can not be empty!'
// 		});
// 		return;
// 	}
// 	// Create a Client
// 	const client = {
// 		full_name: req.body.name,
// 		type: req.body.type,
// 		discount: req.body.discount,
// 		phone: req.body.phone,
// 		address: req.body.address,
// 		email: req.body.email
// 	};
// 	console.log('this is the client', client);
// 	// Save Client in the database
// 	Client.create(client)
// 		.then((data) => {
// 			console.log('this is data', data);
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			console.log('This is error', err);
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while creating the Client.'
// 			});
// 		});
// };

// Retrieve all Clients from the database.
// Path GET /api/clients/

exports.findAll = async (req, res) => {
	const { category, limit, offset } = req.query;

	var categoryCondetion = category ? { category_id: category } : null;

	try {
		const { count, rows } = await Menu.findAndCountAll({
			where: categoryCondetion,
			include: [ { model: User, as: 'chef' }, { model: Category, as: 'category' }, Sizes ],
			limit: limit ? parseInt(limit) : 15,
			offset: offset ? parseInt(offset) : 0,
			order: [ [ 'category_id', 'DESC' ] ]
		});
		res.send({ count, data: rows });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving menu.'
		});
	}
};

// Find a single Client with an id
// Path GET /api/clients/:id
// exports.findOne = (req, res) => {
// 	const id = req.params.id;

// 	Client.findByPk(id)
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: 'Error retrieving Client with id=' + id
// 			});
// 		});
// };

// Update an Client by the id in the request
// Path PUT /api/clients/:id
// exports.update = (req, res) => {
// 	const id = req.params.id;
// 	const client = {
// 		full_name: req.body.name,
// 		type: req.body.type,
// 		discount: req.body.discount,
// 		phone: req.body.phone,
// 		address: req.body.address,
// 		email: req.body.email
// 	};
// 	Client.update(client, {
// 		where: { client_id: id }
// 	})
// 		.then((num) => {
// 			if (num == 1) {
// 				res.send({
// 					message: 'Client was updated successfully.'
// 				});
// 			} else {
// 				res.send({
// 					message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: 'Error updating Client with id=' + id
// 			});
// 		});
// };

// Delete an Client with the specified id in the request
// Path DELETE /api/clients/:id
// exports.delete = (req, res) => {
// 	const id = req.params.id;

// 	Client.destroy({
// 		where: { client_id: id }
// 	})
// 		.then((num) => {
// 			if (num == 1) {
// 				res.send({
// 					message: 'Client was deleted successfully!'
// 				});
// 			} else {
// 				res.status(500).send({
// 					message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: 'Could not delete Client with id=' + id
// 			});
// 		});
// };

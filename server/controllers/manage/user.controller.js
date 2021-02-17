// const db = require('../../models');
// const User = db.user;
// const Table = db.table;
// const Request = db.request;

// // Find a single user with an id
// // Path GET /api/manage/users/:id
// exports.findUser = async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const data = await User.findByPk(id);
// 		res.send(data);
// 	} catch (error) {
// 		console.log('single user error', error);
// 		res.status(500).send({
// 			message: 'Error retrieving User with id=' + id
// 		});
// 	}
// };

// // Create and Save a new user
// // Path POST /api/manage/users
// exports.registerUser = async (req, res) => {
// 	// Validate request
// 	if (!req.body.table) {
// 		res.status(400).send({
// 			message: 'Table is empty!'
// 		});
// 		return;
// 	}
// 	// Create a Client
// 	const user = {
// 		user_id: Date.now() + '',
// 		table_id: req.body.table,
// 		name: 'ahmed'
// 	};
// 	// Save Client in the database
// 	try {
// 		const data = await User.create(user);
// 		res.send(data);
// 	} catch (error) {
// 		console.log('This is error', error);
// 		res.status(500).send({
// 			message: error.message || 'Some error occurred while creating user.'
// 		});
// 	}
// };

// // Retrieve all users.
// // Path GET /api/manage/users
// exports.findAllUsers = async (req, res) => {
// 	const { tableId } = req.query;
// 	var tableCondetion = tableId ? { table_id: tableId } : null;
// 	try {
// 		const { count, rows } = await User.findAndCountAll({
// 			where: tableCondetion,
// 			include: [ Table ],
// 			order: [ [ 'table_id', 'DESC' ] ]
// 		});
// 		res.send({ count, data: rows });
// 	} catch (error) {
// 		res.status(500).send({
// 			message: error.message || 'Some error occurred while retrieving Users.'
// 		});
// 	}
// };



// // Revoke permission from user.
// // Path GET /api/manage/permissions

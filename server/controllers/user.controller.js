const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const secretOrKey = require('../config/keys').secretOrKey;
const User = db.user;
const Permission = db.permission;
const Op = db.Sequelize.Op;

// Create a User
// api/users/login
exports.login = async (req, res) => {
	const { name, password } = req.body;
	const errors = {};
	try {
		const data = await User.findOne({
			where: { name: name }
		});
		if (!data) {
			errors.username = 'wrong username or password';
			return res.status(400).json(errors);
		}

		const hashResult = await bcrypt.compare(password, data.password);
		console.log('hashResult', hashResult);

		if (!hashResult || hashResult === false) {
			console.log('hashResult', hashResult);
			errors.username = 'wrong username or password';
			return res.status(400).json(errors);
		}
		const permissions = await Permission.findAll({
			where: {
				user_id: data.user_id
			}
		});
		const permissionsCodes = [];
		permissions.forEach((e) => {
			permissionsCodes.push(e.privilege_id);
		});
		const payload = {
			name: data.name,
			id: data.user_id,
			permissions: permissionsCodes
		};
		jwt.sign(payload, secretOrKey, {}, (err, token) => {
			if (err) {
				errors.jwt = 'jwt error :' + err;
				console.log('jwt err', err);
				return res.status(400).json(errors);
			}
			res.json({
				success: true,
				token: 'bearer ' + token
			});
		});
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', err);
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving tutorials.'
		});
	}
};

// PRIVATE CRUD-users (12)
// api/users/register
exports.register = async (req, res) => {
	const { password, name, role } = req.body;
	//check if the user has permission to proceed
	const admin = await userValidation(req.user.id, 12);
	if (!admin) return res.status(403).send('unautherized');
	// proceed action
	//hash the password
	try {
		const hash = await bcrypt.hash(password, 12);
		// Create a user
		const newUser = {
			password: hash,
			name,
			role_name: role
		};
		// Save User in the database
		const data = await User.create(newUser);
		res.send(data);
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: error.message || 'Some error occurred while creating user.'
		});
	}
};

// PRIVATE CRUD-users (12)
// Grand permission to user.
// Path POST /api/users/grant-permission
exports.grantPermission = async (req, res) => {
	const { user, privilege } = req.body;

	// Create a new permission
	const newPermission = {
		user_id: user,
		privilege_id: privilege
	};
	// Save Permission in the database
	try {
		//check if the altered-user is not master (master id = 18)
		if (user + '' === '18') return res.status(403).send('unautherized');
		//check if the user has permission to proceed
		const admin = await userValidation(req.user.id, 12);
		if (!admin) return res.status(403).send('unautherized');
		// proceed action
		const data = await Permission.create(newPermission);
		res.send(data);
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: error.message || 'Some error occurred while creating user.'
		});
	}
};
// PRIVATE CRUD-users (12)
// Revoke permission from user.
// Path DELETE /api/users/revoke-permission
exports.revokePermission = async (req, res) => {
	const { user, privilege } = req.query;
	console.log('user', req.user);
	try {
		//check if the altered-user is not master (master id = 18)
		if (user + '' === '18') return res.status(403).send('unautherized');
		//check if the user has permission to proceed
		const admin = await userValidation(req.user.id, 12);
		if (!admin) return res.status(403).send('unautherized');
		// proceed action
		const data = await Permission.destroy({
			where: {
				[Op.and]: [
					{
						user_id: user
					},
					{
						privilege_id: privilege
					}
				]
			}
		});
		console.log('data', data);
		data === 1 ? res.send('success') : res.send('not-found');
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: error.message || 'Some error occurred while creating user.'
		});
	}
};

const userValidation = async (id, code) => {
	try {
		const admin = await Permission.findOne({
			where: {
				[Op.and]: [
					{
						user_id: id
					},
					{
						privilege_id: code
					}
				]
			}
		});
		return admin === null ? false : true;
	} catch (error) {
		return false;
	}
};

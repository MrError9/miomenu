const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const secretOrKey = require('../config/keys').secretOrKey;
const User = db.user;

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
		const payload = {
			name: data.name,
			id: data.user_id,
			privileges:JSON.parse(data.privileges)
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
			message: 'Some error occured while trying to login'
		});
	}
};

// PRIVATE CRUD-users (12)
// api/users/create
exports.createAdmin = async (req, res) => {
	const { password, name, privileges } = req.body;
	//check if the user has permission to proceed
	if (!req.user.privileges.includes('ADMIN') || privileges.includes('SUPER'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	// proceed action
	//hash the password
	try {
		//check if email already exist
		const userExist = await User.findOne({
			where: {
				email
			}
		});
		if (userExist) {
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'User already exist'
				}
			});
		}
		const hash = await bcrypt.hash(password, parseInt(saltOrRounds));
		// Create a user
		const newUser = {
			password: hash,
			name,
			privileges: JSON.stringify(privileges)
		};
		// Save User in the database
		const data = await User.create(newUser);
		return res.json({
			result: 'Success',
			message: { en: 'Admin created successfuly' },
			data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: error.message || 'Some error occurred while creating user.'
		});
	}
};

// get all system users
// api/users/all [private]
exports.getAllAdmins = async (req, res) => {
	if (!req.user.privileges.includes('ADMIN') && !req.user.privileges.includes('SUPER'))
		return res.status(403).json('Unauthorized');
	try {
		let data = await User.findAll({
			attributes: ['name', 'email', 'createdAt', 'updatedAt', 'privileges', 'user_id', 'suspended']
		});
		if (!data) {
			res.status(404).json({
				result: 'Fail',
				message: {
					en: 'there is no data'
				}
			});
		}
		data = data.filter(data => !data.privileges.includes('SUPER'))
		return res.json({
			result: 'Success',
			message: data
		});
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while getting blogs'
			}
		});
	}
};

// PRIVATE "ADMIN"
// Grand ord Revoke permission to/from user, suspend user
// Path POST /api/system-users/update
exports.updateUser = async (req, res) => {
	const { userId, privileges, suspended } = req.body;

	//check if the admin has permission
	if (!req.user.privileges.includes('ADMIN') || privileges.includes('SUPER'))
		return res.status(401).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	try {
		//check if the altered-user is not super
		const alteredUser = await User.findByPk(userId);
		if (alteredUser.privileges.includes('SUPER'))
			return res.status(403).json({
				result: 'Fail',
				message: {
					en: 'Unauthorized'
				}
			});
		// add the privilege to the user
		const data = await User.update(
			{
				privileges: JSON.stringify(privileges),
				suspended
			},
			{
				where: {
					user_id: userId
				}
			}
		);
		res.json({
			result: 'Success',
			message: { en: 'Admin updated successfuly' },
			data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while trying to change permissions'
			}
		});
	}
};

// change password 
// Path POST /api/system-users/change-password
exports.changePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	//TODO check for valid admin, must not be model
	// if (!req.user.system)
	// 	return res.status(401).json({
	// 		result: 'Fail',
	// 		message: {
	// 			en: 'Unauthorized'
	// 		}
	// 	});
	//check if there is token

	try {
		//check if the user exist & is not verified
		const data = await User.findByPk(req.user.user_id, {
			attributes: ['user_id', 'privileges', 'password'],
		});

		const hashResult = await bcrypt.compare(oldPassword, data.password);
		if (!hashResult)
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'wrong password'
				}
			});
		const hashPassword = await bcrypt.hash(newPassword, saltOrRounds);
		await User.update(
			{
				password: hashPassword
			},
			{
				where: {
					user_id: req.user.user_id
				}
			}
		);
		return res.json({
			result: 'Success',
			message: data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while trying to change password'
			}
		});
	}
};



// PRIVATE CRUD-users (12)
// Grand permission to user.
// Path POST /api/users/grant-permission
// exports.grantPermission = async (req, res) => {
// 	const { user, privilege } = req.body;

// 	// Create a new permission
// 	const newPermission = {
// 		user_id: user,
// 		privilege_id: privilege
// 	};
// 	// Save Permission in the database
// 	try {
// 		//check if the altered-user is not master (master id = 18)
// 		if (user + '' === '18') return res.status(403).send('unautherized');
// 		//check if the user has permission to proceed
// 		const admin = await userValidation(req.user.id, 12);
// 		if (!admin) return res.status(403).send('unautherized');
// 		// proceed action
// 		const data = await Permission.create(newPermission);
// 		res.send(data);
// 	} catch (error) {
// 		console.log('This is error', error);
// 		res.status(500).send({
// 			message: error.message || 'Some error occurred while creating user.'
// 		});
// 	}
// };
// PRIVATE CRUD-users (12)
// Revoke permission from user.
// Path DELETE /api/users/revoke-permission
// exports.revokePermission = async (req, res) => {
// 	const { user, privilege } = req.query;
// 	console.log('user', req.user);
// 	try {
// 		//check if the altered-user is not master (master id = 18)
// 		if (user + '' === '18') return res.status(403).send('unautherized');
// 		//check if the user has permission to proceed
// 		const admin = await userValidation(req.user.id, 12);
// 		if (!admin) return res.status(403).send('unautherized');
// 		// proceed action
// 		const data = await Permission.destroy({
// 			where: {
// 				[Op.and]: [
// 					{
// 						user_id: user
// 					},
// 					{
// 						privilege_id: privilege
// 					}
// 				]
// 			}
// 		});
// 		console.log('data', data);
// 		data === 1 ? res.send('success') : res.send('not-found');
// 	} catch (error) {
// 		console.log('This is error', error);
// 		res.status(500).send({
// 			message: error.message || 'Some error occurred while creating user.'
// 		});
// 	}
// };




// const userValidation = async (id, code) => {
// 	try {
// 		const admin = await Permission.findOne({
// 			where: {
// 				[Op.and]: [
// 					{
// 						user_id: id
// 					},
// 					{
// 						privilege_id: code
// 					}
// 				]
// 			}
// 		});
// 		return admin === null ? false : true;
// 	} catch (error) {
// 		return false;
// 	}
// };

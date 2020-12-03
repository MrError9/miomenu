const jwt = require('jsonwebtoken');
const db = require('../models');
const secretOrKey = require('../config/keys').secretOrKey;
const User = db.user;

// api/users/login
exports.login = async (req, res) => {
	const { name, password } = req.body;

	const errors = {};
	try {
		const data = await User.findOne({
			where: { name: name, password: password }
		});
		if (data) {
			const payload = {
				name: data.name,
        id: data.user_id,
        wt:'me'
			};
			jwt.sign(payload, secretOrKey, {}, (err, token) => {
				if (err) {
          errors.jwt = 'jwt error :'+err;
          console.log('jwt err', err)
					return res.status(400).json(errors);
				}
				res.json({
					success: true,
					token: 'bearer ' + token
				});
			});
		} else {
			errors.username = 'wrong username or password';
			return res.status(400).json(errors);
		}
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', err);
		res.status(500).send({
			message: error.message || 'Some error occurred while retrieving tutorials.'
		});
	}
};

exports.register = (req, res) =>{
  console.log('req', req)
  res.send(req.user)
}

//bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
//});
//bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
//});

module.exports = (app) => {
	const passport = require('passport')
	const user = require('../controllers/user.controller');
	var router = require('express').Router();

	// User Auth
	router.post('/login', user.login);
	router.post('/register', passport.authenticate('jwt', { session: false }), user.register);
	//permissions
	router.post('/grant-permission', passport.authenticate('jwt', { session: false }), user.grantPermission);
	router.post('/revoke-permission', passport.authenticate('jwt', { session: false }), user.revokePermission);
	

	app.use('/api/users', router);
};

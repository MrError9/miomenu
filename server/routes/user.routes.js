module.exports = (app) => {
	const passport = require('passport')
	const user = require('../controllers/user.controller');
	var router = require('express').Router();

	// User Auth
	router.post('/login', user.login);
	router.get('/all', passport.authenticate('jwt', { session: false }), user.getAllAdmins);
	router.post('/create', passport.authenticate('jwt', { session: false }), user.createAdmin);
	router.post('/update', passport.authenticate('jwt', { session: false }), user.updateUser);
	router.post('/change-password',passport.authenticate('jwt', { session: false }),user.changePassword);
	// router.post('/grant-permission', passport.authenticate('jwt', { session: false }), user.grantPermission);
	// router.post('/revoke-permission', passport.authenticate('jwt', { session: false }), user.revokePermission);
	

	app.use('/api/users', router);
};

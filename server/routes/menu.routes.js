module.exports = (app) => {
	const menu = require('../controllers/menu.controller');

	var router = require('express').Router();

	// Retrieve all Clients
	router.get('/', menu.findAll);

	app.use('/api/menu', router);
};
module.exports = (app) => {
	const table = require('../controllers/table.controller');

	var router = require('express').Router();
  
  // Register customer
	router.post('/customers', table.registerCustomer);

	// Retrieve all Clients
	router.get('/customers/:id', table.findCustomer);

	// Send request
	router.post('/requests', table.sendRequest);

		//Find request
	router.get('/requests/:id', table.findRequest);

	app.use('/api/table', router);
};
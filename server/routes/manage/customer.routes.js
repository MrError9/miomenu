module.exports = (app) => {
	const manage = require('../../controllers/manage/customer.controller');

	var router = require('express').Router();

	// Retrieve all requests
	router.get('/', manage.findAllRequests);

	// delete a request
	router.delete('/:id', manage.deleteRequest);

	// Retrieve all customers
	router.get('/', manage.findAllCustomers);

	// delete all customers
	router.get('/', manage.deleteAllCustomers);

	app.use('/api/manage/customers', router);
};

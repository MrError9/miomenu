const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const CustomerModel = sequelize.define(
		'table_items',
		{
			customer_id: {
				type: Sequelize.STRING
			},
			table_id: {
				type: Sequelize.INTEGER
			},
			item_id: {
				type: Sequelize.INTEGER
			},
			size: {
				type: Sequelize.INTEGER
			},
			price: {
				type: Sequelize.INTEGER
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			total: {
				type: Sequelize.INTEGER
			},
			state: {
				type: Sequelize.STRING
			}
		},
		{
			id: false
		}
	);

	return CustomerModel;
};

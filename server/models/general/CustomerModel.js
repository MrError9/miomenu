const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const CustomerModel = sequelize.define(
		'customers',
		{
			customer_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			table_id: {
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return CustomerModel;
};

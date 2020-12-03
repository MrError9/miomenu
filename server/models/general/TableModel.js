const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const TableModel = sequelize.define(
		'tables',
		{
			table_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			number: {
				type: Sequelize.INTEGER
			},
			state: {
				type: Sequelize.STRING
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return TableModel;
};

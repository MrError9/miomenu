const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const RequestModel = sequelize.define(
		'requests',
		{
			request_id: {
				type: Sequelize.STRING,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING
			},
			table_id: {
				type: Sequelize.INTEGER
			},
			state:{
				type : Sequelize.STRING
			}
		},
		{
			updatedAt: false,
			id: false
		}
	);

	return RequestModel;
};

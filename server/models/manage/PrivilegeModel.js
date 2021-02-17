const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const PrivilegeModel = sequelize.define(
		'privileges',
		{
			privilege_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			title: {
				type: Sequelize.STRING
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return PrivilegeModel;
};

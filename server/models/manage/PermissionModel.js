const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const PermissionModel = sequelize.define(
		'permissions',
		{
			privilege_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			user_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return PermissionModel;
};

const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const UserModel = sequelize.define(
		'users',
		{
			user_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			password: {
				type: Sequelize.STRING
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

	return UserModel;
};

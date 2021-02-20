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
			},
			role_name: {
				type: Sequelize.STRING
			}
		},
		{
			id: false
		}
	);

	return UserModel;
};

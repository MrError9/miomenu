const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const MenuItem = sequelize.define(
		'items',
		{
			item_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			category_id: {
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER
			},
			state: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			time: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			title_en: {
				type: Sequelize.STRING
			},
			title_ar: {
				type: Sequelize.STRING,
				allowNull: true
			},
			title_ku: {
				type: Sequelize.STRING,
				allowNull: true
			},
			desc_en: {
				type: Sequelize.STRING,
				allowNull: true
			},
			desc_ar: {
				type: Sequelize.STRING,
				allowNull: true
			},
			desc_ku: {
				type: Sequelize.STRING,
				allowNull: true
			}
		},
		{
			updatedAt: false,
			id: false
		}
	);

	return MenuItem;
};

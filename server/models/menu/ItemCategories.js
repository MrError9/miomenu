const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const ItemCategory = sequelize.define(
		'categories',
		{
			category_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			title_en: {
				type: Sequelize.STRING,
			},
			title_ar: {
				type: Sequelize.STRING
			},
			title_ku: {
				type: Sequelize.STRING,
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return ItemCategory;
};

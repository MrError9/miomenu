const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const ItemSize = sequelize.define(
		'sizes',
		{
			item_id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			size: {
				type: Sequelize.SMALLINT,
				primaryKey: true
			},
			price: {
				type: Sequelize.INTEGER
			},
			cal: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		},
		{
			createdAt: false,
			updatedAt: false,
			id: false
		}
	);

	return ItemSize;
};

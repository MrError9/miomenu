const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});
// test database connection
const testDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
testDB();
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//staff
db.user = require('./manage/UserModel')(sequelize);
db.privilege = require('./manage/PrivilegeModel')(sequelize);
db.permission = require('./manage/PermissionModel')(sequelize);
//menu
db.menu_item = require('./menu/MenuItem')(sequelize);
db.item_size = require('./menu/ItemSizes')(sequelize);
db.item_category = require('./menu/ItemCategories')(sequelize);
//general
db.table = require('./general/TableModel')(sequelize);
db.customer = require('./general/CustomerModel')(sequelize);
db.request = require('./general/RequestModel')(sequelize);
db.tabel_item = require('./general/TableItem')(sequelize);


//Asosiactions
db.menu_item.belongsTo(db.user, { as: 'chef', foreignKey: 'user_id' });
db.menu_item.belongsTo(db.item_category, { as: 'category', foreignKey: 'category_id' });
db.menu_item.hasMany(db.item_size, {foreignKey: 'item_id'});
db.item_size.belongsTo(db.menu_item, {foreignKey: 'item_id'});
db.customer.belongsTo(db.table, { as: 'table', foreignKey: 'table_id' });
db.tabel_item.belongsTo(db.table, { as: 'table', foreignKey: 'table_id' });
db.tabel_item.belongsTo(db.customer, { as: 'customer', foreignKey: 'customer_id' });
db.tabel_item.belongsTo(db.menu_item, { as: 'item', foreignKey: 'item_id' });


// db.purchase.belongsTo(db.product,{foreignKey: 'product_id' });
// db.product.hasOne(db.purchase,{foreignKey: 'product_id' });

// db.orders.belongsTo(db.client, {as:'sponsor', foreignKey: 'sponsor_id' });
// db.orders.belongsTo(db.client, {as:'client', foreignKey: 'client_id' });
// db.orders.belongsTo(db.admin,{as:'admin',foreignKey: 'admin_id' });
// db.admin.hasOne(db.orders,{foreignKey: 'admin_id' });

//Asosiactions
// db.orders_items.belongsTo(db.product,{foreignKey: 'product_id' });
// db.product.hasOne(db.orders_items,{foreignKey: 'product_id' });

// db.pending_items.belongsTo(db.product,{foreignKey: 'product_id' });
// db.pending_items.belongsTo(db.client, {as:'client', foreignKey: 'client_id' });
// db.product.hasOne(db.pending_items,{foreignKey: 'product_id' });
// db.pending_items.belongsTo(db.admin,{as:'admin',foreignKey: 'admin_id' });
// db.admin.hasOne(db.pending_items,{foreignKey: 'admin_id' });

module.exports = db;

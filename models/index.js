const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('../config/dbconfig.js');

// Initialize Sequelize
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        dialectOptions: {
            ssl: false
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Connection successful.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./userModel.js')(sequelize, DataTypes);
db.products = require('./productsModel.js')(sequelize, DataTypes);
db.orders = require('./ordersModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);
db.discounts = require('./discountsModel.js')(sequelize, DataTypes);
// db.payments = require('./paymentModel.js')(sequelize, DataTypes);
db.categories = require('./categoryModel.js')(sequelize, DataTypes);

// Define associations
//user and products
db.users.hasMany(db.products, {
    foreignKey: 'userId',
    as: 'products'
});
db.products.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
});

//products and category
db.categories.hasMany(db.products, {
    foreignKey: 'categoryId',
    as: 'products'
});
db.products.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'category'
});

//products and discount
db.products.hasMany(db.discounts, {
    foreignKey: 'productId',
    as: 'discounts'
});
db.discounts.belongsTo(db.products, {
    foreignKey: 'productId',
    as: 'product'
});

//products and reviews
db.products.hasMany(db.reviews, {
    foreignKey: 'productId',
    as: 'reviews'
});
db.reviews.belongsTo(db.products, {
    foreignKey: 'productId',
    as: 'product'
});

//review and user
db.users.hasMany(db.reviews, {
    foreignKey: 'userId',
    as: 'reviews'
});
db.reviews.belongsTo(db.users, {
    foreignKey: 'productId',
    as: 'users'
});


// Order model
db.orders.belongsTo(db.products, {
    foreignKey: 'productId',
    as: 'product'
});

db.products.hasMany(db.orders, {
    foreignKey: 'productId',
    as: 'orders'
});

db.orders.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
});

db.users.hasMany(db.orders, {
    foreignKey: 'userId',
    as: 'orders'
});


// Sync Models
db.sequelize.sync({ force: false })
.then(() => {
    console.log('Database synchronized successfully.');
})
.catch(err => {
    console.error('Error synchronizing the database:', err);
});

module.exports = db;

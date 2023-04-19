const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Category = require('./categoryModel');
db.Coursier = require('./coursierModel');
db.Orders = require('./orderModel');
db.User = require('./userModel')

db.Coursier.belongsTo(db.Category, {foreignKey: "category_id"} );
db.Category.hasMany(db.Coursier, { foreignKey: "category_id" });

db.Orders.belongsTo(db.Coursier, {foreignKey: "coursier_id"});
db.Coursier.hasMany(db.Orders, {foreignKey: "coursier_id"});
module.exports = db
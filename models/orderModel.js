const Sequelize = require('sequelize')
const db = require('../db.js')

const Orders = db.define('orders', {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name_customer: { type: Sequelize.STRING, allowNull: false },
    name_restaurant: { type: Sequelize.STRING, allowNull: false },
    adress_customer: {type: Sequelize.STRING, allowNull: false},
    adress_restaurant: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false},
    distance: {type: Sequelize.DECIMAL, allowNull: false},
})

module.exports = Orders
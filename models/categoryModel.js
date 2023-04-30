const Sequelize = require('sequelize')
const db = require('../db.js')

const Category = db.define('category', {
    category_name: { 
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    description: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Category
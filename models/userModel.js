const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false }
})

module.exports = User
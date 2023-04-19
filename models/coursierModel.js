const Sequelize = require('sequelize')
const db = require('../db.js')

const Coursier = db.define('coursier', {
    coursier_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    adress: { type: Sequelize.STRING, allowNull: false },
    recruitment_date: {type: Sequelize.STRING, allowNull: false},
    Num_tel: {type: Sequelize.STRING, allowNull: false}
})

module.exports = Coursier
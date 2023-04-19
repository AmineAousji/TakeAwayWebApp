require('dotenv').config(); 

const Sequelize = require('sequelize')
const sequelize = new Sequelize('take_away', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
   }
);
module.exports = sequelize
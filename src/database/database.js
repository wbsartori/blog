const Sequelize = require('sequelize');

const connection = new Sequelize(
    'blog',
    'admin',
    'admin', {
                dialect: 'mysql',
                timezone: '-03:00'
        });


module.exports = connection;
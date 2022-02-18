const Sequelize = require('sequelize');

const connection = new Sequelize(
    'blog',
    'admin',
    'admin', {
        dialect: 'mysql'
});


module.exports = connection;
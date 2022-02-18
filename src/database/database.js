const Sequelize = require('sequelize');

const connection = new Sequelize(
    'blog',
    'root',
    '', {
        dialect: 'mysql'
});


module.exports = connection;
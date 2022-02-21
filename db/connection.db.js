const { Sequelize } = require('sequelize');
const test = require('./connectionTest.db');
const { database, user, password, host, dialect } = require("../config/config.json")[0].development;
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect
});
test(sequelize);
module.exports = sequelize;

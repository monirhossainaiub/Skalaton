const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEMA || 'teamapp', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'docker', {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    logging: true
});

export default sequelize;
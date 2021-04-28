require('dotenv').config();
// ENV VARIABLES
const config ={
    dev: process.env.NODE_ENV !== 'production',
    host: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
};

module.exports = { config: config };
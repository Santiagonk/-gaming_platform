require('dotenv').config();
// ENV VARIABLES
const config ={
    dev: process.env.NODE_ENV !== 'production',
    host: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    //default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
    //default_user_password: process.env.DEFAULT_USER_PASSWORD,
    auth_jwt_secret: process.env.AUTH_JWT_SECRET,
   // public_api_ket_token: process.env.PUBLIC_API_KEY_TOKEN,
    //admin_api_key_token= process.env.ADMIN_API_KEY_TOKEN
};

module.exports = { config: config };
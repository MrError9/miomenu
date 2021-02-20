module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: process.env.DB_CONNECTION,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// DB_CONNECTION=mysql
// DB_HOST=localhost
// DB_PORT=3306
// DB_DATABASE=menu_demo
// DB_USERNAME=root
// DB_PASSWORD=
// SECRET_OR_KEY=aErq4U:9LFrRp}MH
// SALT_OR_ROUNDS=12
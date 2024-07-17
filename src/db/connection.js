import mongoose from 'mongoose';
import { Sequelize, } from 'sequelize';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = +process.env.DB_PORT;
const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME;

/**
 * 
 * Para los que utilizan XAMPP: mysql://localhost:3306/enyoiPractice
 * Para los que tienen usuario root pero no contrasena: mysql://root@localhost:3306/database
 * Para los que utilizan usuario y contraseña: mysql://username:password@localhost:3306/enyoiPractice
 * 
 */
const sequelize = new Sequelize(
  // 'mysql://root:2004@localhost:3306/enyoiPractice' // uri
  DB_DATABASE_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
  },
);

const DB_MONGO_URI = process.env.DB_MONGO_URI;

const mongo = mongoose.connect(DB_MONGO_URI, {
  dbName: DB_DATABASE_NAME,
});

try {
  await sequelize.authenticate();
  console.log('Connected to database');
} catch (err) {
  console.error('Error to connect to database: ', err);
}

export {
  mongo,
  sequelize,
}
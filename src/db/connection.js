import { Sequelize, } from 'sequelize';

/**
 * 
 * Para los que utilizan XAMPP: mysql://localhost:3306/enyoiPractice
 * Para los que tienen usuario root pero no contrasena: mysql://root@localhost:3306/database
 * Para los que utilizan usuario y contraseña: mysql://username:password@localhost:3306/enyoiPractice
 * 
 */
const sequelize = new Sequelize('mysql://root:2004@localhost:3306/enyoiPractice');

try {
  await sequelize.authenticate();
  console.log('Connected to database');
} catch (err) {
  console.error('Error to connect to database: ', err);
}

export {
  sequelize,
}
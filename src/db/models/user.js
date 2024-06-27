import { DataTypes, } from 'sequelize';

import { sequelize, } from '../connection.js';

/**
 * 
 * Definición de un Modelo.
 * 
 */
/***
 *
 * 
 * CREATE TABLE IF NOT EXISTS User(
  *   id VARCHAR(36) PRIMARY_KEY NOT NULL,
  *   name VARCHAR NOT NULL,
  *   email VARCHAR NOT NULL UNIQUE,
  *   password VARCHAR NOT NULL,
 * );
 * 
 * // NO UTILIZAMOS SQL
 * 
 * UTILIZAMOS LENGUAJE DE PROGRAMACIÓN
 * 
 */

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

/***
 * 
 * Nos convierte el codigo de Javascript
 * a codigo de SQL
 * 
 */
User.sync({
  // force: true,
}); 

export { User };
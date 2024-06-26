import { DataTypes, } from 'sequelize';

import { sequelize, } from '../connection.js';

/**
 * 
 * Definición de un Modelo.
 * 
 */
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
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

export default User;
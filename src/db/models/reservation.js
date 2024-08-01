import { DataTypes } from 'sequelize';

import { sequelize } from '../connection.js';

const Reservation = sequelize.define(
  'Reservation',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancel'), // ACTIVO, INACTIVO O CANCELADO.
      allowNull: false,
      defaultValue: 'active',
    },
    nightsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    RoomId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: false,
      references: {
        model: 'Room',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
);

export default Reservation;
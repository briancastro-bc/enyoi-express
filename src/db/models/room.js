import { DataTypes, } from 'sequelize';

import { sequelize } from '../connection.js';

const Room = sequelize.define(
  'Room',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codeName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotelId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    }
  },
  {
    timestamps: true,
  },
);

Room.sync({
  force: true,
});

export default Room;
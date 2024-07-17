import User from './user.js';
import Room from './room.js';
import Hotel from './hotel.js';
import Reservation from './reservation.js';

Hotel.hasMany(Room, {
  // foreignKey: 'hotelId',
});
Room.belongsTo(Hotel);

User.hasMany(Reservation);
Reservation.belongsTo(User);

User.belongsToMany(Room, { through: Reservation, });
Room.belongsToMany(User, { through: Reservation, });

export { User, Room, Hotel, Reservation, };
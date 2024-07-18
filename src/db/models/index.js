import User from './user.js';
import Room from './room.js';
import Hotel from './hotel.js';
import Reservation from './reservation.js';

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

User.hasMany(Reservation);
Reservation.belongsTo(User);

User.belongsToMany(Room, { 
  through: Reservation, 
  foreignKeyConstraint: true, 
});
Room.belongsToMany(User, { 
  through: Reservation, 
  foreignKeyConstraint: true, 
});

Hotel.sync({
  // force: true,
});

User.sync({
  // force: true,
}); 

Room.sync({
  // force: true,
});

Reservation.sync({
  // force: true,
});

export { User, Room, Hotel, Reservation, };
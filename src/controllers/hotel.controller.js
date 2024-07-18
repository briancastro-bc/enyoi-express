import { Hotel, } from '../db/models/index.js';

export const getAllHotels = async (req, res) => {
  const hotels = await Hotel.findAll({
    where: {
      isActive: true,
    },
    order: [['name', 'ASC']] // A-Z
  });

  return res
    .status(200)
    .json({
      success: true,
      length: hotels?.length,
      data: hotels ?? [],
    });
};
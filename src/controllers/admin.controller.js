import { Op, } from 'sequelize';
import { randomUUID, } from 'crypto';

import { Room, Hotel, } from '../db/models/index.js';

export const createHotel = async (req, res) => {
  const {
    name,
  } = req.body;

  try {
    const hotelByName = await Hotel.findOne({
      where: {
        name,
      },
    });
    if (hotelByName) {
      return res
      .status(400)
      .json({
        success: false,
        message: 'Ya existe un hotel con el mismo',
      });
    }
    
    const uuid = randomUUID();

    await Hotel.create({
      id: uuid,
      ...req.body,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: 'Se ha creado el hotel',
      });
  } catch {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const updateHotel = async (req, res) => {
  const id = req.params['id'];

  try {
    const hotelById = await Hotel.findOne({
      where: { 
        id, 
      },
    });
    if (!hotelById) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'El hotel a actualizar no existe',
        });
    }

    const updatedHotel = {
      ...hotelById,
      ...req.body,
    };

    await Hotel.update({
      ...updatedHotel,
    }, {
      where: {
        id,
      },
    });

    return res
      .status(201)
      .json({
        success: true,
        message: `Se ha actualizado el hotel ${id}`,
        data: {
          ...updatedHotel,
        },
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const deleteHotel = async (req, res) => {
  const id = req.params['id'];

  try {
    const hotelById = await Hotel.findOne({
      where: { 
        id, 
      },
    });
    if (!hotelById) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'El hotel a actualizar no existe',
        });
    }

    // 1. Opcion: Borrado fisico
    // DELETE FROM Hotels WHERE id = $id;
    // await Hotel.destroy({
    //   where: {
    //     id,
    //   },
    // });

    // 2. Opcion: Borrado logico
    await Hotel.update({
      isActive: false,
    }, {
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: `Se ha eliminado el hotel ${id}`,
      });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const createRoom = async (req, res) => {
  const {
    codeName,
    hotelId,
  } = req.body;

  try {
    const hotelById = await Hotel.findOne({
      where: {
        id: hotelId,
      },
    });
    if (!hotelById) {
      return res
      .status(400)
      .json({
        success: false,
        message: 'No existe el hotel a cual quiere relacionar la habitacion',
      });
    }

    const roomByCodeName = await Room.findOne({
      where: {
        codeName,
      },
    });

    if (roomByCodeName) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Ya hay una habitacion creada con el nombre clave',
        });
    }
    
    const uuid = randomUUID();

    await Room.create({
      id: uuid,
      ...req.body,
      hotelId,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: 'Se ha creado el hotel',
      });
  } catch (err) {
    console.log(err);

    return res
      .status(400)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
};

export const updateRoom = async (req, res) => {
  return res.send('Works');
};

export const deleteRoom = async (req, res) => {
  return res.send('Works');
};
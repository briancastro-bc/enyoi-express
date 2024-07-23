import { User, } from '../db/models/index.js';

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  if (!users || users.length <= 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No se encontraron usuarios',
      });
  }

  return res
    .status(200)
    .json({
      success: true,
      message: "Todos los usuarios",
      // data: [
      //   ...users,
      // ],
      data: users,
    });
};

export const getUserByToken = async (req, res) => {
  const userEmail = req?.userEmail;
  if (!userEmail) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Usuario no tiene token',
      });
  }

  const userById = await User.findOne({
    where: {
      email: userEmail,
    },
  });
  if (!userById) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'no se encontro el usuario',
      });
  }

  return {
    success: true,
    length: 1,
    data: {
      ...userById?.dataValues,
    }
  }
};

export const isUserAdmin = async (req, res) => {
  const userEmail = req?.userEmail;

  const userById = await User.findOne({
    where: {
      email: userEmail,
    },
  });

  if (userById?.isAdmin) {
    return res
      .status(200)
      .json({
        success: true,
        message: 'El usuario es administrador',
      });
  }

  return res
    .status(200)
    .json({
      success: false,
      message: 'El usuario no es administrador',
    });
};
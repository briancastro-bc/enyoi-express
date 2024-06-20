import users from '../db/users.js';

export const getAllUsers = (req, res) => {
  if (!users || users.length <= 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No se encontraron usuarios',
      });
  }

  // 'SELECT * FROM users';

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
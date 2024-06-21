import users from '../db/users.js';
import { 
  encode, 
} from '../services/authentication.service.js';

const ONE_MS = 1000;

export const login = async (req, res) => {
  console.log(req.body);

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'No hay usuario o contraseña',
      });
  }

  // SELECT * FROM Users WHERE email = ${email}
  const existentedUser = users.find(user => user.email === email);
  if (!existentedUser) {
    return res
      .status(401)
      .json({
        success: false,
        message: "El usuario no ha sido encontrado o no esta registrado",
      });
  }

  if (existentedUser.password !== password) {
    return res
      .status(401)
      .json({
        success: false,
        message: "La contraseña es incorrecta",
      });
  }

  const now = Date.now();

  const { 
    token, 
  } = await encode({
    sub: existentedUser.email,
    name: existentedUser.name,
    // Issued At: cuando se creo el token.
    iat: now,
    // Expired At: tiempo de cuando expira el token.
    exp: now + (ONE_MS * 60 * 60), // 1h 
  });

  return res
    .status(200)
    .json({
      success: true,
      data: { 
        token,
      },
    });
};

/**
 * Estos datos vendran desde la Request:
 * - Name
 * - Email
 * - Password
 * 
 */
export const signup = (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Falta la informacion de registro"
      });
  }

  const existentedUser = users.find(user => user.email === email);
  if (existentedUser) {
    return res
      .status(400)
      .json({
        success: false,
        message: "El usuario ya se encuentra registrado",
      });
  }

  if (password && password.length < 8) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'La contraseña debe tener minimo 8 caracteres'
      });
  }

  // INSERT INTO Users(name, email, password) VALUES('Brian', 'example@mail.com', '12345678');
  users.push({
    name,
    email,
    password,
  });

  return res
    .status(201)
    .json({
      success: true,
      message: "El usuario ha sido registrado",
    });
};
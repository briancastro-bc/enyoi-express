import { randomUUID, } from 'crypto';

import { User, } from '../db/models/user.js';

import { encode, } from '../services/authentication.service.js';
import { encryptPassword, isValidPassword, } from '../services/password.service.js';

const ONE_MS = 1000;

export const login = async (req, res) => {
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
  const existentedUser = await User.findOne({ email, });
  if (!existentedUser) {
    return res
      .status(401)
      .json({
        success: false,
        message: "El usuario no ha sido encontrado o no esta registrado",
      });
  }
  
  // password = 12345678
  // existentedUser.password = $2b$16$W4VWnmnyvQTX44XD3AOvd..ZoM6XZ0k1.9rFhWDP7uprLZ9wJjtse
  const validPassword = await isValidPassword(password, existentedUser.password);

  if (!validPassword) {
    return res
      .status(401)
      .json({
        success: false,
        message: "La contraseña es incorrecta",
      });
  }

  const now = Date.now();

  // Generando/Codificando el token
  const { 
    token, 
  } = await encode({
    sub: existentedUser.email,
    name: existentedUser.name,
    iat: now,
    exp: now + (ONE_MS * 60 * 60), // 1h 
    // exp: now + 1000,
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
export const signup = async (req, res) => {
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

  // SELECT * FROM USERS WHERE EMAIL = 'brian@mail.com' TOP 1;
  const existentedUser = await User.findOne({ email, });
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

  // password = 12345678
  const encryptedPassword = await encryptPassword(password);
  // encryptedPassword = $2b$16$W4VWnmnyvQTX44XD3AOvd..ZoM6XZ0k1.9rFhWDP7uprLZ9wJjtse

  // INSERT INTO User(id, name, email, password) VALUES('iasjdklasjdklasjd', 'Brian', 'example@mail.com', '12345678');
  const uuid = randomUUID();
  await User.create({
    id: uuid,
    name,
    email,
    password: encryptedPassword,
  });

  return res
    .status(201)
    .json({
      success: true,
      message: "El usuario ha sido registrado",
    });
};
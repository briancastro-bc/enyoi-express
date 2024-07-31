// Paso 1. Construccion de un middleware.
// Nota: los middlewares tienen acceso a la solicitud (req), respuesta (req)

import { verify, } from "../services/authentication.service.js";

// y a la llamada siguiente (next);
const authenticationMiddleware = async (req, res, next) => {
  const authorization = req.headers['authorization']; // Bearer token

  if (!authorization) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Falta la cabecera de Authorization',
      });
  }

  // const token = authorization.split(' ')[1];
  const [ ,token, ] = authorization.split(' ');
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'No se encontro el token',
      });
  }

  const { payload, } = await verify(token);
  if (payload && 'success' in payload && !payload.success) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'El token es invalido',
      });
  }

  const {
    exp,
    iss,
    sub,
  } = payload;
  
  // Verificación manual: expiración (exp), issuer (emitido por), 
  // subject (el identificar del usuario).
  // Validar que el token no haya expirado.
  const now = new Date();
  if (exp <= now.getTime()) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'El token expiro/caduco',
      });
  }

  if (!iss || iss !== process.env.APP_URL) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'El claim iss es invalido',
      });
  }

  if (!sub) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'El claim subject no esta presenta en el cuerpo del token',
      });
  }

  req.userEmail = sub;

  next();
};

export default authenticationMiddleware;
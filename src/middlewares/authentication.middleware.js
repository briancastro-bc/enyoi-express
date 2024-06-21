// Paso 1. Construccion de un middleware.
// Nota: los middlewares tienen acceso a la solicitud (req), respuesta (req)
// y a la llamada siguiente (next);
const authenticationMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Falta la cabecera de Authorization',
      });
  }

  next();
};

export default authenticationMiddleware;
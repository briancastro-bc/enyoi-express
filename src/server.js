import 'dotenv/config';
import express from 'express';
import { createServer, } from 'http';

import authenticationMiddleware from './middlewares/authentication.middleware.js';

import usersRouter from './routes/users.routes.js';
import authenticationRouter from './routes/authentication.routes.js';

function bootstrap() {
  const app = express();
  // Llamar a una variable: process.env.<nombre de la variable>
  const port = +process.env.APP_PORT ?? 3000;
  
  app.use(express.json());
  // Forma 1. Utilizar el middleware a nivel global.
  // app.use(authenticationMiddleware);
  app.use('/auth', authenticationRouter);
  // Forma 2. Utilizar el middleware a nivel de router.
  app.use('/users', authenticationMiddleware, usersRouter);

  app.get('/', (req, res) => {
    console.log('req body', req.body);

    res.send('Hola mundo!');
  });
  
  const httServer = createServer(app);
  httServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

bootstrap();
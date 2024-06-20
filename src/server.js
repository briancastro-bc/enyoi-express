import express from 'express';
import { createServer, } from 'http';

import usersRouter from './routes/users.routes.js';
import authenticationRouter from './routes/authentication.routes.js';

function bootstrap() {
  const app = express();
  const port = 3000;
  
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/auth', authenticationRouter);

  app.get('/', (req, res) => {
    res.send('Hola mundo!');
  });
  
  const httServer = createServer(app);
  httServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

bootstrap();
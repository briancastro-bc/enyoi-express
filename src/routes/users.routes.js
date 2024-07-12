import { Router, } from 'express';

import { getAllUsers, } from '../controllers/users.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const usersRouter = Router();

// Forma 3. Pasarle el middleware a la ruta especifica que queremos proteger.
// usersRouter.get('/', authenticationMiddleware, getAllUsers);
usersRouter.get('/', authenticationMiddleware, getAllUsers);

export default usersRouter;
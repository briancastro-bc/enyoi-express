import { Router, } from 'express';

import { 
  login, 
  signup, 
} from '../controllers/authentication.controller.js';

// Paso 1. Crear el router
const authenticationRouter = Router();

// Paso 2. Definir rutas
authenticationRouter.post('/login', login);

authenticationRouter.post('/signup', signup);

// Paso 3. Exportar el Router.
export default authenticationRouter;
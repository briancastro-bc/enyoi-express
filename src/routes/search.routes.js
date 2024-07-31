import { Router, } from 'express';
import { query, } from 'express-validator';

import { searchAll, } from '../controllers/search.controller.js';

import validatorMiddleware from '../middlewares/validator.middleware.js';

const searchRouter = Router();

searchRouter.get(
  '/', 
  [
    query('value')
      .isString()
      .notEmpty(),
  ], 
  validatorMiddleware,
  searchAll
);

export default searchRouter;
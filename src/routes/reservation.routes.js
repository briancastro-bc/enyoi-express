import { Router, } from 'express';
import { body, param, } from 'express-validator';

import {
  createReservation,
  cancelReservation,
  getAllReservationsByUser,
} from '../controllers/reservation.controller.js';
import validatorMiddleware from '../middlewares/validator.middleware.js';

const reservationRouter = Router();

reservationRouter.post(
  '/',  
  [
    body('startDate')
      .notEmpty()
      .isISO8601()
      .toDate(),
    body('endDate')
      .notEmpty()
      .isISO8601()
      .toDate(),
    body('nightsQuantity')
      .notEmpty()
      .isInt(),
    // body('total')
    //   .notEmpty()
    //   .isNumeric(),
    body('roomId')
      .notEmpty()
      .isUUID(),
  ],
  validatorMiddleware,
  createReservation
);

reservationRouter.get('/', getAllReservationsByUser);

reservationRouter.delete(
  '/:id', 
  [
    param('id')
      .notEmpty()
      .isUUID(),
  ],
  validatorMiddleware,
  cancelReservation
);

export default reservationRouter;
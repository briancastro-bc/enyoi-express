import { Router, } from 'express';

import { getAllHotels } from '../controllers/hotel.controller.js';

const hotelRouter = Router();

hotelRouter.get('/', getAllHotels);

export default hotelRouter;
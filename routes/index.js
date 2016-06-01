import express from 'express';
let router = express.Router();

import authenticate from '../middlewares/authenticate';
import userRoutes from './userRoutes';
import dummyRoutes from './dummyRoutes';

//user routes
router.post('/signup', userRoutes.signup);
router.post('/login', userRoutes.login);

//dummy routes
router.get('/say-hello', dummyRoutes.sayHello);
router.get('/private-info', authenticate, dummyRoutes.privateMessage);

export default router;

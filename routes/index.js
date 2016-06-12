import express from 'express';
let router = express.Router();

import authenticate from '../middlewares/authenticate';
import userController from '../controllers/userController';
import dummyController from '../controllers/dummyController';

//user routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

//dummy routes
router.get('/say-hello', dummyController.sayHello);
router.get('/private-info', authenticate, dummyController.privateMessage);

export default router;

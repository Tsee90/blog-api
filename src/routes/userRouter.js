const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const passportJWT = require('../config/passport-jwt');

userRouter.post('/login', userController.login);

userRouter.post('/signup', userController.signup);

userRouter.get(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  userController.getUser
);

userRouter.delete(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  userController.delete
);

userRouter.patch(
  '/email',
  passportJWT.authenticate('jwt', { session: false }),
  userController.updateEmail
);

userRouter.patch(
  '/password',
  passportJWT.authenticate('jwt', { session: false }),
  userController.updatePassword
);

module.exports = userRouter;

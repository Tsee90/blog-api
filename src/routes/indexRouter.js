const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('../config/passport');

indexRouter.post('/login', indexController.login);
indexRouter.get(
  '/secured',
  passport.authenticate('jwt', { session: false }),
  indexController.getSecure
);
indexRouter.post('/signup', indexController.signup);

module.exports = indexRouter;

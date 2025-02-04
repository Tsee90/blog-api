const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const passport = require('../config/passport');

postRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.post
);

module.exports = postRouter;

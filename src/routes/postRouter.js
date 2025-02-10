const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const passportJWT = require('../config/passport-jwt');
const commentRouter = require('./commentRouter');

postRouter.post(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  postController.createPost
);

postRouter.get(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  postController.getAllPosts
);

postRouter.get('/published', postController.getAllPublishedPosts);

postRouter.get(
  '/:postId',
  passportJWT.authenticate('jwt', { session: false }),
  postController.getPost
);

postRouter.delete(
  '/:postId',
  passportJWT.authenticate('jwt', { session: false }),
  postController.deletePost
);

postRouter.patch(
  '/:postId',
  passportJWT.authenticate('jwt', { session: false }),
  postController.updatePost
);

postRouter.patch(
  '/:postId/:published',
  passportJWT.authenticate('jwt', { session: false }),
  postController.publishPost
);

postRouter.use('/:postId/comments', commentRouter);

module.exports = postRouter;

const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');
const passportJWT = require('../config/passport-jwt');

commentRouter.get('/:id', commentController.getCommentById);

commentRouter.post(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.createComment
);

commentRouter.patch(
  '/:id',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.updateCommentContent
);

commentRouter.delete(
  '/:id',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.deleteComment
);

module.exports = commentRouter;

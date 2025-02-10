const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const passportJWT = require('../config/passport-jwt');

commentRouter.get('/:commentId', commentController.getCommentById);

commentRouter.post(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.createComment
);

commentRouter.patch(
  '/:commentId',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.updateCommentContent
);

commentRouter.delete(
  '/:commentId',
  passportJWT.authenticate('jwt', { session: false }),
  commentController.deleteComment
);

module.exports = commentRouter;

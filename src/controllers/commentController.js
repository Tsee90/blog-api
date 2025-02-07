const db = require('../services/commentServices');

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const newComment = await db.createComment(postId, userId, content);
    return res.status(201).json(newComment);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error creating comment', details: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.getCommentById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.json(comment);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error fetching comment', details: err.message });
  }
};

exports.updateCommentContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await db.getCommentById(id);
    if (!comment || comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to edit this comment' });
    }

    const updatedComment = await db.updateCommentContent(id, content);
    return res.json({
      message: 'Comment updated successfully',
      comment: updatedComment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error updating comment', details: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await db.getCommentById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this comment' });
    }

    await db.deleteComment(id);
    return res.status(204).send();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Error deleting comment', details: err.message });
  }
};

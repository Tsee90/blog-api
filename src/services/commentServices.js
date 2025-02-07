const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (postId, userId, content) => {
  try {
    return await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.getCommentById = async (id) => {
  try {
    return await prisma.comment.findUnique({
      where: { id },
    });
  } catch (err) {
    return err;
  }
};

exports.updateCommentContent = async (id, content) => {
  try {
    return await prisma.comment.update({
      where: { id },
      data: { content },
    });
  } catch (err) {
    return err;
  }
};

exports.deleteComment = async (id) => {
  try {
    return await prisma.comment.delete({ where: id });
  } catch (err) {
    return err;
  }
};

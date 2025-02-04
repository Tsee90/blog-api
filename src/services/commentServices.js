const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (content, postId, userId) => {
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

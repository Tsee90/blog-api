const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = async (title, content, authorId) => {
  try {
    return await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  } catch (err) {
    return err;
  }
};

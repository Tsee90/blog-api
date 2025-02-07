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

exports.getAllPosts = async () => {
  try {
    return await prisma.post.findMany({ include: { comments: true } });
  } catch (err) {
    return err;
  }
};

exports.getAllPublishedPosts = async () => {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      include: { comments: true },
    });
  } catch (err) {
    return err;
  }
};

exports.getPostById = async (id) => {
  try {
    return await prisma.post.findUnique({
      where: { id },
    });
  } catch (err) {
    return err;
  }
};

exports.updatePostContent = async (id, title, content) => {
  try {
    return await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.deletePost = async (id) => {
  try {
    return await prisma.post.delete({
      where: { id },
    });
  } catch (err) {
    return err;
  }
};

exports.publishPost = async (id, published) => {
  try {
    return await prisma.post.update({
      where: { id },
      data: { published },
    });
  } catch (err) {
    return err;
  }
};

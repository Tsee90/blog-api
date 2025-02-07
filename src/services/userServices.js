const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (err) {
    return err;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    return err;
  }
};

exports.createUser = async (email, password) => {
  try {
    return await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (err) {
    return err;
  }
};

exports.updateUserPassword = async (id, password) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  } catch (err) {
    return err;
  }
};

exports.updateUserEmail = async (id, email) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { email },
    });
  } catch (err) {
    return err;
  }
};

exports.deleteUser = async (id) => {
  try {
    return await prisma.user.delete({ where: id });
  } catch (err) {
    return err;
  }
};

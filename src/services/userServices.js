const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
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
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (err) {
    return err;
  }
};

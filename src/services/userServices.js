const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserByEmail = async (email) => {
  console.log('Getting by email...');
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log(user);
  return user;
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

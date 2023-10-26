const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message || "There was a server error.");
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt =  bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt)

    const newUser = await prisma.user.create({
      data: { username, password:hashPassword },
    });
    res.status(200).json({
      message: "User has been added.",
      token: JWT.sign({ user: newUser }, process.env.SECRET_KEY),
    });
  } catch (error) {
    res.status(500).json(error.message || "There was a server error.");
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "User has been deleted.",
    });
  } catch (error) {
    res.status(500).json(error.message || "There was a server error.");
  }
};

module.exports = { getUsers, createUser, deleteUser };

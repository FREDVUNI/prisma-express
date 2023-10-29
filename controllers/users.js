const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.author.findUnique({
      where: {
        username: username,
      },
    });
    if (user)
      return res.status(403).json({
        error: "User already exists.",
      });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: { username, password: hashPassword },
    });
    return res.status(200).json({
      message: "User has been added.",
      token: JWT.sign({ user: newUser }, process.env.SECRET_KEY),
    });
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return res.status(404).json({
        message: "wrong email password combination",
      });
    const user_password = bcrypt.compareSync(password, user.password);
    if (!user_password)
      return res.status(404).json({
        message: "wrong email password combination",
      });

    return res.status(200).json({
      message: "User has been logged in.",
      token: JWT.sign({ user: user }, process.env.SECRET_KEY),
    });
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json({
      message: "User has been deleted.",
    });
  } catch (error) {
    return res.status(500).json(error.message || "There was a server error.");
  }
};

module.exports = { getUsers, createUser, deleteUser, signIn };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      include: { quotes: true },
    });
    return res.status(200).json({ message: "All authors", data: authors });
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message || "There was an error." });
  }
};

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;

    const author = await prisma.author.findUnique({
      where: {
        name: name,
      },
    });
    if (author)
      return res.status(403).json({
        error: "Author already exists.",
      });
    const newAuthor = await prisma.author.create({
      data: { name },
    });
    return res
      .status(200)
      .json({ message: "Author has been added.", author: newAuthor });
  } catch (error) {
    res.status(500).json({ error: error.message || "There was an error." });
  }
};

exports.getAuthor = async (req, res) => {
  try {
    const id = await req.params.id;

    const author = await prisma.author.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        quotes: true,
      },
    });

    if (author) {
      return res
        .status(200)
        .json({ message: `Author id ${id}`, author: author });
    } else {
      return res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: error.message || "There was an error." });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const id = await req.params.id;

    const author = await prisma.author.update({
      data: req.body,
      where: {
        id: Number(id),
      },
    });

    if (author) {
      return res
        .status(200)
        .json({ message: "Author has been updated.", author });
    } else {
      return res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "There was an error." });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const id = await req.params.id;

    const author = await prisma.author.delete({
      where: {
        id: Number(id),
      },
    });

    if (author) {
      return res
        .status(200)
        .json({ message: "Author has been deleted.", author });
    } else {
      return res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "There was an error." });
  }
};

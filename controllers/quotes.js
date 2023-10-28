const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      include: { author: true },
    });
    res.status(200).json({ message: "All quotes", data: quotes });
  } catch (error) {
    res.status(404).json({ error: error.message || "There was an error." });
  }
};

exports.addQuote = async (req, res) => {
  try {
    const { text, authorId } = req.body;

    const quote = await prisma.quote.findUnique({
      where: {
        text: text,
      },
    });

    if (quote)
      return res.status(403).json({
        error: "Quote already exists.",
      });

    const newQuote = await prisma.quote.create({
      data: { text, authorId },
    });

    res.status(200).json({ message: "Quote has been added.", quote: newQuote });
  } catch (error) {
    res.status(400).json({ error: error.message || "There was an error." });
  }
};

exports.getQuote = async (req, res) => {
  try {
    const id = await req.params.id;
    const quote = await prisma.quote.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });

    if (quote) {
      res.status(200).json({ message: `Quote id ${id}`, quote });
    } else {
      res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    res.status(404).json({ error: error.message || "There was an error." });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const id = await req.params.id;

    const quote = await prisma.quote.update({
      data: req.body,
      where: {
        id: Number(id),
      },
    });
    if (quote) {
      res.status(200).json({ message: "Quote has been updated.", quote });
    } else {
      res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "There was an error." });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const id = await req.params.id;
    const quote = await prisma.quote.delete({
      where: {
        id: Number(id),
      },
    });

    if (quote) {
      res.status(200).json({ message: "Quote has been deleted.", quote });
    } else {
      res.status(404).json(`The id does not exist.`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "There was an error." });
  }
};

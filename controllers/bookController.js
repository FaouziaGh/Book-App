const Book = require('../models/book');

// GET all books
exports.getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET a book by id
exports.getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

// POST a new book
exports.createOne = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

// PUT an existing book
exports.updateOne = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    res.send(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

// DELETE an existing book
exports.deleteOne = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

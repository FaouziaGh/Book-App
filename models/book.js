const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: { type: String},
    price: { type: Number},
    qte:{type: Number}
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book;
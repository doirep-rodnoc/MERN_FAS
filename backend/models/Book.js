const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    usedAmount: {
        type: Number,
        default: 0
    },
    incomeAmount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
},
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
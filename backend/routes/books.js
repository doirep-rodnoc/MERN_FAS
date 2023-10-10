const router = require("express").Router();
const Book = require("../models/Book.js");

// 帳簿登録
router.post("/register", async (req, res) => {
    try {
        const newBook = await new Book({
            title: req.body.title,
        });
        const book = await newBook.save();
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
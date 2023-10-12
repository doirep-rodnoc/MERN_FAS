const router = require("express").Router();
const Book = require("../models/Book.js");

// 帳簿登録
router.post("/register", async (req, res) => {
    const user = req.body.user;
    try {
        const newBook = await new Book({
            title: req.body.title,
            password: req.body.password,
            adminUser: user,
        });
        const book = await newBook.save();
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
const router = require("express").Router();
const Book = require("../models/Book.js");
const User = require("../models/User.js");
const VerifyToken = require("./VerifyToken.js");

// 帳簿登録
router.post("/register", VerifyToken, async (req, res) => {
    const email = req.email;
    try {
        const user = await User.findOne({ email }).select("-password");
        const newBook = await new Book({
            title: req.body.title,
            password: req.body.password,
            description: req.body.description,
            adminUser: user._id
        });
        const book = await newBook.save();
        await user.updateOne({
            $push: {
                books: book._id
            }
        })
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/:id", VerifyToken, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).select("-password");
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json("OMG");
    }
})

module.exports = router;
const router = require("express").Router();
const Book = require("../models/Book.js");
const { find } = require("../models/Transaction.js");
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

// 複数件の帳簿の取得（ページネーション対応）
router.get('/', VerifyToken, async (req, res) => {
    const page = parseInt(req.query.page || "1");  // 現在のページ（デフォルトは1ページ目）
    const limit = parseInt(req.query.limit || "10"); // 1ページあたりのアイテム数（デフォルトは10）

    const skip = (page - 1) * limit; // スキップするアイテム数を計算

    var books;
    const user = await User.find({_id: req.query.userId}).select("-password");

    try {
        books = await Book.find({ _id: {$in: user[0].books} }).limit(limit).skip(skip).sort({ date: -1 });

        const totalBooks = await Book.find({ _id: {$in: user[0].books} }).countDocuments(); // 総アイテム数を取得
        res.status(200).json({
            total: totalBooks,
            page,
            limit,
            data: books
        });
        //console.log(books)
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", VerifyToken, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).select("-password");
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json("OMG");
    }
});


// router.post("/getuserstatus/:bookid", VerifyToken, async (req, res) => {
//     try{
//         const book = await Book.findById(req.params.bookid).select("-password");
//         console.log(book);
//         console.log(req.body.userId);
//         const isAdmin = book.adminUser.includes(req.body.userId._id);
//         console.log(isAdmin);
//         return res.status(200).json({isAdmin});
//     }catch(error){
//         console.log(error);
//         return res.status(500).json(error);
//     }
// });

module.exports = router;
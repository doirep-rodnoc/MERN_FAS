const router = require("express").Router();
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const verifyToken = require("./VerifyToken");

// 収支情報の登録
router.post("/register", verifyToken, async (req, res) => {
    try {
        const book = await Book.findById(req.body.book);
        console.log(book);
        if (!book) {
            return res.status(404).json("Book not found.");
        }
        const isAdmin = book.adminUser.includes(req.body.recordedBy._id);
        console.log(isAdmin);
        const newTransaction = await new Transaction({
            title: req.body.title,
            amount: req.body.amount,
            description: req.body.description,
            recordedBy: req.body.recordedBy,
            book: req.body.book,
            isPending: !isAdmin
        });
        
        if(isAdmin){
            book.totalAmount += newTransaction.amount;
            if (newTransaction.amount < 0) {
                book.usedAmount -= newTransaction.amount;
            } else {
                book.incomeAmount += newTransaction.amount
            }
        }
        await book.save();
        const transaction = await newTransaction.save();
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json("An error occured:" + error);
    }
});

// 複数件の収支情報の取得（ページネーション対応）
router.get('/', verifyToken, async (req, res) => {
    const page = parseInt(req.query.page || "1");  // 現在のページ（デフォルトは1ページ目）
    const limit = parseInt(req.query.limit || "10"); // 1ページあたりのアイテム数（デフォルトは10）

    const skip = (page - 1) * limit; // スキップするアイテム数を計算

    var transactions;
    var totalTransactions;

    try {
        if (req.query.fetchPending === "true") {
            transactions = await Transaction.find({ book: req.query.bookId, isPending: true }).limit(limit).skip(skip).sort({ date: -1 });
            totalTransactions = await Transaction.find({ book: req.query.bookId, isPending: true }).countDocuments(); // 総アイテム数を取得
        } else {
            transactions = await Transaction.find({ book: req.query.bookId, isPending: false }).limit(limit).skip(skip).sort({ date: -1 });
            totalTransactions = await Transaction.find({ book: req.query.bookId, isPending: false }).countDocuments(); // 総アイテム数を取得
        }

        res.status(200).json({
            total: totalTransactions,
            page,
            limit,
            data: transactions
        });
        //console.log(transactions)
    } catch (error) {
        res.status(500).send(error);
    }
});

// 特定の収支情報の取得
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send();
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE: 収支情報の更新(申請承認の処理にのみ使用．透明性確保のため承認後の収支には使わない．)
router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!transaction) {
            return res.status(404).send();
        }
        const book = await Book.findById(transaction.book);
        book.totalAmount += transaction.amount;
        if (transaction.amount < 0) {
            book.usedAmount -= transaction.amount;
        } else {
            book.incomeAmount += transaction.amount;
        }
        book.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE: 収支情報の削除(申請却下の処理にのみ使用．透明性確保のため承認後の収支には使わない．)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).send();
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
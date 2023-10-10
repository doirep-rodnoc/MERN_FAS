const router = require("express").Router();
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");

// 収支の登録
router.post("/register", async (req, res) => {
    try {
        const newTransaction = await new Transaction({
            title: req.body.title,
            amount: req.body.amount,
            description: req.body.description,
            recordedBy: req.body.recordedBy,
            book: req.body.book
        });
        const book = await Book.findById(newTransaction.book);
        if (!book) {
            return res.status(404).json("Book not found.");
        }
        book.totalAmount += newTransaction.amount;
        if (newTransaction.amount < 0) {
            book.usedAmount -= newTransaction.amount;
        } else {
            book.incomeAmount += newTransaction.amount
        }
        await book.save();
        const transaction = await newTransaction.save();
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// 複数件の収支の取得（ページネーション対応）
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page || "1");  // 現在のページ（デフォルトは1ページ目）
    const limit = parseInt(req.query.limit || "10"); // 1ページあたりのアイテム数（デフォルトは10）

    const skip = (page - 1) * limit; // スキップするアイテム数を計算

    try {
        const transactions = await Transaction.find({ book: req.query.bookId }).limit(limit).skip(skip).sort({date: -1});
        const totalTransactions = await Transaction.countDocuments(); // 総アイテム数を取得

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

// 特定の収支の取得
router.get('/:id', async (req, res) => {
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

// UPDATE: 収支の更新
router.patch('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!transaction) {
            return res.status(404).send();
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE: 収支の削除
router.delete('/transactions/:id', async (req, res) => {
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
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    recordedBy: {
        type: String,
        required: true,
    },
    book:{
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
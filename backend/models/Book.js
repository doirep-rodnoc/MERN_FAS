const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bookSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
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
    adminUser: {
        type: [String],
        default: []
    },
    nomalUser: {
        type: [String],
        default: []
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
},
    { timestamps: true }
);

// DBに保存するパスワードをハッシュ化
bookSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// ハッシュ化されたPWと入力されたPWの検証関数
bookSchema.methods.checkPwd = function(password){
    return bcrypt.compare(password, this.password);
}

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
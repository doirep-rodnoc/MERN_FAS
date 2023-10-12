const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// スキーマの定義
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']  // 簡易的なメールの正規表現
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    imagePath:{
        type: String,
        default: ""
    }
},

    { timestamps: true }

);

// DBに保存するパスワードをハッシュ化
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// ハッシュ化されたPWと入力されたPWの検証関数
userSchema.methods.checkPwd = function(password) {
    return bcrypt.compare(password, this.password);
};

// モデルの生成
const User = mongoose.model('User', userSchema);
module.exports = User;

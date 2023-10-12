const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// ユーザの登録
router.post("/register", async (req, res) => {
    try {
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// ログイン
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found.");

        const isPwdMatch = await user.checkPwd(password);
        if (!isPwdMatch) return res.status(400).send("Invalid Password.");

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN, });

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports = router;
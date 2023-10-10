const router = require("express").Router();
const User = require("../models/User");

// 処理の権限チェックのミドルウェア
function checkUser(req, res, next) {
    const userIdBeingAccessed = req.params.id;  // 処理対象のユーザーID
    const authenticatedUserId = req.body.id;   // 認証済みのユーザーID
    const authenticatedUserPermissionLevel = req.body.permissionLevel; // ユーザーの権限

    if (authenticatedUserId === userIdBeingAccessed || authenticatedUserPermissionLevel === 'Admin') {
        return next();  // 認可されれば次のミドルウェア/ルートハンドラに進む
    }

    res.status(403).send({ error: 'You do not have permission to perform this action.' });
}

// (C)RUD
// ユーザの取得
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).send("User not found.");
        res.status(200).json(user);
        //console.log(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// ユーザー情報の更新
router.patch('/:id', checkUser, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// ユーザーの削除
router.delete('/:id', checkUser, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json('トークンがありません');
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, dec) => {
            if (err) {
                return res.status(403).json('無効なトークンです');
            } else {
                req.email = dec.email;
                next();
            }
        });
    } catch (err) {
        return res.status(401).json(err.message);
    }
};

module.exports = verifyToken;
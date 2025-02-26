const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const transactionsRoute = require("./routes/transactions");
const bookRoute = require("./routes/books");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");

require("dotenv").config();

PORT = 3000;

//DB接続
mongoose.connect(
    process.env.MONGODB_URL
).then(() => {
    console.log("MongoDB Connected.");
}).catch((e) => {
    console.log(e);
});

// MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/books", bookRoute);

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})
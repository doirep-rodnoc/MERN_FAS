const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const transactionsRoute = require("./routes/transactions");
const bookRoute = require("./routes/books");
const mongoose = require("mongoose");
require("dotenv").config();

PORT = 3000;

//DB接続
mongoose.connect(
    process.env.MONGODB_URL
).then(()=>{
    console.log("MongoDB Connected.");
}).catch((e)=>{
    console.log(e);
});

// MiddleWare
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/books", bookRoute);

app.listen(PORT, () => console.log("SERVER READY."));
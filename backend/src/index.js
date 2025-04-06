require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



const authRoute = require('./routes/auth.route.js');
const messageRoute = require("./routes/message.route.js");

const connectDB = require('./db/db.js');


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    connectDB();
})
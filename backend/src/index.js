import dotenv from "dotenv"
dotenv.config();

import express from 'express'

const app = express();
import cors from 'cors'
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

import authRoute from './routes/auth.route.js'
import connectDB from './db/db.js'
import messageRoute from "./routes/message.route.js"


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    connectDB();
})
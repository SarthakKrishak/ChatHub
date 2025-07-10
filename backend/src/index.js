import dotenv from "dotenv"
dotenv.config();

import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { app, server } from "./utils/socket.js";
import authRoute from './routes/auth.route.js'
import connectDB from './db/db.js'
import messageRoute from "./routes/message.route.js"
import path from 'path'


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    connectDB();
})
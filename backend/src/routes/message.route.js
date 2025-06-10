import express from "express"
import { isLoggedIn } from "../middleware/isLoggedIn.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", isLoggedIn, getUsersForSidebar);
router.get("/:id", isLoggedIn, getMessages);
router.post("/send/:id", isLoggedIn, sendMessage);

export default router;

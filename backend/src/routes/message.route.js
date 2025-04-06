const express = require('express');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { getUsersForSidebar, getMessages, sendMessage } = require('../controllers/message.controller');

const router = express.Router();

router.get("/users", isLoggedIn, getUsersForSidebar);
router.get("/:id", isLoggedIn, getMessages);
router.post("/send/:id", isLoggedIn, sendMessage);


module.exports = router;
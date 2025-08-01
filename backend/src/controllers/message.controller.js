import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getRecieverSocketId,io } from "../utils/socket.js";



export const getUsersForSidebar =async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in message controller",error.message);
        res.status(500).json({ message: "Error fetching users" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;

        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();


        const reciverSocketId = getRecieverSocketId(recieverId);

        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ error:'Internal server Error'})
    }
}
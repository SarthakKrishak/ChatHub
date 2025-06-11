import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: Array.isArray(res.data) ? res.data : [] }); // ✅ Ensure messages is an array
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages"); // ✅ Correct error handling
        } finally {
            set({ isMessageLoading: false });
        }
    },

    //Todo : Optimise this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

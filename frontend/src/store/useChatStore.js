import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [], // ✅ Ensure users is initialized as an empty array
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUser: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: Array.isArray(res.data) ? res.data : [] }); // ✅ Ensure response is an array
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load users"); // ✅ Correct error handling
        } finally {
            set({ isUserLoading: false });
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

    //Todo : Optimise this later

    setSelectUser: (selectedUser) => set({ selectedUser }),
}));

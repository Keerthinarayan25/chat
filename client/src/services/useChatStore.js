import { create } from "zustand";
import api from "./api.js";
import { useAuthStore } from "./useAuthStore.js";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) =>({
  messages: [],
  users:[],
  selectedUser: null,
  isUserLoading:null,
  isMessagesLoading: false,


  getUsers: async () => {
    set({isUserLoading:true})
    try{
      const res = await api.get("/message/users");
      set({users:res.data});
    } catch(error){
      toast.error("Failed to fetch users", error);
    } finally{
      set({isUserLoading:false})
    }
    
  },

  getMessages: async (userId) => {
    set({isMessagesLoading:true});
    try{
      const res = await api.get(`/message/${userId}`);
      console.log({res});
      set({messages: res.data});
    }catch(error){
      toast.error("Failed to fetch users", error);
    } finally{
      set({isMessagesLoading: false});
    }
    
  },
  
  sendMessages: async (messageData) => {
    const {selectedUser, messages} = get();

    try{
      if (!messageData || !messageData.content) {
        toast.error("Message content is missing");
        return;
      }
      const res = await api.post(`message/send/${selectedUser._id}`, messageData);
      set({messages:[...messages, res.data]});
    } catch(error){
      toast.error("error in ", error.response?.data?.error || error.message);
    }
  },

  subscribeToMessages: () => {
    const {selectedUser}=get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelected  = newMessage.senderId === selectedUser._id;
      if(isMessageSentFromSelected) return;
      
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

}));


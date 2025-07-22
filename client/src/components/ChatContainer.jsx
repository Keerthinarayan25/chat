import { useEffect, useRef } from "react";
import { useChatStore } from "../services/useChatStore";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../services/useAuthStore.js";
import { formatMessageTime } from "../services/formatMessageTime.js";

const ChatContainer = () => {
  const { messages ,getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() =>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"}); 
    }
  },[messages]);

  if (isMessagesLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col overflow-auto w-full bg-gray-900 text-white" >
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6" >
        {messages.map((message) => (
          <div key={message._id} className="flex gap-4">
            {/* Avatar Circle with Initial */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                {message.senderId === authUser._id
                  ? authUser.name.charAt(0).toUpperCase()
                  : selectedUser.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Message bubble area */}
            <div className="flex flex-col">
              <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white max-w-prose whitespace-pre-wrap">
                {message.content}
              </div>
              <span className="text-xs text-gray-400 mt-1">
                {formatMessageTime(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}>

        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

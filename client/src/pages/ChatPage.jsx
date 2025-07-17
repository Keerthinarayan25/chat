import { useState } from "react";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("🔍 user from localStorage:", user);

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar with all users */}
      <div className="w-1/3 border-r bg-white">
        <UserList
          user={user}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>

      {/* Chat Box */}
      <div className="w-2/3">
        {selectedChat ? (
          <ChatBox selectedChat={selectedChat} user={user} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

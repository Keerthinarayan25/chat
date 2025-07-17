import { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ user, selectedChat, setSelectedChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const {data} = await axios.get(`http://localhost:3000/api/user/all?currentUserId=${user._id}`);
        // console.log("All users:", data);
        setUsers(data);
      } catch (error) {
        console.log("Failed to fetch users:", error);
        
      }
    };
    
        // setUsers([
        //   { _id: "1", name: "Test User 1" },
        //   { _id: "2", name: "Test User 2" },
        // ]);
      
    
    // console.log("📌 useEffect check — user:", user);
    if (user?._id) {
      fetchAllUsers();
    }
    
  }, [user]);

  const startOrAccessChat = async (targetUserId) => {
    try {
      const { data } = await axios.post("/api/chat", {
        userId: targetUserId,
        currentUserId: user._id,
      });
      console.log("✅ Chat with user:", data);
      setSelectedChat(data);
    } catch (error) {
      console.error("❌ Failed to start/access chat:", error);
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No other users found.</p>
      ) : (
        users.map((u) => (
          <div
            key={u._id}
            onClick={() => startOrAccessChat(u._id)}
            className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-blue-100 ${
              selectedChat?.users?.some((chatUser) => chatUser._id === u._id)
                ? "bg-blue-200"
                : "bg-white"
            }`}
          >
            <p className="font-medium">{u.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;

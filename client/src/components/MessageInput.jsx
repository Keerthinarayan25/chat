import React, { useState } from "react";
import { useChatStore } from "../services/useChatStore";
import { SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessages } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (text.trim === "") return;

    try {
      await sendMessages({
        content: text.trim(),
      });
      setText("");
    } catch (error) {
      toast.error("Falied to send message:", error);
    }
  };

  return (
    <div className="px-4 py-3 border-gray-700 bg-gray-800">
      <form
        onSubmit={handleSendMessage}
        className="w-full flex -items-center gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message.."
          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none"
        />

        <button
          type="submit"
          className="w-12 h-10  bg-gray-500 hover:bg-gray-700 rounded-full flex items-center justify-center text-white "
        >
          <SendHorizontal />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

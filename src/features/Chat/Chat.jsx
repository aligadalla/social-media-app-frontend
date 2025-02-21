import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function Chat({ selectedUser, messages, isLoading }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to chat
      </div>
    );

  async function handleSubmit(e) {
    e.preventDefault();
    if (message.trim() === "") return;

    await fetch(`http://localhost:3000/chat/sendMessage/${selectedUser}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      credentials: "include",
    });

    setMessage("");
  }

  return (
    <div className="w-2/3 flex flex-col h-screen bg-white shadow-md rounded-lg">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-4 font-semibold text-lg flex items-center">
        Chatting with {selectedUser}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3 flex flex-col">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[75%] break-words ${
                msg.senderId === selectedUser
                  ? "bg-gray-300 text-black mr-auto" // Received messages (left)
                  : "bg-blue-500 text-white ml-auto" // Sent messages (right)
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Field */}
      <form
        onSubmit={handleSubmit}
        className="flex p-4 border-t bg-white sticky bottom-0"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
import { useEffect, useState } from "react";
import { useGetUser } from "../Auth/Authentication";
import openSocket from "socket.io-client";
import { useNavigate } from "react-router-dom";

import Users from "./Users";
import Chat from "./Chat";

function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data } = useGetUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data?.message === "Not Logged In") {
      navigate("/login", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedUser) return;
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:3000/chat/getChat/${selectedUser}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setMessages(data.messages);
      setIsLoading(false);
    }

    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (!data?.userId) return;

    const socket = openSocket("http://localhost:3000", {
      query: { userId: data?.userId },
    });

    socket.emit("join", { userId: data.userId });

    socket.on("newMessage", ({ sentMsgObj }) => {
      setMessages((prevMessages) => [...prevMessages, sentMsgObj]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [data]);

  if (data?.message === "Not Logged In") return null;

  return (
    <div className="flex h-screen bg-gray-200">
      <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <Chat isLoading={isLoading} messages={messages} selectedUser={selectedUser} />
    </div>
  );
}

export default ChatLayout;
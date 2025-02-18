import { useEffect, useState } from "react";
import { useGetUser } from "../Auth/Authentication";
import openSocket from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

import Users from "./Users";
import Chat from "./Chat";
import { useGetMessages } from "./apiChat";

function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data } = useGetUser();
  //   const { data: { messages } = {}, isLoading } = useGetMessages(selectedUser);
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchMessages() {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:3000/chat/getChat/${selectedUser}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
        setMessages(data.messages);
        setIsLoading(false);
      }
      if (selectedUser) fetchMessages();

      const socket = openSocket("http://localhost:3000", {
        query: {
          userId: data?.userId,
        },
      });

      socket.on("newMessage", ({ sentMsgObj }) => {
        setMessages((curMessages) => [...curMessages, sentMsgObj]);
      });
    },
    [data, selectedUser]
  );
  return (
    <div>
      <Users setSelectedUser={setSelectedUser} />
      <Chat
        isLoading={isLoading}
        messages={messages}
        selectedUser={selectedUser}
      />
    </div>
  );
}
export default ChatLayout;

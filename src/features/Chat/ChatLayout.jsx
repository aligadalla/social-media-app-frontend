import { useEffect, useState } from "react";
import { useGetUser } from "../Auth/Authentication";
import openSocket from "socket.io-client";

import Users from "./Users";
import Chat from "./Chat";

function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data } = useGetUser();

  useEffect(
    function () {
      if (!data) return;
      const socket = openSocket("http://localhost:3000", {
        query: {
          userId: data?.userId,
        },
      });

      socket.on("newMessage", ({ message }) => {
        console.log("newMessage arrived " , message);        
      });
    },
    [data]
  );
  return (
    <div>
      <Users setSelectedUser={setSelectedUser} />
      <Chat selectedUser={selectedUser} />
    </div>
  );
}

export default ChatLayout;

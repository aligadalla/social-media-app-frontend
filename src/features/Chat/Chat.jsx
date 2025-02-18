import { useState } from "react";
import { useGetMessages } from "./apiChat";

function Chat({ selectedUser }) {
  const { data: { messages } = {}, isLoading } = useGetMessages(selectedUser);

  const [message, setMessage] = useState("");

  if (!selectedUser) return <div>no user selected</div>;

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:3000/chat/sendMessage/${selectedUser}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
        credentials: "include",
      }
    );

    const data = await res.json();

    console.log(data);
  }

  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          {messages?.map((messages, idx) => (
            <p key={idx}>{messages.content}</p>
          ))}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
          </form>
        </>
      )}
    </div>
  );
}

export default Chat;

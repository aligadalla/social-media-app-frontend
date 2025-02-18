import { useState } from "react";

function Chat({ selectedUser, messages, isLoading }) {
  const [message, setMessage] = useState("");
  if (!selectedUser) return <div>no user selected</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    if(message === "")
        return;
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
    setMessage("");
    console.log(data);
  }

  return (
    <div className="bg-slate-500">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          {messages?.map((messages, idx) => (
            <p key={idx}>{messages.content}</p>
          ))}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </>
      )}
    </div>
  );
}

export default Chat;

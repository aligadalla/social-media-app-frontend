import { useState } from "react";
import { useGetUsers } from "./apiChat";
import User from "./User";

function Users({ setSelectedUser, selectedUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetUsers(searchQuery);

  if (isLoading) return <p>Loading...</p>;

  const chats = data?.chats || [];

  return (
    <div className="w-1/3 bg-gray-100 border-r border-gray-300 flex flex-col shadow-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 m-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
        placeholder="Search users..."
      />
      <ul className="overflow-y-auto flex-1">
        {chats?.map((user) => (
          <User key={user.id} user={user} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
        ))}
      </ul>
    </div>
  );
}

export default Users;
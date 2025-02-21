function User({ user, setSelectedUser, selectedUser }) {
  const { username, id, imgUrl, lastmessage } = user;
  const isSelected = selectedUser === id;

  return (
    <li
      onClick={() => setSelectedUser(id)}
      className={`flex items-center p-3 cursor-pointer rounded-lg transition-all ${
        isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200"
      }`}
    >
      <img
        src={`http://localhost:3000/${imgUrl || "uploads/image.png"}`}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover border mr-3"
      />
      <div className="flex-1">
        <p className="font-medium">{username}</p>
        <p className="text-sm text-gray-600 truncate">{lastmessage}</p>
      </div>
    </li>
  );
}

export default User;
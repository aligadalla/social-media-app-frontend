function User({ user, setSelectedUser }) {
  // console.log(user);
  const { username, id, imgUrl, lastmessage } = user;
  console.log("user ", user);
  return (
    <li onClick={() => setSelectedUser(id)}>
    
      <img src={`http://localhost:3000/${imgUrl}`} alt="profile picture" />
      {username}
      {lastmessage}
    </li>
  );
}

export default User;

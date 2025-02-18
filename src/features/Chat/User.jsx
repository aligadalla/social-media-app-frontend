function User({user,setSelectedUser}) {
    // console.log(user);

    return (
        <li onClick={()=>setSelectedUser(user.id)}>
            User
        </li>
    )
}

export default User;
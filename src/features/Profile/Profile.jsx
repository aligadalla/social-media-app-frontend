import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useGetUser } from "../Auth/Authentication";
import { useGetProfilePosts,getProfilePicture } from "./apiProfile";
import Post from "../Feed/Post";


function Profile() {
  const [ image, setImage ] = useState(null);
  const [imgUrl , setImgUrl] = useState('');
  const { data: user } = useGetUser();
  const params = useParams();
  const { data } = useGetProfilePosts(params.userName);
  const curProfileUser=params.userName;
  // const {data:img} = getProfilePicture(params.userName);

  const posts = data?.posts;
  // console.log("data from profile", posts);
  console.log("user Profile", params.userName);
  console.log("user posts", posts);
  const me = user.username === params.userName;

  useEffect( function getProfilePicture(){
    async function fetchProfilePicture(){
      const res = await fetch(`http://localhost:3000/profile/profilePicture/${params.userName}`, {
        method: "GET",
        credentials: "include",
      });
    
      if (!res.ok) {
        throw new Error("Failed to fetch image");
      }
    
      const data = await res.json();
      console.log("posts refetched with data",data)
      return data;
    }
    fetchProfilePicture().then((data)=>{
      console.log("data",data);
      setImgUrl(data.imgUrl);
    })
  },[setImgUrl,params.userName])

  async function handleUpload() {
    if (!image) {
      console.log("no image");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);

    const response = await fetch("http://localhost:3000/profile/uploadPicture", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("upload data", data);
  }

  async function handleFollow(username){
    console.log("username",username)
    const res = await fetch('http://localhost:3000/feed/follow', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        followingName: username
      }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to follow");
    }

    const data = await res.json();
    console.log("follow data", data);
  }

  return (
    <div>
      <h1>Profile</h1>
      <img className="rounded-full h-" src={`http://localhost:3000/${imgUrl}`} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{params.userName}</p>
      {me ? <p>edit</p> : <button onClick={()=>handleFollow(params.userName)}>follow</button>}
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Profile;

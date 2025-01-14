import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../Auth/Authentication";
import { useGetProfileData } from "./apiProfile";
import Post from "../Feed/Post";


function Profile() {
  const [ image, setImage ] = useState(null);

  
  const { data: user } = useGetUser();
  const { userId : profileUserId } = useParams();
  const queryClient = useQueryClient();
  const { data } = useGetProfileData(profileUserId);
  
  const username = data?.username;
  const posts = data?.posts;
  const imgUrl = data?.profilePicture;
  const isFollowed = data?.isFollowed;
  // console.log("user data", data);
  const me = user.username === username;


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

  async function handleFollow(id){
    console.log("username",username)
    const res = await fetch(`http://localhost:3000/feed/${isFollowed ? "unfollow":"follow"}`, {
      method: `${isFollowed ? "DELETE" : "POST"}`,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        followingId: id
      }),
      credentials: "include",
    });
    console.log('res',res )
    if (!res.ok) {
      throw new Error("Failed to follow/unfollow");
    }

    const data = await res.json();
    queryClient.invalidateQueries(["profile",profileUserId])
    console.log("follow data", data);
  }

  return (
    <div>
      <h1>Profile</h1>
      <img className="rounded-full h-" src={`http://localhost:3000/${imgUrl}`} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{username}</p>
      {me ? <p>edit</p> : <button onClick={()=>handleFollow(profileUserId)}>{isFollowed ? "unfollow":"follow"}</button>}
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Profile;

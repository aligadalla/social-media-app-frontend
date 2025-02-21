import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../Auth/Authentication";
import { useGetProfileData } from "./apiProfile";
import Post from "../Feed/Post";

export default function Profile() {
  const [image, setImage] = useState(null);
  const { data: user } = useGetUser();
  const { userId: profileUserId } = useParams();
  const queryClient = useQueryClient();
  const { data } = useGetProfileData(profileUserId);

  const username = data?.username;
  const posts = data?.posts;
  const imgUrl = data?.profilePicture;
  const isFollowed = data?.isFollowed;
  const me = user?.username === username;

  async function handleUpload() {
    if (!image) return console.log("No image selected");

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
    console.log("Upload success", data);
    queryClient.invalidateQueries(["profile", profileUserId]);
  }

  async function handleFollow(id) {
    const res = await fetch(`http://localhost:3000/feed/${isFollowed ? "unfollow" : "follow"}`, {
      method: isFollowed ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ followingId: id }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to follow/unfollow");

    const data = await res.json();
    queryClient.invalidateQueries(["profile", profileUserId]);
    console.log("Follow data", data);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Profile Picture - Increased size to w-40 h-40 */}
      <div className="relative w-40 h-40">
        <img
          className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
          src={`http://localhost:3000/${imgUrl}`}
          alt="Profile"
        />
      </div>

      {/* Username & Action Buttons */}
      <h1 className="mt-4 text-2xl font-bold">{username}</h1>

      {me ? (
        <label className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
          Change Picture
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <button
          onClick={() => handleFollow(profileUserId)}
          className={`mt-3 px-4 py-2 rounded-md transition ${
            isFollowed
              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      )}

      {/* Upload Button */}
      {me && image && (
        <button
          onClick={handleUpload}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Upload
        </button>
      )}

      {/* User Posts */}
      <div className="mt-6 w-full max-w-lg">
        {posts?.length ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center">No posts yet</p>
        )}
      </div>
    </div>
  );
}
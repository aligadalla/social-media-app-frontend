import { useState } from "react";
import { useGetPosts } from "./apiFeed";
import Post from "./Post";
import PostForm from "./PostForm";

export default function FeedData() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data } = useGetPosts();
  const posts = data?.posts;

  return (
    <div className="space-y-4 p-4">
      {/* Header with Add Post Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Post
        </button>
      </div>

      {/* Render Modal When isFormOpen is true */}
      {isFormOpen && <PostForm onClose={() => setIsFormOpen(false)} />}

      {/* Posts List */}
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

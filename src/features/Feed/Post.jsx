import { useState } from "react";
import { Link } from "react-router-dom";
import { useLikePost, useDeleteLike } from "./apiFeed";
import { useGetUser } from "../Auth/Authentication";
import Comments from "./Comments";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa"; // Importing Icons

function Post({ post }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { data: user } = useGetUser();
  const { createLike: Like } = useLikePost();
  const { deleteLike } = useDeleteLike();

  async function handleLike(postId, isLiked) {
    if (isLiked) {
      await deleteLike(postId);
    } else {
      await Like(postId);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Post Header */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={`http://localhost:3000/${post?.imgUrl ? post.imgUrl : "uploads/image.png"}`}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link 
          to={`/profile/${post.authorId}`} 
          className="text-lg font-semibold hover:underline"
        >
          {post.username}
        </Link>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-2">{post.description}</p>

      {/* Post Actions */}
      <div className="flex items-center space-x-6 mt-3">
        {/* Like Button */}
        <button 
          onClick={() => handleLike(post.id, post.isLiked)}
          className="flex items-center space-x-1 text-sm font-medium transition"
        >
          {post.isLiked ? (
            <FaHeart className="text-red-500 text-lg transition-transform transform scale-110" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition" />
          )}
          <span className={post.isLiked ? "text-red-500" : "text-gray-500"}>{post.likeCount}</span>
        </button>

        {/* Comment Button */}
        <button 
          onClick={() => setIsCommentsOpen((open) => !open)}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition"
        >
          <FaRegComment className="text-lg" />
          <span>{post.commentCount}</span>
        </button>
      </div>

      {/* Comments Section */}
      {isCommentsOpen && <Comments postId={post.id} authorId={post.authorId} />}
    </div>
  );
}

export default Post;
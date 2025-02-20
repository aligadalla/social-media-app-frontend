import { useState } from "react";
import { Link } from "react-router-dom";
import { useLikePost, useDeleteLike } from "./apiFeed";
import { useGetUser } from "../Auth/Authentication";
import Comments from "./Comments";

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
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => handleLike(post.id, post.isLiked)}
          className={`text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition`}
        >
          {post.isLiked ? "Unlike" : "Like"} ({post.likeCount})
        </button>

        <button 
          onClick={() => setIsCommentsOpen((open) => !open)}
          className="text-sm text-blue-500 hover:underline"
        >
          Comments ({post.commentCount})
        </button>
      </div>

      {/* Comments Section */}
      {isCommentsOpen && <Comments postId={post.id} authorId={post.authorId} />}
    </div>
  );
}

export default Post;
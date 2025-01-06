import { useState } from "react";
import {Link} from 'react-router-dom';
import { useLikePost, useDeleteLike } from "./apiFeed";
import { useGetUser } from "../Auth/Authentication";
import Comments from "./Comments";
function Post({ post }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { data: user } = useGetUser();
  const { createLike: Like /*error : LikeError*/ } = useLikePost();
  const { deleteLike } = useDeleteLike();

  async function handleLike(postId, isLiked) {
    if (isLiked) {
      try {
        await deleteLike(postId);
      } catch (err) {
        console.log("err", err);
      }
    } else {
      try {
        await Like(postId);
      } catch (err) {
        console.log("err", err);
      }
    }
  }

  return (
    <div>
      <p><Link to={`/profile/${post.username}`}>{post.username}</Link></p>
      <p>{post.likeCount}</p>
      <p>{post.commentCount}</p>
      <p>{post.description}</p>
      <button onClick={() => handleLike(post.id, post.isLiked)}>
        {post.isLiked ? "unlike" : "Like"}
      </button>
      <button onClick={() => setIsCommentsOpen((open) => !open)}>
        comments
      </button>
      {isCommentsOpen && <Comments postId={post.id} authorId={post.authorId} />}
    </div>
  );
}

export default Post;

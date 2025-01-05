import { useLikePost, useDeleteLike } from "./apiFeed";

function Post({ post }) {
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
      <p>{post.username}</p>
      <p>{post.likeCount}</p>
      <p>{post.commentCount}</p>
      <p>{post.description}</p>
      <button onClick={() => handleLike(post.id, post.isLiked)}>
        {post.isLiked ? "unlike" : "Like"}
      </button>
      {/* <button onClick={() => handleComment}>comments</button> */}
    </div>
  );
}

export default Post;

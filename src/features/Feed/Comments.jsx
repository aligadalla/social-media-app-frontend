import { useGetComments, usePostComment, useDeleteComment } from "./apiComments";
import { useGetUser } from "../Auth/Authentication";
import React from "react";

function Comments({ postId, authorId }) {
  const { data, /*error*/ isLoading } = useGetComments(postId);
  const {
    mutateAsync: postComment,
    // error,
    // isLoading: commenting,
  } = usePostComment(postId);
  const {mutateAsync: deleteComment, /*isLoading: isDeleting, error*/} = useDeleteComment(postId);
  const {data: user} = useGetUser();

  console.log("comments component", data?.comments);
  if (isLoading) return <div>Loading....</div>;

  const comments = data?.comments;

  async function handleComment(e) {
    e.preventDefault();
    const content = e.target[0].value;
    console.log("front content", content);
    e.target[0].value = "";
    await postComment({ postID: postId, content });
  }

  async function handleDelete(postID, commentId) {
    try {
        await deleteComment({postId:postID, commentId});
    }
    catch(err) {
        console.log(err);
    }
  }

  return (
    <>
      <div>
        {comments.map((comment) => {
            return <React.Fragment key={comment.id}>
                <p key={comment.id}>{comment.content} </p>
                {comment.userId === user.userId || authorId === user.userId ? (<button onClick={() => {handleDelete(postId, comment.id)}}>delete</button>) : null}
            </React.Fragment>
        })}{" "}
      </div>
      <form onSubmit={(e) => handleComment(e)}>
        <input type="text" placeholder="comment" />{" "}
        <button type="submit">comment</button>
      </form>
    </>
  );
}

export default Comments;

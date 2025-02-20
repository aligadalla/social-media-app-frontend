import { useGetComments, usePostComment, useDeleteComment } from "./apiComments";
import { useGetUser } from "../Auth/Authentication";
import React from "react";

function Comments({ postId, authorId }) {
  const { data, isLoading } = useGetComments(postId);
  const { mutateAsync: postComment } = usePostComment(postId);
  const { mutateAsync: deleteComment } = useDeleteComment(postId);
  const { data: user } = useGetUser();

  if (isLoading) return <div>Loading....</div>;

  const comments = data?.comments;
  console.log(comments);

  async function handleComment(e) {
    e.preventDefault();
    const content = e.target[0].value;
    e.target[0].value = "";
    await postComment({ postID: postId, content });
  }

  async function handleDelete(postID, commentId) {
    await deleteComment({ postId: postID, commentId });
  }

  return (
    <div className="mt-4 border-t pt-4">
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            {/* User Image */}
            <img 
              src={comment.imgUrl || "https://via.placeholder.com/40"} 
              alt="User avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{comment.username}</p>
                {(comment.userId === user.userId || authorId === user.userId) && (
                  <button 
                    onClick={() => handleDelete(postId, comment.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleComment} className="mt-4 flex space-x-2">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 border rounded-lg p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Comment
        </button>
      </form>
    </div>
  );
}

export default Comments;
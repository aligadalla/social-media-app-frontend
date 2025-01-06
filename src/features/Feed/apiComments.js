import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getComments(postId) {
  const res = await fetch(`http://localhost:3000/feed/comment/${postId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return data;
}

export function useGetComments(postId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  return { data, error, isLoading };
}

async function postComment(postId, content) {
  console.log("content inside function hook", content);
  const res = await fetch(`http://localhost:3000/feed/comment/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    console.log(err);
    throw err;
  }

  const message = await res.json();
  return message.message;
}

export function usePostComment(postID) {
  const queryClient = useQueryClient();
  const { mutateAsync, error, isLoading } = useMutation({
    mutationFn: async ({ postID, content }) => {
      console.log("content inside useMutation", content);
      console.log("postId inside useMutation", postID);
      return await postComment(postID, content);
    },
    onSuccess: (message) => {
      console.log(message);
      console.log("comment posted !");
      queryClient.invalidateQueries(["comment", postID]);
    },
    onError: (err) => console.log("errrrr", err),
  });

  return { mutateAsync, error, isLoading };
}

async function deleteComment(postId, commentId) {
    const res = await fetch(`http://localhost:3000/feed/comment/${postId}/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("failed to delete comment");
    }

    const msg = await res.json();
    return msg;
}

export function useDeleteComment(postId) {
    const queryClient = useQueryClient();
    const { mutateAsync, error, isLoading } = useMutation({
      mutationFn: async ( {postId, commentId}) => {
        return await deleteComment(postId, commentId);
      },
      onSuccess: (message) => {
        console.log(message);
        console.log("comment posted !");
        queryClient.invalidateQueries(["comment", postId]);
      },
      onError: (err) => console.log("errrrr", err),
    });
  
    return { mutateAsync, error, isLoading };
  }
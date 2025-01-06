import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function LikePost(postID) {
  const res = await fetch(`http://localhost:3000/feed/like/${postID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }

  const data = await res.json();

  console.log(data);
  return data;
}

export async function fetchFeed() {
  const res = await fetch("http://localhost:3000/feed/posts", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }

  const data = await res.json();
  return data;
}

export function useGetPosts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
  });

  return { data, isLoading, isError, error };
}

export function useLikePost() {
  const queryClient = useQueryClient();
  const { mutateAsync: createLike, error } = useMutation({
    mutationFn: async (postID) => {
      return await LikePost(postID);
    },
    onSuccess: (message) => {
      console.log(message);
      console.log("post liked !");
      queryClient.invalidateQueries("feed");
    },
    onError: (err) => console.log("errrrr", err),
  });

  return { createLike, error };
}

async function unlikePost(postId) {
  const res = await fetch(`http://localhost:3000/feed/unlike/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }
  const data = await res.json();

  console.log(data);
  return data;
}

export function useDeleteLike() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteLike, error } = useMutation({
    mutationFn: async (postId) => {
      return await unlikePost(postId);
    },
    onSuccess: (message) => {
      console.log("unliked", message);
      queryClient.invalidateQueries("feed");
    },
    onError: (err) => {
      console.log("unlike error", err);
    },
  });

  return { deleteLike, error };
}

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
    queryKey: ["comments"], // Include postId in the queryKey for cache separation
    queryFn: () => getComments(postId), // Pass postId to the query function
    // enabled: !!postId, // Only run the query if postId is truthy
  });

  return { data, error, isLoading }; // Return the query results
}

async function deletePost(postId){
  const res = await fetch(`http://localhost:3000/feed/post/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return data;
}

export function useDeletePost(){
  const queryClient = useQueryClient();
  const { mutateAsync, error } = useMutation({
    mutationFn: async (postId) => {
      return await deletePost(postId);
    },
    onSuccess: (message) => {
      console.log("post deleted", message);
      queryClient.invalidateQueries("feed");
    },
    onError: (err) => {
      console.log("unlike error", err);
    },
  });

  return { mutateAsync, error };
}
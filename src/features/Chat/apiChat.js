import { useQuery } from "@tanstack/react-query";

async function getmessages(userId) {
  const res = await fetch(`http://localhost:3000/chat/getChat/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return data;
}

export function useGetMessages(userId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getmessages(userId),
  });

  return { data, error, isLoading };
}

async function getUsers(searchQuery) {
    let URL = searchQuery ? `http://localhost:3000/chat/getChats?query=${searchQuery}` : "http://localhost:3000/chat/getChats";

    const res = await fetch(URL, {
        method: "GET",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to get users");
    }

    const data = await res.json();
    return data;
}

export function useGetUsers(searchQuery) {
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ["users", searchQuery],
        queryFn: () => getUsers(searchQuery),
    });

    return {data, isLoading, error, isError};
}

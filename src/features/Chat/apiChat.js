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

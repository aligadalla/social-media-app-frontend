import { useQuery } from "@tanstack/react-query";

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
        queryKey: ["users"],
        queryFn: () => getUsers(searchQuery)
    });

    return {data, isLoading, error, isError};
}
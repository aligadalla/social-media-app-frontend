import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getPosts(username){
    const res = await fetch(`http://localhost:3000/profile/posts/${username}`, {
        method: "GET",
        credentials: "include",
      });
    
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
    
      const data = await res.json();
      return data;
}

export function useGetProfilePosts(username){
    const {data,isLoading,error} = useQuery({
        queryKey: ["profile"],
        queryFn: ()=>getPosts(username),
    })

    return {data,isLoading,error}
}
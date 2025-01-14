import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getProfileData(profileUserId){
    const res = await fetch(`http://localhost:3000/profile/posts/${profileUserId}`, {
        method: "GET",
        credentials: "include",
      });
    
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
    
      const data = await res.json();
      console.log("posts refetched with data",data)

      return data;
}

export function useGetProfileData(profileUserId){
    const {data,isLoading,error} = useQuery({
        queryKey: ["profile",profileUserId],
        queryFn: ()=>getProfileData(profileUserId),
    })
    console.log("useGetUserCalled")
    return {data,isLoading,error}
}

export async function getProfilePicture(username){
  const res = await fetch(`http://localhost:3000/profile/profilePicture/${username}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch image");
  }

  const data = await res.json();
  // console.log("posts refetched with data",data)

  return data;
}
import {  useGetPosts } from "./apiFeed";
import Post from "./Post";

export default function FeedData() {
  const { data /*isLoading,error*/ } = useGetPosts();
  // console.log("posts", data);
  const posts = data?.posts;
  
  return (
    <div>
      {posts?.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
}

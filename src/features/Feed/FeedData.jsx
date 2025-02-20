import { useGetPosts } from "./apiFeed";
import Post from "./Post";

export default function FeedData() {
  const { data } = useGetPosts();
  const posts = data?.posts;

  return (
    <div className="space-y-4 p-4">
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
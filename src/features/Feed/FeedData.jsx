import { useQuery } from "@tanstack/react-query";

async function fetchFeed() {
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

export default function FeedData() {
  const { data } = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
  });
  console.log("posts", data);
  const posts = data?.posts;
  return (
    <div>
      {posts?.map((post) => (
        <>
            <p key={post.id}>{post.username}</p>
            <p key={post.id}>{post.likeCount}</p>
            <p key={post.id}>{post.commentCount}</p>
            <p key={post.id}>{post.description}</p>
        </>
      ))}
    </div>
  );
}

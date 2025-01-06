import { useParams } from "react-router-dom";
import { useGetUser } from "../Auth/Authentication";
import { useGetProfilePosts } from "./apiProfile";
import Post from '../Feed/Post'
function Profile() {
  const { data: user } = useGetUser();
  const params = useParams();
  const { data } = useGetProfilePosts(params.userName);
  const posts = data?.posts;
  console.log("data from profile", posts);
  const me = user.username === params.userName;
  console.log("me", me);
  return (
    <div>
      <h1>Profile</h1>
      <img src="" />
      <p>{params.userName}</p>
      {me ? <p>edit</p> : <p>follow</p>}
      {posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Profile;

import Post from "./Post";
const PostList = ({currentPosts, onSave}) => {
  return (
    <div className="posts-list">
    {currentPosts.map((post) => {
      return <Post key={post.id} post={post} onSave={onSave} />;
    })}
  </div>

  )

}
export default PostList;
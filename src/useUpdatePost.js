
function useUpdatePost(posts, setPosts){
  const handleOnSave = (id, newTitle, newBody) => {
    setPosts(
      posts.map((post) => {
        return post.id === id
          ? { userId: post.userId, id: id, title: newTitle, body: newBody }
          : post;
      })
    );
  };
  return {handleOnSave};
}

export default useUpdatePost;

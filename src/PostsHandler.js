  import "./PostsHandler.css";
  import Post from "./Post";
  import Pagination from "./Pagination";
  import UserFilter from "./UserFilter";
  import {getPostsForPage } from "./utils";
  import usePagination from "./usePagination";
  import Sort from "./Sort";
  import useUserFilter from "./useUserFilter";
  import useSorting from "./useSorting";
  import useUpdatePost from "./useUpdatePost";

  function PostsHandler({ posts, setPosts }) {


    const {uniqueUserIds, allowedUserIds, allowedPosts, toggleUserFilter} = useUserFilter(posts);

    const {currentPage, totalPages, onNextPage, onPreviousPage} = usePagination(allowedPosts);
      
    const {sortOrder, handleSortChange, sortedPosts} = useSorting(allowedPosts);
    const currentPosts = getPostsForPage(sortedPosts, currentPage);

    const {handleOnSave} = useUpdatePost(posts, setPosts);

    return (
      <div className="posts-handler">
        <UserFilter
          uniqueUserIds={uniqueUserIds}
          allowedUserIds={allowedUserIds}
          onToggleUserFilter={toggleUserFilter}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPrevPage={onPreviousPage}
        />
        <Sort sortOrder={sortOrder} handleSortChange={handleSortChange} />
        <div className="posts-list">
          {currentPosts.map((post) => {
            return <Post key={post.id} post={post} onSave={handleOnSave} />;
          })}
        </div>
      </div>
    );
  }

  export default PostsHandler;

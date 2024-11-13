import "./PostsHandler.css";
import Post from "./Post";
import Pagination from "./Pagination";
import UserFilter from "./UserFilter";
import { getPostsForPage } from "./utils";
import usePagination from "./usePagination";
import Sort from "./Sort";
import useUserFilter from "./useUserFilter";
import useSorting from "./useSorting";
import useUpdatePost from "./useUpdatePost";
import PostList from "./PostList";

function PostsManager({ posts, setPosts, allUniqueUserIds, filteredUserIds, filteredPosts, toggleUserFilter}) {


  const { currentPage, totalPages, onNextPage, onPreviousPage } =
    usePagination(filteredPosts);

  const { sortOrder, handleSortChange, sortedPosts } =
    useSorting(filteredPosts);
  const currentPosts = getPostsForPage(sortedPosts, currentPage);

  const { handleOnSave } = useUpdatePost(posts, setPosts);

  return (
    <div className="posts-handler">
      <UserFilter
        allUniqueUserIds={allUniqueUserIds}
        filteredUserIds={filteredUserIds}
        onToggleUserFilter={toggleUserFilter}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPreviousPage}
      />
      <Sort 
      sortOrder={sortOrder} 
      handleSortChange={handleSortChange} 
      />
      <PostList
      currentPosts = {currentPosts}
      onSave = {handleOnSave}
      />
    </div>
  );
}

export default PostsManager;

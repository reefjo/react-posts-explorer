import "../styles/PostsManager.css";
import Pagination from "./Pagination";
import UserFilter from "./UserFilter";
import { getPostsForPage } from "../utils/utils";
import usePagination from "../hooks/usePagination";
import TitleSort from "./TitleSort";
import useSorting from "../hooks/useSorting";
import useUpdatePost from "../hooks/useUpdatePost";
import PostList from "./PostList";

function PostsManager({
  posts,
  setPosts,
  allUniqueUserIds,
  filteredUserIds,
  filteredPosts,
  toggleUserFilter,
}) {
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
      <TitleSort sortOrder={sortOrder} handleSortChange={handleSortChange} />

      <PostList currentPosts={currentPosts} onSave={handleOnSave} />
    </div>
  );
}

export default PostsManager;

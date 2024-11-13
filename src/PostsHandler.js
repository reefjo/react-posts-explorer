  import { useState, useEffect, useRef, useMemo } from "react";
  import "./PostsHandler.css";
  import Post from "./Post";
  import Pagination from "./Pagination";
  import AuthorFilter from "./AuthorFilter";
  import {getPostsForPage } from "./utils";
  import usePagination from "./usePagination";
  import Sort from "./Sort";
  import useAuthorFilter from "./useAuthorFilter";
  import useSorting from "./useSorting";
  import useUpdatePost from "./useUpdatePost";

  function PostsHandler({ posts, setPosts }) {


    const {uniqueAuthorIds, allowedAuthorIds, allowedPosts, toggleAuthorFilter} = useAuthorFilter(posts);

    const {currentPage, totalPages, onNextPage, onPreviousPage} = usePagination(allowedPosts);
      
    const {sortOrder, handleSortChange, sortedPosts} = useSorting(allowedPosts);
    const currentPosts = getPostsForPage(sortedPosts, currentPage);

    const {handleOnSave} = useUpdatePost(posts, setPosts);
    
    return (
      <div className="posts-handler">
        <AuthorFilter
          uniqueAuthorIds={uniqueAuthorIds}
          allowedAuthorIds={allowedAuthorIds}
          onToggleAuthorFilter={toggleAuthorFilter}
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

import { useState, useEffect, useRef, useMemo } from "react";
import "./PostsHandler.css";
import Post from "./Post";
import Pagination from "./Pagination";
import AuthorFilter from "./AuthorFilter";
import {NO_SORTING } from "./constants";
import { getSortedPosts, getPostsForPage } from "./utils";
import usePagination from "./usePagination";
import Sort from "./Sort";
import useAuthorFilter from "./useAuthorFilter";

function PostsHandler({ posts, setPosts }) {
  const [sortOrder, setSortOrder] = useState(NO_SORTING);
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const uniqueAuthorIds = useMemo(
    () => [...new Set(posts.map((post) => post.userId))],
    [posts]
  );
  console.log("unique authors", uniqueAuthorIds);

  const [allowedAuthorIds, setAllowedAuthorIds] = useState([]);
  console.log("allowedAuthorIds:", allowedAuthorIds);

  const isFirstRender = useRef(true); //

  // The goal is to update posts only when fetched initially
  useEffect(() => {
    if (uniqueAuthorIds.length > 0 && isFirstRender.current) {
      console.log("We on first render. uniqueAuthorIds:", uniqueAuthorIds);
      setAllowedAuthorIds(uniqueAuthorIds);
      isFirstRender.current = false;
    }
  }, [uniqueAuthorIds]);

  const allowedPosts = posts.filter((post) =>
    allowedAuthorIds.includes(post.userId)
  );

  const { currentPage, totalPages, onNextPage, onPreviousPage } =
    usePagination(allowedPosts);
  const sortedPosts = getSortedPosts(allowedPosts, sortOrder);
  const currentPosts = getPostsForPage(sortedPosts, currentPage);

  const onToggleAuthorFilter = (id) => {
    let newAllowedIds = [...allowedAuthorIds];
    if (allowedAuthorIds.includes(id)) {
      newAllowedIds = newAllowedIds.filter((currentId) => currentId !== id);
    } else {
      newAllowedIds.push(id); // allow the id
    }
    setAllowedAuthorIds(newAllowedIds);
  };

  const handleOnSave = (id, newTitle, newBody) => {
    setPosts(
      posts.map((post) => {
        return post.id === id
          ? { userId: post.userId, id: id, title: newTitle, body: newBody }
          : post;
      })
    );
  };

  return (
    <div className="posts-handler">
      <AuthorFilter
        uniqueAuthorIds={uniqueAuthorIds}
        allowedAuthorIds={allowedAuthorIds}
        onToggleAuthorFilter={onToggleAuthorFilter}
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

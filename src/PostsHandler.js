/*
  I am aware that we need to make scalable, modular components. That's why I moved "Post" into a different file
  I can do the same to Pagination and author filtering, which have relatively small code.
  However, I feel like this might lead to "file overload" or possibly over-engineering.
  So I decided to handle the pagination and filtering here, rather than in different files.
  I might be wrong though, and im open to discuss and learn!
  */

import { useState, useEffect, useRef, useMemo } from "react";
import "./PostsHandler.css";
import Post from "./Post";
import Pagination from "./Pagination";

const ASCENDING = "ascending";
const DESCENDING = "descending";
const NO_SORTING = "No Sorting";

function PostsHandler({ posts, setPosts }) {
  const [sortOrder, setSortOrder] = useState(NO_SORTING);
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const getSortedPosts = (postsToSort) => {
    if(sortOrder === ASCENDING){
      return [...postsToSort].sort((a,b) => a.title.localeCompare(b.title));
    }
    else if (sortOrder === DESCENDING){
      return [...postsToSort].sort((a,b) => b.title.localeCompare(a.title));
    }
    return postsToSort;  // no sorting
  } 


  /* First filter by author, then filter by pages */
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

  const POSTS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const allowedPosts = posts.filter((post) =>
    allowedAuthorIds.includes(post.userId)
  );

  console.log("posts:", posts, "allowedPosts:", allowedPosts);
  const totalPages = Math.max(
    1,
    Math.ceil(allowedPosts.length / POSTS_PER_PAGE)
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [allowedAuthorIds, currentPage, totalPages]);

  const nextPageStartIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allowedPosts.slice(
    nextPageStartIndex,
    nextPageStartIndex + POSTS_PER_PAGE
  );

  const toggleAuthorFilter = (id) => {
    let newAllowedIds = [...allowedAuthorIds];
    if (allowedAuthorIds.includes(id)) {
      newAllowedIds = newAllowedIds.filter((currentId) => currentId !== id);
    } else {
      newAllowedIds.push(id); // allow the id
    }
    setAllowedAuthorIds(newAllowedIds);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
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

  const getButtonClass = (id) => {
    return allowedAuthorIds.includes(id)
      ? "button-allowed"
      : "button-not-allowed";
  };

  return (
    <div className="posts-handler">
      {/* Author filter UI */}
      <div className="author-filter">
        {uniqueAuthorIds.map((id) => (
          <button
            key={id}
            className={`button ${getButtonClass(id)}`}
            onClick={() => toggleAuthorFilter(id)}
          >
            User {id}
          </button>
        ))}
      </div>

      <div className="paging">
        <label>
          page: {currentPage} out of {totalPages}
        </label>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
      <div className="sorting">
        <label>Sort title by:</label>
        <select className="sort-select" value = {sortOrder} onChange={handleSortChange}>
          <option value = {NO_SORTING}>{NO_SORTING}</option>
          <option value = {ASCENDING}>{ASCENDING}</option>
          <option value = {DESCENDING}>{DESCENDING}</option>
        </select>

      </div>
      <div className="posts-list">
        {currentPosts.map((post) => {
          return <Post key={post.id} post={post} onSave={handleOnSave} />;
        })}
      </div>
    </div>
  );
}

export default PostsHandler;

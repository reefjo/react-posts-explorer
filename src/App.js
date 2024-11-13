import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import useFetch from "./useFetch";
import PostsManager from "./PostsManager";
import PostsMap from "./PostsMap";
import useUserFilter from "./useUserFilter";

function App() {
  const {
    data: posts,
    setData: setPosts,
    error,
    isLoading,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  // Once initialized, call useUserFilter
  const { allUniqueUserIds, filteredUserIds, filteredPosts, toggleUserFilter } =
    useUserFilter(posts, isLoading);

  const coordinatesMap = useRef(new Map());

  useEffect(() => {
    if (!isLoading && coordinatesMap.current.size === 0) {
      console.log("Populating coordinatesMap with initial data...");
      posts.forEach((post) => {
        coordinatesMap.current.set(post.id, {
          lat: (Math.random() * 180 - 90).toFixed(6),
          lon: (Math.random() * 360 - 180).toFixed(6),
        });
      });
    }
  }, [isLoading, posts]);
  

  if (isLoading) {
    return <div className="loading-message">Loading posts...</div>;
  }
  if (error) {
    return (
      <div className="error-message">Error has occured:{error.message}</div>
    );
  }

  return (
    <div className="App">
      <PostsManager
        posts={posts}
        setPosts={setPosts}
        allUniqueUserIds={allUniqueUserIds}
        filteredUserIds={filteredUserIds}
        filteredPosts={filteredPosts}
        toggleUserFilter={toggleUserFilter}
      />
      {<PostsMap
            posts = {filteredPosts}
            coordinatesMap = {coordinatesMap.current}/>
            }
    </div>
  );
}

export default App;

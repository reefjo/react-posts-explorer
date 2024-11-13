import { useState, useEffect, useMemo } from "react";

function useUserFilter(posts, isLoading) {
  const allUniqueUserIds = useMemo(
    () => [...new Set(posts.map((post) => post.userId))],
    [posts]
  );
  const [filteredUserIds, setFilteredUserIds] = useState([]);

  // The goal is to update posts only when fetched initially
  useEffect(() => {
    if(!isLoading){
    console.log("We on first render. uniqueUserIds:", allUniqueUserIds);
    setFilteredUserIds(allUniqueUserIds);
    }
  }, [isLoading]);

  const toggleUserFilter = (id) => {
    let newFilteredIds = [...filteredUserIds];
    if (filteredUserIds.includes(id)) {
      newFilteredIds = newFilteredIds.filter((currentId) => currentId !== id);
    } else {
      newFilteredIds.push(id); // allow the id
    }
    setFilteredUserIds(newFilteredIds);
  };

  const filteredPosts = useMemo(
    () => posts.filter((post) => filteredUserIds.includes(post.userId)),
    [posts, filteredUserIds]
  );

  return { allUniqueUserIds, filteredUserIds, filteredPosts, toggleUserFilter };
}
export default useUserFilter;

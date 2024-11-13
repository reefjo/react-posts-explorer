import { useState, useEffect, useMemo, useRef } from "react";

function useUserFilter(posts, isLoading) {
  const allUniqueUserIds = useMemo(
    () => [...new Set(posts.map((post) => post.userId))],
    [posts]
  );
  const [filteredUserIds, setFilteredUserIds] = useState([]);
  const firstTime = useRef(true);

  useEffect(() => {
    if(!isLoading && firstTime.current){
    console.log("We on first render. uniqueUserIds:", allUniqueUserIds);
    setFilteredUserIds(allUniqueUserIds);
    firstTime.current = false;
    }
  }, [isLoading, allUniqueUserIds]);

  const toggleUserFilter = (userId) => {
    let newFilteredIds = [...filteredUserIds];
    if (filteredUserIds.includes(userId)) {
      newFilteredIds = newFilteredIds.filter((currentId) => currentId !== userId);
    } else {
      newFilteredIds.push(userId); // allow this user id
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

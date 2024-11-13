import { useState, useEffect, useMemo, useRef } from "react";

function useUserFilter(posts){
  const uniqueUserIds = useMemo(() => [...new Set(posts.map((post) => post.userId))], [posts]);
  const [filteredUserIds, setFilteredUserIds] = useState([]);

  const isFirstRender = useRef(true); 

  // The goal is to update posts only when fetched initially
  useEffect(() => {
    if (uniqueUserIds.length > 0 && isFirstRender.current) {
      console.log("We on first render. uniqueUserIds:", uniqueUserIds);
      setFilteredUserIds(uniqueUserIds);
      isFirstRender.current = false;
    }
  }, [uniqueUserIds]);

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


  return {uniqueUserIds, filteredUserIds, filteredPosts, toggleUserFilter}


}
export default useUserFilter
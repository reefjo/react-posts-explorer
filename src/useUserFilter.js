import { useState, useEffect, useMemo, useRef } from "react";

function useUserFilter(posts){
  const uniqueUserIds = useMemo(() => [...new Set(posts.map((post) => post.userId))], [posts]);
  const [allowedUserIds, setAllowedUserIds] = useState([]);

  const isFirstRender = useRef(true); 

  // The goal is to update posts only when fetched initially
  useEffect(() => {
    if (uniqueUserIds.length > 0 && isFirstRender.current) {
      console.log("We on first render. uniqueAuthorIds:", uniqueUserIds);
      setAllowedUserIds(uniqueUserIds);
      isFirstRender.current = false;
    }
  }, [uniqueUserIds]);

  const toggleUserFilter = (id) => {
    let newAllowedIds = [...allowedUserIds];
    if (allowedUserIds.includes(id)) {
      newAllowedIds = newAllowedIds.filter((currentId) => currentId !== id);
    } else {
      newAllowedIds.push(id); // allow the id
    }
    setAllowedUserIds(newAllowedIds);
  };

  const allowedPosts = useMemo(
    () => posts.filter((post) => allowedUserIds.includes(post.userId)),
    [posts, allowedUserIds]
  );


  return {uniqueUserIds, allowedUserIds, allowedPosts, toggleUserFilter}


}
export default useUserFilter
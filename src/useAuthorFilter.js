import { useState, useEffect, useMemo, useRef } from "react";

function useAuthorFilter(posts){
  const uniqueAuthorIds = useMemo(() => [...new Set(posts.map((post) => post.userId))], [posts]);
  const [allowedAuthorIds, setAllowedAuthorIds] = useState([]);

  const isFirstRender = useRef(true); 

  // The goal is to update posts only when fetched initially
  useEffect(() => {
    if (uniqueAuthorIds.length > 0 && isFirstRender.current) {
      console.log("We on first render. uniqueAuthorIds:", uniqueAuthorIds);
      setAllowedAuthorIds(uniqueAuthorIds);
      isFirstRender.current = false;
    }
  }, [uniqueAuthorIds]);

  const onToggleAuthorFilter = (id) => {
    let newAllowedIds = [...allowedAuthorIds];
    if (allowedAuthorIds.includes(id)) {
      newAllowedIds = newAllowedIds.filter((currentId) => currentId !== id);
    } else {
      newAllowedIds.push(id); // allow the id
    }
    setAllowedAuthorIds(newAllowedIds);
  };

  const allowedPosts = useMemo(
    () => posts.filter((post) => allowedAuthorIds.includes(post.userId)),
    [posts, allowedAuthorIds]
  );


  return {uniqueAuthorIds, allowedAuthorIds, allowedPosts, onToggleAuthorFilter}


}
export default useAuthorFilter
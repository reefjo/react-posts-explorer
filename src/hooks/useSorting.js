import { useState } from "react";
import { NO_SORTING } from "../utils/constants";
import { getSortedPosts } from "../utils/utils";

function useSorting(filteredPosts) {
  const [sortOrder, setSortOrder] = useState(NO_SORTING);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const sortedPosts = getSortedPosts(filteredPosts, sortOrder);

  return { sortOrder, handleSortChange, sortedPosts };
}
export default useSorting;

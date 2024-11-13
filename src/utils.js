import { ASCENDING, DESCENDING, POSTS_PER_PAGE } from "./constants";
export const getSortedPosts = (posts, sortOrder) => {
  if (sortOrder === ASCENDING) {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === DESCENDING) {
    return [...posts].sort((a, b) => b.title.localeCompare(a.title));
  }
  return posts; // no sorting
};

export function getPostsForPage(posts, page) {
  const nextPageStartIndex = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(
    nextPageStartIndex,
    nextPageStartIndex + POSTS_PER_PAGE
  );

};

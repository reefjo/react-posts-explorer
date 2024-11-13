import {useState, useEffect} from 'react';
import { POSTS_PER_PAGE } from './constants';

const usePagination = (allowedPosts) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,  
    Math.ceil(allowedPosts.length / POSTS_PER_PAGE)
  );

  useEffect (() => {
    if(currentPage > totalPages){
      setCurrentPage(totalPages);
    }
  }, [allowedPosts, currentPage, totalPages]);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPreviousPage = () => setCurrentPage(currentPage - 1);

  return{
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
  };

};
export default usePagination
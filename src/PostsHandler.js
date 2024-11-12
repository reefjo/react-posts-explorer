import {useState} from 'react';
import './PostsHandler.css'

function PostsHandler({posts, setPosts}){
  const POSTS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  const nextPageStartIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(nextPageStartIndex, nextPageStartIndex + POSTS_PER_PAGE);


  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className='posts-handler'>

<div className='paging'>
      <label>page: {currentPage} out of {totalPages}</label>
      <button onClick={goToPreviousPage} disabled = {currentPage === 1}>Previous Page</button>
      <button onClick={goToNextPage} disabled = {currentPage === totalPages}>Next Page</button>
    </div>

      <div className='posts-list'>

    {currentPosts.map((post) => {
      return(
        <div className='post'>
          <div className='post-data'>
        <h3>{post.title} (User {post.userId})</h3>
        <p>{post.body}</p>
          </div>
        <div className='post-button'>
          
          </div>
        </div>
      )
      
    })}
    </div>

</div>

  )
}



export default PostsHandler
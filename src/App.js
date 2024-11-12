import './App.css';
import React, {useEffect, useState} from 'react';
import useFetch from './useFetch';
import PostsHandler from './PostsHandler';

function App() {
  const [posts, setPosts] = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <div className="App">
        <div>
        <PostsHandler posts={posts} setPosts={setPosts} />
        </div>   
    </div>
  );
}

export default App;

  import './App.css';
  import React, {useEffect, useState} from 'react';
  import useFetch from './useFetch';
  import PostsManager from './PostsManager';

  function App() {
    const [posts, setPosts] = useFetch('https://jsonplaceholder.typicode.com/posts');

    return (
      <div className="App">
          <PostsManager
           posts={posts} 
           setPosts={setPosts}
            />
      </div>
    );
  }

  export default App;

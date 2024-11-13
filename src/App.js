  import './App.css';
  import React, {useEffect, useState} from 'react';
  import useFetch from './useFetch';
  import PostsManager from './PostsManager';
  import Map from './Map';

  function App() {
    const [posts, setPosts] = useFetch('https://jsonplaceholder.typicode.com/posts');

    // Add random coordinates or static coordinates to each post for the map
    const postsWithCoordinates = posts.map(post => ({
      ...post,
      lat: (Math.random() * (90 - (-90)) + (-90)).toFixed(6),
      lon: (Math.random() * (180 - (-180)) + (-180)).toFixed(6)
    }));


    return (
      <div className="App">
          <PostsManager
           posts={posts} 
           setPosts={setPosts}
            />
          <Map posts = {postsWithCoordinates}/>
      </div>
    );
  }

  export default App;

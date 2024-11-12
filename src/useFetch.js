import {useEffect, useState } from 'react';

function useFetch(url){
  const [data, setData] = useState([]);
  useEffect (() => {
    const fetchposts = async() => {
      try{
        const response = await fetch(url);
        const response_data = await response.json();
        setData(response_data);
      }catch(error){
        console.log("Error fetching data:", error);
      }
    };
    fetchposts();
  }, [url]);
  return [data, setData];

}
export default useFetch
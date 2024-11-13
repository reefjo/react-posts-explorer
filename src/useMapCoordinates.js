import {useEffect, useRef} from 'react';
const useCoordinatesMap = (posts, isLoading) => {
  const coordinatesMap = useRef(new Map());

  useEffect(() => {
    if (!isLoading && coordinatesMap.current.size === 0) {
      console.log("Populating coordinatesMap with initial data...");
      posts.forEach((post) => {
        coordinatesMap.current.set(post.id, {
          lat: (Math.random() * 180 - 90).toFixed(6),
          lon: (Math.random() * 360 - 180).toFixed(6),
        });
      });
    }
  }, [isLoading, posts]);

  return {coordinatesMap};
}
export default useCoordinatesMap

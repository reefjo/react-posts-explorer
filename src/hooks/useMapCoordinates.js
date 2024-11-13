import { useEffect, useRef } from "react";
const useCoordinatesMap = (posts, isLoading) => {
  const coordinatesMap = useRef(new Map());

  useEffect(() => {
    posts.forEach((post) => {
      if (!coordinatesMap.current.has(post.id)) {
        coordinatesMap.current.set(post.id, {
          lat: (Math.random() * 180 - 90).toFixed(6),
          lon: (Math.random() * 360 - 180).toFixed(6),
        });
      }
    });
  }, [posts]);

  return { coordinatesMap };
};
export default useCoordinatesMap;

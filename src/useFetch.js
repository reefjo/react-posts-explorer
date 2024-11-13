import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchposts = async () => {
      try {
        const response = await fetch(url);
        const response_data = await response.json();

        setData(response_data);
      } catch (e) {
        console.log("Error fetching data:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchposts();
  }, [url]);

  return { data, setData, error, isLoading };
}
export default useFetch;

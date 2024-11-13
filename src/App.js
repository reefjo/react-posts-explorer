import "./App.css";
import useFetch from "./useFetch";
import PostsManager from "./PostsManager";
import PostsMap from "./PostsMap";
import useUserFilter from "./useUserFilter";
import useCoordinatesMap from "./useMapCoordinates";
import Loading from "./Loading";
import Error from "./Error";
import { POSTS_API_URL } from "./constants";

function App() {
  const {
    data: posts,
    setData: setPosts,
    error,
    isLoading,
  } = useFetch(POSTS_API_URL);

  /* Once initialized (isLoading = false), call useUserFilter and populate coordinatesMap */
  const { allUniqueUserIds, filteredUserIds, filteredPosts, toggleUserFilter } =
    useUserFilter(posts, isLoading);

  const { coordinatesMap } = useCoordinatesMap(posts, isLoading);

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div className="App">
      <PostsManager
        posts={posts}
        setPosts={setPosts}
        allUniqueUserIds={allUniqueUserIds}
        filteredUserIds={filteredUserIds}
        filteredPosts={filteredPosts}
        toggleUserFilter={toggleUserFilter}
      />
      <PostsMap posts={filteredPosts} coordinatesMap={coordinatesMap.current} />
    </div>
  );
}

export default App;

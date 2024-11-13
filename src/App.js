import "./styles/App.css";
import useFetch from "./hooks/useFetch";
import PostsManager from "./components/PostsManager";
import PostsMap from "./components/PostsMap";
import useUserFilter from "./hooks/useUserFilter";
import useCoordinatesMap from "./hooks/useMapCoordinates";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { POSTS_API_URL } from "./utils/constants";

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

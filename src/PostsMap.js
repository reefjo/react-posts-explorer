import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./PostsMap.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { POSTS_MAP_CENTER } from "./constants";

// Custom marker icon (to fix a bug where icon is not showing if done the regular way)
const icon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const PostsMap = ({ posts, coordinatesMap }) => {
  return (
    <MapContainer center={POSTS_MAP_CENTER} zoom={2} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {posts.map((post) => {
        const { lat, lon } = coordinatesMap.get(post.id);
        return (
          <Marker key={post.id} position={[lat, lon]} icon={icon}>
            <Popup className="custom-popup">
              <div className="user-id">User {post.userId}</div>
              <div className="post-title">{post.title}</div>
              <div className="post-body">{post.body}</div>
              Coordinates: {lat}, {lon}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default PostsMap;

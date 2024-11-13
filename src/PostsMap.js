import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import './PostsMap.css'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PostsMap = ({ posts, coordinatesMap }) => {
  console.log("coordinartes map:",coordinatesMap)
  // Fix default marker icon issue (Leaflet can't find the default icon automatically)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {posts.map((post, index) => {
        const {lat, lon} = coordinatesMap.get(post.id);
        return(
        <Marker key={index} position={[lat, lon]}>
          {/* Add the custom-popup class to Popup */}
          <Popup className="custom-popup">
            <strong className='user-name'>User {post.userId}</strong><br />
            <strong>{post.title}</strong><br />
            {post.body}<br />
            Coordinates: {lat}, {lon}
          </Popup>
        </Marker>
        );
     })}
    </MapContainer>
  );
};

export default PostsMap;

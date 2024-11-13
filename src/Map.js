import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import './Map.css'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ posts }) => {
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
      {posts.map((post, index) => (
        <Marker key={index} position={[post.lat, post.lon]}>
          {/* Add the custom-popup class to Popup */}
          <Popup className="custom-popup">
            <strong color='red'>User {post.userId}</strong><br />
            <strong>{post.title}</strong><br />
            {post.body}<br />
            Coordinates: {post.lat}, {post.lon}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Coordinates for the triangle vertices
// const pointA = [23.0225, 72.5714]; // Ahmedabad
// const pointB = [22.3039, 70.8022]; // Rajkot
// const pointC = [21.1702, 72.8311]; // Surat

// // Path for the triangle
// const trianglePath = [pointA, pointB, pointC, pointA];

// // Fix for Marker Icon not showing
// const DefaultIcon = L.icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
//     shadowSize: [41, 41]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const LeafletMap = () => {
//   return (
//     <MapContainer center={[22.5, 72]} zoom={7} style={{ height: '500px', width: '100%' }}>
//       {/* Load OpenStreetMap tiles */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {/* Markers for each point */}
//       <Marker position={pointA}>
//         <Popup>Ahmedabad</Popup>
//       </Marker>
//       <Marker position={pointB}>
//         <Popup>Rajkot</Popup>
//       </Marker>
//       <Marker position={pointC}>
//         <Popup>Surat</Popup>
//       </Marker>

//       {/* Polyline to draw the triangle */}
//       <Polyline positions={trianglePath} color="red" weight={2} />
//     </MapContainer>
//   );
// };

// export default LeafletMap;

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [30, 30],
  iconAnchor: [19, 30],
  popupAnchor: [0, -28],
});

const pointA = [23.0225, 72.5714]; // Ahmedabad
const pointB = [22.3039, 70.8022]; // Rajkot
const pointC = [21.1702, 72.8311]; // Surat
const pointD = [22.3072, 73.1812];

const trianglePath = [pointA, pointB, pointC, pointD];

const CustomLeafletMap = () => {
  return (
    <MapContainer
      center={[22.5, 72]}
      zoom={7}
      style={{ height: "300px", width: "50%", marginLeft:'25%' }}
    >
      {/* Load OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Custom markers with red pin icons */}
      <Marker position={pointA} icon={redIcon}>
        <Popup>Ahmedabad</Popup>
      </Marker>
      <Marker position={pointB} icon={redIcon}>
        <Popup>Rajkot</Popup>
      </Marker>
      <Marker position={pointC} icon={redIcon}>
        <Popup>Surat</Popup>
      </Marker>
      <Marker position={pointD} icon={redIcon}>
        <Popup>Vadodara</Popup>
      </Marker>

      <Polyline positions={trianglePath} color="red" weight={2} />
    </MapContainer>
  );
};

export default CustomLeafletMap;

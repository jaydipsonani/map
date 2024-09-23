import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [30, 30],
  iconAnchor: [17, 30],
  popupAnchor: [0, -28],
});

const points = [
  [23.0225, 72.5714], // Start Point (e.g., Surat)
  [22.3039, 70.8022], // Point 2
  [21.1702, 72.8311], // Point 3
  [23.2599, 77.4126]  // End Point (same as Start)
];

const MapComponent = () => {
  const [circlePosition, setCirclePosition] = useState(points[0]);
  const [animation, setAnimation] = useState(true); // State to control animation

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const intervalTime = 100; // Update every 100 ms
    const totalSteps = (duration / intervalTime) * (points.length - 1);
    let currentStep = 0;

    // Set initial circle position immediately
    setCirclePosition(points[0]);

    const animateCircle = () => {
      const interval = setInterval(() => {
        if (currentStep < totalSteps) {
          const segmentIndex = Math.floor(currentStep / (totalSteps / (points.length - 1)));

          if (segmentIndex < points.length - 1) { // Ensure we don't exceed the points array
            const start = points[segmentIndex];
            const end = points[segmentIndex + 1];

            const latStep = (end[0] - start[0]) / (totalSteps / (points.length - 1));
            const lngStep = (end[1] - start[1]) / (totalSteps / (points.length - 1));

            setCirclePosition((prevPosition) => [
              prevPosition[0] + latStep,
              prevPosition[1] + lngStep,
            ]);
          }

          currentStep++;
        } else {
          // Stop at the last point, then reset to the start point
          setCirclePosition(points[0]);
          clearInterval(interval);
          setAnimation(true); // Restart animation
        }
      }, intervalTime);

      return () => clearInterval(interval);
    };

    if (animation) {
      animateCircle();
      setAnimation(false); // Set animation to false to prevent multiple intervals
    }
  }, [animation]);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Polyline positions={points} color="blue" />

      {/* <div
        className="custom-circle"
        style={{
          position: "absolute",
          left: `${(circlePosition[1] + 180) / 360 * 100}%`,
          top: `${(1 - (circlePosition[0] + 90) / 180) * 100}%`,
          transform: "translate(-50%, -50%)" // Center the circle
        }}
      /> */}
      
      <Circle
        center={circlePosition}
        radius={3000} 
        color="red"
        fillColor="rgba(255, 0, 0, 0.4)"
      />

      {/* Markers for each point */}
      {points.map((point, index) => (
        <Marker key={index} position={point} icon={redIcon}>
          <Popup>
            {index === 0 ? "Start Point" : `Point ${index + 1}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;


// import React from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   Popup,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const redIcon = L.icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   iconSize: [30, 30],
//   iconAnchor: [17, 30],
//   popupAnchor: [0, -28],
// });

// const pointA = [23.0225, 72.5714]; // Ahmedabad
// const pointB = [22.3039, 70.8022]; // Rajkot
// const pointC = [21.1702, 72.8311]; // Surat

// const trianglePath = [pointA, pointB, pointC, pointA];

// const CustomLeafletMap = () => {
//   return (
//     <MapContainer
//       center={[22.5, 72]}
//       zoom={7}
//       style={{ height: "400px", width: "100%", marginLeft:'0 auto' }}
//     >
//       {/* Load OpenStreetMap tiles */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {/* Custom markers with red pin icons */}
//       <Marker position={pointA} icon={redIcon}>
//         <Popup>Ahmedabad</Popup>
//       </Marker>
//       <Marker position={pointB} icon={redIcon}>
//         <Popup>Rajkot</Popup>
//       </Marker>
//       <Marker position={pointC} icon={redIcon}>
//         <Popup>Surat</Popup>
//       </Marker>

//       <Polyline positions={trianglePath}  color="red" weight={2} />
//     </MapContainer>
//   );
// };

// export default CustomLeafletMap;

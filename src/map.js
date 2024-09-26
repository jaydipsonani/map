import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";


// Haversine formula to calculate the distance between two lat/lng coordinates
const haversineDistance = (coord1, coord2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = coord1[0];
  const lng1 = coord1[1];
  const lat2 = coord2[0];
  const lng2 = coord2[1];

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

// const redIcon = L.icon({
//   iconUrl:
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIlSURBVHgBzZeBdYIwEIbPLlBGoBOUDcwGsoF0AtkANtBOUJ1AnQCdwG4AG6ATpJdACCBoEgL2f++ISHL5vFwuCPAPNQMDUUodbAK0TzQPzak9ztCuaEe002w2y2BMIQxBS6ieErRAZx6lSKFTF5sfNMK/uGIgTieA87lo2b2Qi109DN58DuD7dTfYEb6sRA6BVmg5/805NnGMi+dQyh49M9fFGAWUpqmIGvMTwhChg6hahM1GHaYLbrutL2kEJmoAhaEZTNuYH1OwMqHtAgljyylFVIFwjWjKh7D8sQkkjPktxOZxVKCions6DpCwJBFg8TMgt4oSS84xoQip70jnEVRQlLtkXKD7aDXKxFuLa8mvux1MIjnPordPtSdM6pHJcrN5yiXsA/L448tFz/FqVVR6sTl0S4is9l4XlK+dTyw6UqmsPkTdx34vRlUHZT2nih2QZaCssMrPLR60H9h+87vmQfxYt1tzfrhP9KF6B5uqlu9wUA+959FO6SS9LAukC8qtklUnUX1fJivbJOxeZzwb05foJVhuXBJMTG6URklo59QvvwYBTCJCmvOWakMd+XXRX2CtarkUn/qPEFq8tuTatcbE5IGcwjNhp9go4XVNVvJYBUq+5K3X4wBFkXqUamCyADEH4wDxigY6wgGhdbAmkNlfrSq/bIA1gWIYIitgNoGsgI0BNAhsTCAjsCmAtMCmBFICewXQQ7BXAnWCyTfIwUB//UscIO2kXqYAAAAASUVORK5CYII=",
//   iconSize: [30, 30],
//   iconAnchor: [17, 30],
//   popupAnchor: [0, -28],
// });

const points = [
  [23.0225, 72.5714], // Start Point
  [22.3039, 70.8022], // Point 2
  [21.1702, 72.8311], // Point 3
  [23.2599, 77.4126], // Point 4
  [23.0225, 72.5714], // End Point (same as Start)
];

const MapComponent = () => {
  const [circlePosition, setCirclePosition] = useState(points[0]);
  const [animation, setAnimation] = useState(true); 

  useEffect(() => {
    const speed = 5; // Distance per interval step (faster movement)
    let currentPointIndex = 0;
    let currentDistance = 0;

    const moveCircle = () => {
      const moveBetweenPoints = () => {
        const start = points[currentPointIndex];
        const end = points[currentPointIndex + 1];
        const totalDistance = haversineDistance(start, end);

        const latStep = (end[0] - start[0]) / totalDistance;
        const lngStep = (end[1] - start[1]) / totalDistance;

        const interval = setInterval(() => {
          currentDistance += speed;
          if (currentDistance < totalDistance) {
            setCirclePosition((prevPosition) => [
              prevPosition[0] + latStep * speed,
              prevPosition[1] + lngStep * speed,
            ]);
          } else {
            clearInterval(interval);
            currentPointIndex++;
            if (currentPointIndex < points.length - 1) {
              currentDistance = 0;
              moveBetweenPoints(); // Move to the next point
            } else {
              setCirclePosition(points[0]); // Reset to start point after last point
              setAnimation(true); // Restart animation
            }
          }
        }, 100); // Move every 100ms
      };

      if (currentPointIndex < points.length - 1) {
        moveBetweenPoints();
      }
    };

    if (animation) {
      moveCircle();
      setAnimation(false); // Prevent multiple intervals
    }
  }, [animation]);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Polyline positions={points} color="#FF0000" />

      <Circle
        center={circlePosition}
        radius={4000}
        color="white" // Border color
        fillColor="white" // Fill color
        fillOpacity={1} // Fully opaque fill
      />

      {/* Markers for each point */}
      {points.map((point, index) => (
        <Marker key={index} position={point}>
          <Popup>{index === 0 ? "Start Point" : `Point ${index + 1}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

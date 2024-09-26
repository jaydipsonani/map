import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import './HoverMap.css';  // Add this for custom CSS

const customIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -28],
});

const cities = [
  {
    name: "Ahmedabad",
    coordinates: [23.0225, 72.5714],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9-r3hrbrI2i-bYKqX-XPKzZo0N4ftAm-Hw&s",
  },
  {
    name: "Surat",
    coordinates: [21.1702, 72.8311],
    image:
      "https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1624649548619.jpg-org",
  },
  {
    name: "Rajkot",
    coordinates: [22.3039, 70.8022],
    image:
      "https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1624649548619.jpg-org",
  },
  {
    name: "Vadodara",
    coordinates: [22.3072, 73.1812],
    image:
      "https://content.r9cdn.net/rimg/dimg/dd/59/10733a85-city-35246-1732e7f3a71.jpg?width=1366&height=768&xhint=3694&yhint=2234&crop=true",
  },
  {
    name: "Bhavnagar",
    coordinates: [21.7645, 72.1519],
    image:
      "https://content.r9cdn.net/rimg/dimg/dd/59/10733a85-city-35246-1732e7f3a71.jpg?width=1366&height=768&xhint=3694&yhint=2234&crop=true",
  },
  {
    name: "udaipur",
    coordinates: [24.5854, 73.7125],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9-r3hrbrI2i-bYKqX-XPKzZo0N4ftAm-Hw&s",
  },
];

const HoverMap = () => {
  
  const handleMouseOver = (event) => {
    const { target } = event;
    target.openPopup();
  };

  const handleMouseOut = (event) => {
    const { target } = event;
    target.closePopup();
  };

  return (
    <MapContainer
      center={[22.2587, 71.1924]}
      zoom={3}
      style={{ height: "500px", width: "50%" }}
    >
      {/* Load OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {cities.map((city, index) => (
        <Marker
          key={index}
          position={city.coordinates}
          icon={customIcon}
          eventHandlers={{
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          }}
        >
          <Popup closeButton={false} className="custom-popup">
            <div className="popup-content">
              <img
                style={{ width: "100px", height: "auto" }}
                src={city.image}
                alt={city.name}
                className="popup-image"
              />
              <p>{city.name}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HoverMap;



// import React, { useEffect, useState } from 'react';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// am4core.useTheme(am4themes_animated);

// interface Location {
//     latitude: number;
//     longitude: number;
//     image: string;
//     name: string;
// }

// const JapanMap: React.FC = () => {
//     const defaultLocations: Location[] = [
//         {
//             latitude: 35.6895,
//             longitude: 139.6917,
//             image: "/pexels-photo-2614818.jpeg",
//             name: 'Tokyo'
//         },
//         {
//             latitude: 34.6937,
//             longitude: 135.5022,
//             image: "/istockphoto-1138049211-1024x1024.jpg",
//             name: 'Osaka'
//         },
//         {
//             latitude: 35.0116,
//             longitude: 135.7681,
//             image: "/istockphoto-902966276-1024x1024.jpg",
//             name: 'Kyoto'
//         }
//     ];

//     const [locations, setLocations] = useState<Location[]>(defaultLocations);
//     const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
//     const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

//     useEffect(() => {
//         fetch('http://localhost:3001/map/show')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.locations && data.locations.length > 0) {
//                     setLocations(data.locations);
//                 } else {
//                     setLocations(defaultLocations);
//                 }
//             })
//             .catch(error => {
//                 console.error("Fetch error:", error);
//                 setLocations(defaultLocations);
//             });
//     }, []);

//     useEffect(() => {
//         if (locations.length > 0) {
//             const chart = am4core.create("chartdiv", am4maps.MapChart);
//             chart.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/japanLow.json";
//             chart.projection = new am4maps.projections.Mercator();
//             chart.maxZoomLevel = 1;
//             chart.minZoomLevel = 1;
//             chart.chartContainer.wheelable = false; 
//             chart.seriesContainer.draggable = false; 

//             const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
//             polygonSeries.useGeodata = true;

//             const imageSeries = chart.series.push(new am4maps.MapImageSeries());

//             locations.forEach(location => {
//                 const image = imageSeries.mapImages.create();
//                 image.latitude = location.latitude;
//                 image.longitude = location.longitude;

//                 const circle = image.createChild(am4core.Circle);
//                 circle.radius = 5;
//                 circle.fill = am4core.color("#FF0000"); 
//                 circle.strokeWidth = 2;
//                 circle.stroke = am4core.color("#FFFFFF");

//                 image.events.on("over", () => {
//                     const markerCoords = chart.projection.convert({ latitude: location.latitude, longitude: location.longitude });
//                     setHoveredLocation(location);
//                     setLineCoords({
//                         x1: markerCoords.x,
//                         y1: markerCoords.y,
//                         x2: 400,
//                         y2: 100, 
//                     });
//                 });

//                 image.events.on("out", () => {
//                     circle.fill = am4core.color("#FF0000");
//                     setHoveredLocation(null);
//                     setLineCoords(null); 
//                 });
//             });

//             return () => {
//                 chart.dispose();
//             };
//         }
//     }, [locations]);

//     const imageBoxPosition = {
//         top: '10%',
//         left: '50%',
//         transform: 'translateX(-50%)',
//     };

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
//             <div id="chartdiv" style={{ width: "800px", height: "600px" }}></div>

//             {hoveredLocation && (
//                 <div
//                     className="image-box"
//                     style={{
//                         position: 'absolute',
//                         top: imageBoxPosition.top,
//                         left: imageBoxPosition.left,
//                         transform: imageBoxPosition.transform,
//                         background: 'white',
//                         border: '1px solid #ccc',
//                         borderRadius: '8px',
//                         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
//                         padding: '10px',
//                         textAlign: 'center',
//                         zIndex: 10,
//                     }}
//                 >
//                     <div>{hoveredLocation.name}</div>
//                     <img
//                         src={hoveredLocation.image} 
//                         style={{ width: '100px', height: 'auto', marginTop: '5px', borderRadius: '5px' }}
//                         alt={hoveredLocation.name}
//                     />
//                 </div>
//             )}

//             {lineCoords && (
//                 <svg
//                     style={{
//                         position: 'absolute',
//                         width: '800px',
//                         height: '600px',
//                         pointerEvents: 'none', 
//                     }}
//                 >
//                     <line
//                         x1={lineCoords.x1}
//                         y1={lineCoords.y1}
//                         x2={lineCoords.x2}
//                         y2={lineCoords.y2}
//                         stroke="red"
//                         strokeWidth="2"
//                         strokeDasharray="5,5"
//                     />
//                 </svg>
//             )}
//         </div>
//     );
// };

// export default JapanMap;



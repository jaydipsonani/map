import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const customIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -28],
});


const cities = [
  { name: "Ahmedabad", coordinates: [23.0225, 72.5714], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9-r3hrbrI2i-bYKqX-XPKzZo0N4ftAm-Hw&s" },
  { name: "Surat", coordinates: [21.1702, 72.8311], image: "https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1624649548619.jpg-org" },
  { name: "Rajkot", coordinates: [22.3039, 70.8022], image: "https://media.ahmedabadmirror.com/am/uploads/mediaGallery/image/1624649548619.jpg-org" },
  { name: "Vadodara", coordinates: [22.3072, 73.1812], image: "https://content.r9cdn.net/rimg/dimg/dd/59/10733a85-city-35246-1732e7f3a71.jpg?width=1366&height=768&xhint=3694&yhint=2234&crop=true" },
  { name: "Bhavnagar", coordinates: [21.7645, 72.1519], image: "https://content.r9cdn.net/rimg/dimg/dd/59/10733a85-city-35246-1732e7f3a71.jpg?width=1366&height=768&xhint=3694&yhint=2234&crop=true" },
  { name: "udaipur", coordinates: [24.5854, 73.7125], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9-r3hrbrI2i-bYKqX-XPKzZo0N4ftAm-Hw&s" },
  
];

const HoverMap = () => {
  const markersRef = useRef([]);

  const handleMouseOver = (event) => {
    const { target } = event;
    target.openPopup();
  };

  const handleMouseOut = (event) => {
    const { target } = event;
    target.closePopup();
  };

  return (
    <MapContainer center={[22.2587, 71.1924]} zoom={7} style={{ height: '500px', width: '50%' }}>
      {/* Load OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add a marker for each city */}
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
          <Popup>
            <div>
              <img src={city.image} alt={city.name} style={{ width: '100px', height: 'auto' }} />
              <p>{city.name}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HoverMap;

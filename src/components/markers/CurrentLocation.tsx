import { locationIcon } from '../../icons/icons'; 
import { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from "react-leaflet";


//Location component, on load of map gets location and adds the marker to the map
function CurrentLocation() {
  const [position, setPosition] = useState(null) as any;

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      <Popup>
        You are here. 
      </Popup>
    </Marker>
  );
}

export default CurrentLocation;
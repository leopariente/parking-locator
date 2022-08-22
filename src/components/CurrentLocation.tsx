import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const CurrentLocation: React.FC = () => {
    const [position, setPosition] = useState(null) as any
  
    const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Current Location</Popup>
      </Marker>
    )
  }
  export default CurrentLocation
import { icon } from 'leaflet';
import { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from "react-leaflet";
// import L, { Icon, latLng } from 'leaflet'

function CurrentLocation() {
  const [position, setPosition] = useState(null) as any;
  const [bbox, setBbox] = useState([]) as any;

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      // const circle = L.circle(e.latlng, radius);
      // circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}

export default CurrentLocation;
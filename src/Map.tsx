import React, {useState} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import  VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { LatLng, LatLngExpression } from "leaflet";

const Map: React.FC = () => {
    const position: LatLngExpression = [32.0853, 34.7818];
  return (
    <MapContainer zoom={13} center={position}>
       <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      <Marker position={position}>
        <Popup>
            Tel Aviv City
        </Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  );
};

function LocationMarker() {
  const [position, setPosition] = useState(null) as any
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Do you want to add a new parking spot here? <br /> <button>Confirm</button></Popup>
    </Marker>
  )
}
export default Map;

import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import ParkingMarker from "./components/ParkingMarker";
import ListOfMarkers from "./components/ListOfMarkers";
import CurrentLocation from "./components/CurrentLocation";

const Map: React.FC = () => {
  const position: LatLngExpression = [32.0853, 34.7818];
  
  return (
    <MapContainer zoom={14} center={position}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ParkingMarker />
      <ListOfMarkers />
      <CurrentLocation />
    </MapContainer>
  );
};
export default Map;

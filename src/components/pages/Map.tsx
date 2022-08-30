import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import ParkingMarker from "../markers/ParkingMarker";
import ListOfMarkers from "../markers/ListOfMarkers";
import CurrentLocation from "../markers/CurrentLocation";


const Map: React.FC = () => {
  const position: LatLngExpression = [32.0853, 34.7818];
  const [parkings, setParkings] = useState([]);

  const getAllLocations = async () => {
    const response = await fetch("http://localhost:4000/park");
    const list = await response.json();
    setParkings(list);
  };
  
  return (
    <MapContainer zoom={14} center={position}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ParkingMarker getAllLocations={getAllLocations}/>
      <ListOfMarkers parkings={parkings} getAllLocations={getAllLocations}/>
      <CurrentLocation />
    </MapContainer>
  );
};
export default Map;

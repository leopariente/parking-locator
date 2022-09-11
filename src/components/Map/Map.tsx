import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import ParkingMarker from '../markers/ParkingMarker';
import ListOfMarkers from '../markers/ListOfMarkers';
import CurrentLocation from '../markers/CurrentLocation';
import '../../App.css';

// Main container of map contains all three components of markers
const Map: React.FC = () => {
  const position: LatLngExpression = [32.0853, 34.7818];
  const [parkings, setParkings] = useState([]);

  // Fetches all parkings from database, passes on as props to all the children
  const getAllLocations = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://parking-locator-server.herokuapp.com/park', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const list = await response.json();
    setParkings(list);
  };

  return (
    <MapContainer zoom={14} center={position}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ParkingMarker getAllLocations={getAllLocations} />
      <ListOfMarkers parkings={parkings} getAllLocations={getAllLocations} />
      <CurrentLocation />
    </MapContainer>
  );
};
export default Map;

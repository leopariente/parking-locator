import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const ListOfMarkers = () => {
  const [parkings, setParkings] = useState([]);

  const getAllLocations = async () => {
    const response = await fetch("http://localhost:4000/park");
    const parkings = await response.json();
    console.log(parkings);
    setParkings(parkings);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return parkings === []
    ? null
    : <div>
        {parkings.map((parking: any) => (
            <Marker position={[parking.lat, parking.lon]} key={parking._id}></Marker>
        ))}
        </div>
};
export default ListOfMarkers;

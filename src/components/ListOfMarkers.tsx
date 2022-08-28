import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const ListOfMarkers = () => {
  const [parkings, setParkings] = useState([]);
  
  const deleteParking = (parkingId: string) => {
    console.log(JSON.stringify({ id: parkingId }))
    fetch("http://localhost:4000/park", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: parkingId }),
    });
  }

  const getAllLocations = async () => {
    const response = await fetch("http://localhost:4000/park");
    const parkings = await response.json();
    console.log(parkings);
    setParkings(parkings);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return parkings === [] ? null : (
    <div>
      {parkings.map((parking: any) => (
        <Marker position={[parking.lat, parking.lon]} key={parking._id}>
          <Popup>
            <p>Model: {parking.carModel}</p>
            <p>Color: {parking.carColor}</p>
            <p>{parking.licensePlate}</p>
            <p>{parking.phoneNumber}</p>
            <p>Car leaves at: {parking.expireAt}</p>
            <button onClick={() => deleteParking(parking._id)}>Delete</button>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};
export default ListOfMarkers;

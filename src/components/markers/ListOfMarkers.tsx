import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const ListOfMarkers = (props: any) => {

  const deleteParking = async (parkingId: string) => {
   await fetch("http://localhost:4000/park", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: parkingId }),
    });
    props.getAllLocations();
  }



  useEffect(() => {
    props.getAllLocations();
  }, []);

  return props.parkings === [] ? null : (
    <div>
      {props.parkings.map((parking: any) => (
        <Marker position={[parking.lat, parking.lon]} key={parking._id}>
          <Popup>
            <p>Model: {parking.carModel}</p>
            <p>Color: {parking.carColor}</p>
            <p>{parking.licensePlate}</p>
            <p>{parking.phoneNumber}</p>
            <p>Car leaves at: {parking.localTime}</p>
            <button onClick={() => deleteParking(parking._id)}>Delete</button>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};
export default ListOfMarkers;

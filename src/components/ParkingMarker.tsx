import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const ParkingMarker: React.FC = () => {
  const postParking = async () => {
    const response = await fetch("http://localhost:4000/park", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: position.lat,
        lon: position.lng,
        carModel: "Toyota CH-R",
        carColor: "Red",
        licensePlate: "52-515-62",
        phoneNumber: "0549463394",
      }),
    });

    response.json().then((data) => {
      console.log(data);
    });
  };

  const [position, setPosition] = useState(null) as any;

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      console.log(position);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Do you want to add a new parking spot here? <br />{" "}
        <button onClick={postParking}>Confirm</button>
      </Popup>
    </Marker>
  );
};
export default ParkingMarker;

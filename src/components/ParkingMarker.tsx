import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const ParkingMarker: React.FC = () => {
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [minutesToLeave, setMinutesToLeave] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState(null) as any;

  const postParking = async () => {
    await fetch("http://localhost:4000/park", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: position.lat,
        lon: position.lng,
        carModel: carModel,
        carColor: carColor,
        minutesToLeave: Number(minutesToLeave),
        licensePlate: licensePlate,
        phoneNumber: phoneNumber,
      }),
    });
  };

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      console.log(position);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Do you want to add a new parking spot here? <br />
        <label htmlFor="carModel">Car Model:</label>
        <input
          type="text"
          name="carModel"
          value={carModel}
          placeholder="Enter car model"
          onChange={(e) => setCarModel(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="carColor">Car Color:</label>
        <input
          type="text"
          name="carColor"
          value={carColor}
          placeholder="Enter car color"
          onChange={(e) => setCarColor(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="minutesToLeave">Minutes To Leave:</label>
        <input
          type="text"
          name="minutesToLeave"
          value={minutesToLeave}
          placeholder="Enter minutes to leave"
          onChange={(e) => setMinutesToLeave(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="licensePlate">License Plate &#40;optional&#41;:</label>
        <input
          type="text"
          name="licensePlate"
          value={licensePlate}
          placeholder="Enter license plate"
          onChange={(e) => setLicensePlate(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="phoneNumber">Phone Number &#40;optional&#41;:</label>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          placeholder="Enter phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={postParking}>Confirm</button>
      </Popup>
    </Marker>
  );
};
export default ParkingMarker;

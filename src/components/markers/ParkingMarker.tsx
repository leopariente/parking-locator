import { LatLng } from "leaflet";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { AuthContext } from "../../context/auth-context";
import { myParkingIcon } from "../../icons/icons";
import "./ParkingMarker.scss";

//active marker, used to post the users parking spot
const ParkingMarker = (props: any) => {
  const auth = useContext(AuthContext);
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [minutesToLeave, setMinutesToLeave] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferences, setPreferences] = useState({
    carModel: "",
    carColor: "",
    licensePlate: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [position, setPosition] = useState({ lat: 0, lng: 0 } as LatLng);

  const marker = useRef(null) as any;
  const didMount = useRef(0);

  const postParking = async () => {
    if (Number(minutesToLeave) < 1) {
      setError("Minutes to leave must be above 0!");
    }
    if (carColor === "" || carModel === "") {
      setError("Car model and color inputs can't be empty!");
    } else {
      await fetch("http://localhost:4000/park", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
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
      marker.current.closePopup();
      setTimeout(() => props.getAllLocations(), 400);
    }
  };

  const savePreferences = async () => {
    const preferences = {
      carModel: carModel,
      carColor: carColor,
      licensePlate: licensePlate,
      phoneNumber: phoneNumber,
    };
    await fetch("http://localhost:4000/preferences", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        preferences,
      }),
    });
    setPreferences(preferences);
  };

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    //popup opens on user click, this function is used to not open the pop up on initial state ([0,0]).
    //Needs to wait for user click.
    if (didMount.current === 2) {
      marker.current.openPopup();
      setCarModel(preferences.carModel);
      setCarColor(preferences.carColor);
      setLicensePlate(preferences.licensePlate);
      setPhoneNumber(preferences.phoneNumber);
    } else {
      didMount.current++;
    }
    setError("");
    setMinutesToLeave("5");
  }, [position]);

  useEffect(() => {
    console.log("useEffect");
    if (auth.isLoggedIn) {
      fetch("http://localhost:4000/preferences", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        res.json().then((response) => {
          console.log(response);
          setPreferences(response);
        });
      });
    }
  }, [auth.isLoggedIn]);

  return position === null ? null : (
    <Marker position={position} ref={marker} icon={myParkingIcon}>
      {auth.isLoggedIn && (
        <Popup>
          <div className="parking-form">
            <h3>Do you want to add a parking spot here?</h3> <br />
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
              type="number"
              name="minutesToLeave"
              min={1}
              max={60}
              value={minutesToLeave}
              placeholder="Enter minutes to leave"
              onChange={(e) => setMinutesToLeave(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="licensePlate">
              License Plate &#40;optional&#41;:
            </label>
            <input
              type="text"
              name="licensePlate"
              value={licensePlate}
              placeholder="Enter license plate"
              onChange={(e) => setLicensePlate(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="phoneNumber">
              Phone Number &#40;optional&#41;:
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Enter phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="buttons">
              <button onClick={savePreferences} className="white">
                Save Preferences
              </button>
              <button onClick={postParking} className="blue">
                Confirm
              </button>
            </div>
            <h3 style={{ color: "red" }}>{error}</h3>
          </div>
        </Popup>
      )}{" "}
      {!auth.isLoggedIn && (
        <Popup>
          <p>Please log in to upload a parking spot!</p>
        </Popup>
      )}
    </Marker>
  );
};
export default ParkingMarker;

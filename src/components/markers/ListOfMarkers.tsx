import React, { useContext, useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { AuthContext } from '../../context/auth-context';
import { myParkingIcon, listParkingIcon } from '../../icons/icons';
import './ParkingMarker.scss';

// Gets all parkings and adds them to map as markers
const ListOfMarkers = (props: any) => {
  const auth = useContext(AuthContext);
  const deleteParking = async (parkingId: string) => {
    await fetch('https://parking-locator-server.herokuapp.com/park', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ id: parkingId }),
    });
    props.getAllLocations();
  };

  useEffect(() => {
    props.getAllLocations();
  }, []);

  return (
    <div>
      {props.parkings.map((parking: any) => (
        <Marker
          position={[parking.lat, parking.lon]}
          key={parking._id}
          icon={
            auth.isLoggedIn && auth.username === parking.username
              ? myParkingIcon
              : listParkingIcon
          }
        >
          <Popup>
            <div className="popup">
              <p>Model: {parking.carModel}</p>
              <p>Color: {parking.carColor}</p>
              <p>{parking.licensePlate}</p>
              <p>{parking.phoneNumber}</p>
              <p>Car leaves at: {parking.localTime}</p>
              {auth.isLoggedIn && auth.username === parking.username && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => deleteParking(parking._id)} className="button">
                  Delete
                  </button>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};
export default ListOfMarkers;

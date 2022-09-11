import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './PreferencesPage.scss';

// Preferences page, used to save user preferences
const PreferencesPage = () => {
  const navigate = useNavigate();
  const [carModel, setCarModel] = useState('');
  const [carColor, setCarColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const auth = useContext(AuthContext);

  const setPreferences = async () => {
    await fetch('https://parking-locator-server.herokuapp.com/preferences', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        preferences: {
          carModel: carModel,
          carColor: carColor,
          licensePlate: licensePlate,
          phoneNumber: phoneNumber,
        },
      }),
    });
    navigate('/');
  };

  return (
    <div className="preferences-form">
      <h1>Save your car settings for future uploads!</h1>
      <h3>Don't worry, you can always change it in the future</h3>
      <h3 className="bottom">You dont have to fill all fields</h3>
      <div>
        <label htmlFor="carModel">Car Model: &#40;optional&#41;</label>
        <input
          type="text"
          name="carModel"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          placeholder="Enter car model"
        />
        <br />
        <label htmlFor="carColor">Car Color: &#40;optional&#41;</label>
        <input
          type="text"
          name="carColor"
          value={carColor}
          onChange={(e) => setCarColor(e.target.value)}
          placeholder="Enter car color"
        />
        <br />
        <label htmlFor="licensePlate">License Plate &#40;optional&#41;:</label>
        <input
          type="text"
          name="licensePlate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="Enter license plate"
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number &#40;optional&#41;:</label>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      <button onClick={setPreferences}>Save preferences</button>
      <Link to={'/'}>Skip</Link>
    </div>
  );
};

export default PreferencesPage;

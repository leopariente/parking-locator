import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavBar.scss';

// Nav bar component using router dom links to navigate to different pages
const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="nav-bar">
      <Link to="/" style={{ color: 'white', marginRight: '10px' }}>
        Map
      </Link>
      {!auth.isLoggedIn && (
        <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>
          Login
        </Link>
      )}
      {auth.isLoggedIn && (
        <>
          <Link
            to="/preferences"
            style={{ color: 'white', marginRight: '10px' }}
          >
            Preferences
          </Link>
          <Link to="/" style={{ color: 'white' }} onClick={() => auth.logout()}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;

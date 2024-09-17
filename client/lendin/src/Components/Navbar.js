import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="nav-bar">
      <div className="nav-top">
        <div className="toggle" onClick={toggleMenu}>
          <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {!isLoggedIn && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                to={`/${localStorage.getItem('email')}/${role === '1' ? 'DsbBrw' : 'DsbInv'}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

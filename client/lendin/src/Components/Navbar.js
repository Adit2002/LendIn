import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import navLogo from '../images/navbar_logo.jpg'
import './css/Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')
  const role = localStorage.getItem('Role')
  // const isLoggedIn = false
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className="nav-bar">
      <div className="nav-top">
        <NavLink to="/" className="logo">
          <img src={navLogo} alt="Logo" />
          <h1 className="Logo_header">LendIn</h1>
        </NavLink>
        <div className="toggle">
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                to={`/${localStorage.getItem('Email')}/${
                  role == 1 ? 'DsbBrw' : 'DsbInv'
                }`}
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
  )
}

export default Navbar

import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import locationIcon from '../assets/location.svg';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <img className="img-navbar" src={locationIcon} alt="Concepcion del Uruguay" />
        <h1 className="title-navbar">Turismo Concepción</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/lugares">Lugares</a></li>
          <li><a href="/agregar-lugar">Agregar</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
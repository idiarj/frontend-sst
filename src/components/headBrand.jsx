import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CintilloAyacucho from '../assets/CintilloAyacucho.png';
import Cintillo2025 from '../assets/cintillo2025.png';

const navContainer = {
  backgroundColor: '#3c558a',
  padding: '10px 20px',
  width: '100vw',
  position: 'fixed',
  top: 42,
  left: 0,
  zIndex: 1100,
  marginTop: '79px',
  boxShadow: '0 2px 8px #0001',
  fontFamily: 'Inter, sans-serif',
};

const navList = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

const getLinkStyle = ({ isActive }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: isActive ? 'bold' : 'normal',
  textTransform: isActive ? 'uppercase' : 'none',
  marginRight: 30,
});

const HeadBrand = () => {
  const location = useLocation();
  // Rutas donde NO se debe mostrar el nav
  const hideNavRoutes = [
    '/login',
    '/register',
    '/recoverPassword',
    '/newPassword',
    '/VerifyIdCard'
  ];
  const shouldHideNav = hideNavRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: '#fff',
        margin: 0,
        padding: 0,
        zIndex: 1000,
        boxSizing: 'border-box',
        height: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}>
        <img 
          src={Cintillo2025} 
          alt="Cintillo Ayacucho" 
          style={{ width: '100vw', maxWidth: '100vw', height: 'auto', objectFit: 'cover', display: 'block', margin: 0, padding: 0, boxSizing: 'border-box' }}
        />
      </header>
      {!shouldHideNav && (
        <nav style={navContainer}>
          <ul style={navList}>
            <li>
              <NavLink to="/admin/devices" style={getLinkStyle}>
                Dispositivos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports" style={getLinkStyle}>
                Reportes
              </NavLink>
            </li>
            <li>
              <NavLink to="/plans" style={getLinkStyle}>
                Plan
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" style={getLinkStyle}>
                Gastos
              </NavLink>
            </li>
            <li style={{ marginLeft: 900 }}>
              <NavLink to="/settings" style={getLinkStyle}>
                Configuracion
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default HeadBrand;

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
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
        <li style={{ marginLeft: 'auto' }}>
          <NavLink to="/settings" style={getLinkStyle}>
            Configuracion
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Estilos generales
const navContainer = {
  backgroundColor: '#3c558a',
  padding: '10px 20px',
  position: 'relative',
};

const navList = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

// Función para aplicar estilos dinámicos según si está activo o no
const getLinkStyle = ({ isActive }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: isActive ? 'bold' : 'normal',
  textTransform: isActive ? 'uppercase' : 'none',
  marginRight: 30,
});

export default NavMenu;

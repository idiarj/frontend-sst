// components/RoleBasedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @param {boolean} isAuthenticated - ¿Está logueado el usuario?
 * @param {string} role - Rol actual del usuario (por ejemplo: 'admin', 'user')
 * @param {string[]} allowedRoles - Roles permitidos para acceder a esta ruta
 */
const RoleBasedRoute = ({ isAuthenticated, role, allowedRoles }) => {
  // No está logueado → redirige al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Logueado pero no autorizado → redirige a página de acceso denegado
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  // Autenticado y autorizado → renderiza las rutas hijas
  return <Outlet />;
};

export default RoleBasedRoute;

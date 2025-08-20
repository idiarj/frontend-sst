import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import mockReport from './mockReport.json';
import usuariosMock from '../../components/usuariosMock.json';
import { achetetepese } from '../../utils/fetch';

// ===== Helpers para descarga ZIP =====
function getFilenameFromCD(cd) {
  if (!cd) return null;
  // Soporta filename y filename* (RFC 5987)
  const match = /filename\*?=(?:UTF-8''|")?([^;"\n]+)/i.exec(cd);
  if (match && match[1]) return decodeURIComponent(match[1].replace(/"/g, ''));
  return null;
}

async function downloadBlobResponse(res, fallbackName = 'reportes.zip') {
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const cd = res.headers.get('Content-Disposition');
  a.href = url;
  a.download = getFilenameFromCD(cd) || fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Detecta base URL de API (Vite o CRA) o usa relativa
const API_BASE = "http://localhost:3000"
// =========================================================

const Settings = () => {
  const navigate = useNavigate();
  // UI states (sin lógica real)
  const [cintilloPreview, setCintilloPreview] = useState(null);
  const [cedulaBuscar, setCedulaBuscar] = useState('');
  const [resultados, setResultados] = useState([]);
  // Estados para agregar persona
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [numeroTlf, setNumeroTlf] = useState('');
  const [email, setEmail] = useState('');
  const [errorAgregar, setErrorAgregar] = useState('');

  // Estados para exportar reportes
  const [tipoReporte, setTipoReporte] = useState('semanal');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estadoReporte, setEstadoReporte] = useState('');
  const [cedulaUsuario, setCedulaUsuario] = useState('');

  console.log(fechaFin);
  console.log(fechaInicio);

  // (Puedes dejar este filtro local si aún lo necesitas en otra parte)
  const filtrarReportes = () => {
    let reportes = mockReport;
    if (cedulaUsuario.trim()) {
      reportes = reportes.filter(r => r.cedula.includes(cedulaUsuario.trim()));
    }
    if (estadoReporte) {
      reportes = reportes.filter(r => r.estado === estadoReporte);
    }
    if (fechaInicio && fechaFin) {
      reportes = reportes.filter(r => {
        const fecha = new Date(r.fecha);
        return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
      });
    }
    return reportes;
  };

  // ===== NUEVA LÓGICA: usar endpoint para descargar ZIP =====
  const exportarPDF = async () => {
    try {
      if (!fechaInicio || !fechaFin) {
        alert('Selecciona fecha de inicio y fecha fin');
        return;
      }
      // Validación simple de orden de fechas
      if (new Date(fechaInicio) > new Date(fechaFin)) {
        alert('La fecha de inicio no puede ser mayor que la fecha fin');
        return;
      }

      const qs = new URLSearchParams({
        from: fechaInicio, // YYYY-MM-DD
        to: fechaFin,      // YYYY-MM-DD
        mode: 'zip'
        // Si tu backend permite fallback para pruebas:
        // userId: '1'
      }).toString();

      const url = `${API_BASE}/reports/export?${qs}`.replace(/\/{2,}/g, '/').replace(':/', '://');
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include', // importante si usas cookies de sesión
        headers: { Accept: 'application/zip' }
      });

      if (res.status === 204) {
        alert('No hay reportes en el rango dado.');
        return;
      }
      if (!res.ok) {
        let msg = 'Error al exportar el ZIP';
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        alert(msg);
        return;
      }

      await downloadBlobResponse(res, `reportes_${fechaInicio}_${fechaFin}.zip`);
    } catch (e) {
      console.error(e);
      alert(e?.message || 'Error inesperado exportando ZIP');
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ height: 47 }} />
      {/* NavMenu ahora está dentro de HeadBrand */}
      <div style={{ display: 'flex', gap: 32, marginTop: 48, padding: '0 32px' }}>
        {/* Perfil lateral */}
        <div style={{ background: '#3b5998', color: '#fff', borderRadius: 24, padding: 24, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px #0001' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#3b5998"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z"/></svg>
          </div>
          <div style={{ fontWeight: 600, fontSize: 20 }}>Elena Pacheco</div>
          <div style={{ fontSize: 16, marginBottom: 16 }}>ci 12345678</div>
          <button
            style={{ background: 'none', color: '#fff', border: '1px solid #fff', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', marginTop: 8 }}
            onClick={() => navigate('/recoverpassword')}
          >
            Cambiar contraseña
          </button>
        </div>

        {/* Panel principal */}
        <div style={{ flex: 1, maxWidth: 700 }}>
          {/* Exportar reportes PDF (mantengo el mismo HTML, cambia la funcionalidad) */}
          <div style={{ marginBottom: 32, background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Exportar reportes en PDF</h3>
            <form style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }} onSubmit={e => { e.preventDefault(); exportarPDF(); }}>
              {/* <label>
                Tipo de reporte:
                <select value={tipoReporte} onChange={e => setTipoReporte(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }}>
                  <option value="semanal">Semanal</option>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>








































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































                  
                  <option value="personalizado">Personalizado</option>
                </select>
              </label> */}
              <label>
                Fecha inicio:
                <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }} />
              </label>
              <label>
                Fecha fin:
                <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }} />
              </label>
              <label>
                Estado:
                <select value={estadoReporte} onChange={e => setEstadoReporte(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }}>
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="resuelto">Resuelto</option>
                  <option value="en proceso">En proceso</option>
                </select>
              </label>
              <label>
                Cédula usuario:
                <input type="text" value={cedulaUsuario} onChange={e => setCedulaUsuario(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }} placeholder="Cédula..." />
              </label>
              <button type="submit" style={{ background: '#3b5998', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>Exportar PDF</button>
            </form>
          </div>

          {/* ... el resto del JSX permanece igual ... */}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Administrar permisos</h2>
            <button style={{ background: '#3b5998', color: '#fff', border: 'none', borderRadius: 16, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>cambiar cintillo</button>
          </div>
          <div style={{ margin: '38px 0 0 0', maxWidth: 600 }}>
            <label style={{ fontWeight: 500 }}>búsqueda por filtro cédula de identidad</label>
            <form
              style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}
              onSubmit={e => {
                e.preventDefault();
                const res = usuariosMock.filter(u => u.cedula.includes(cedulaBuscar));
                setResultados(res);
              }}
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={cedulaBuscar}
                onChange={e => setCedulaBuscar(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
              />
              <button type="submit" style={{ marginLeft: 8, background: '#3b5998', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>
            {cedulaBuscar === '' || resultados.length === 0 ? (
              cedulaBuscar === '' ? (
                <div style={{ marginTop: 40, textAlign: 'center', color: '#b0b0b0', fontSize: 28, fontWeight: 400 }}>
                  Busca una cedula de identidad
                </div>
              ) : (
                <div style={{ marginTop: 40, textAlign: 'center', color: '#b0b0b0', fontSize: 24, fontWeight: 400 }}>
                  No se encontraron resultados
                </div>
              )
            ) : (
              <div style={{ marginTop: 32, background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 16, minWidth: 700 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                  <thead>
                    <tr style={{ background: '#f0f2f5' }}>
                      <th style={{ padding: 12, textAlign: 'left', width: 160 }}>Cédula de identidad</th>
                      <th style={{ padding: 12, textAlign: 'left', width: 260 }}>Nombre y Apellido</th>
                      <th style={{ padding: 12, textAlign: 'left', width: 100 }}>Rol</th>
                      <th style={{ padding: 12, width: 120 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map(u => (
                      <tr key={u.cedula}>
                        <td style={{ padding: 12 }}>{u.cedula}</td>
                        <td style={{ padding: 12 }}>{u.nombre}</td>
                        <td style={{ padding: 12 }}>{u.rol}</td>
                        <td style={{ padding: 12, textAlign: 'right' }}>
                          <button style={{ background: '#3b5998', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 32px', fontWeight: 500, cursor: 'pointer', fontSize: 16, whiteSpace: 'nowrap' }}>
                            Dar permiso
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Agregar persona */}
          <div style={{ marginTop: 32, maxWidth: 500 }}>
            <h3 style={{ marginBottom: 12 }}>Agregar persona</h3>
            <form
              style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}
              onSubmit={async (e) => {
                e.preventDefault();
                if (!nombre.trim() || !apellido.trim() || !cedula.trim() || !email.trim()) {
                  setErrorAgregar('Completa todos los campos.');
                  return;
                }

                try {
                  const response = await achetetepese.post({
                    endpoint: `/user/createUser`,
                    body: {
                      first_name: nombre,
                      last_name: apellido,
                      id_cardNumber: cedula,
                      phone_number: numeroTlf,
                      email,
                    }
                  })
                } catch (error) {
                  // Manejo de error opcional
                }
                setErrorAgregar('');
                setNombre('');
                setApellido('');
                setCedula('');
              }}
            >
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                required
              />
              <input
                type="text"
                placeholder="Numero telefonico. Ejp: 414-6503436"
                value={numeroTlf}
                onChange={e => setNumeroTlf(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                required
              />
              <input
                type="text"
                placeholder="Cédula"
                value={cedula}
                onChange={e => setCedula(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                required
              />
              <button
                type="submit"
                style={{ background: '#3b5998', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 500 }}
              >
                Agregar
              </button>
              {errorAgregar && <span style={{ color: errorAgregar.includes('correctamente') ? 'green' : 'red', fontSize: 15, marginLeft: 8 }}>{errorAgregar}</span>}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;

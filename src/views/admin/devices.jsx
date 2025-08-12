 import React, { useState } from 'react';
import HeadBrand from '../../components/headBrand';
import Report from '../../components/report';
import mockData from './mockdata.json';
import { FaBuilding, FaLaptop } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

const containerStyle = { width: '100%', height: '400px' };

const defaultCenter = { lat: 10.6545, lng: -71.6406 };


function Devices() {
  // Nueva estructura: una sola sede con departamentos
  const departamentos = [
    'RRHH',
    'PPyo',
    'Evaluacion y Certificacion',
    'Administracion',
    'Legal',
    'Medicion Fiscal',
    'Osti'
  ];

  // Simulación de dispositivos por departamento
  const mockDepartamentos = departamentos.map((dep, idx) => ({
    id: idx + 1,
    nombre: dep,
    dispositivos: [
      { id: `${dep}-1`, nombre: `PC ${dep} 1` },
      { id: `${dep}-2`, nombre: `PC ${dep} 2` }
    ]
  }));

  const sedeUnica = {
    id: 1,
    nombre: 'Sede Principal',
    departamentos: mockDepartamentos
  };

  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [selectedDispositivo, setSelectedDispositivo] = useState(null);

  const handleDepartamentoClick = (dep) => {
    setSelectedDepartamento(dep);
    setSelectedDispositivo(null);
  };

  const handleDispositivoClick = (dispositivo) => {
    setSelectedDispositivo(dispositivo);
  };

  // Estilos mejorados
  const styles = {
    page: {
      fontFamily: 'Inter, sans-serif',
      background: 'linear-gradient(120deg, #e0e7ff 0%, #f5f5f5 100%)',
      minHeight: '100vh',
    },
    main: {
      display: 'flex',
      padding: 32,
      gap: 32,
      maxWidth: 1400,
      margin: '0 auto',
    },
    sidebar: {
      width: 240,
      background: 'linear-gradient(120deg, #183d6a 60%, #2e4a7d 100%)',
      color: '#fff',
      padding: 18,
      borderRadius: 16,
      boxShadow: '0 4px 16px #183d6a22',
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    sedeBtn: {
      background: 'rgba(255,255,255,0.08)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '8px 12px',
      margin: '6px 0',
      fontWeight: 'bold',
      fontSize: 16,
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    sedeBtnHover: {
      background: 'rgba(255,255,255,0.18)',
    },
    oficina: {
      marginLeft: 10,
      marginTop: 6,
      fontSize: 15,
      fontWeight: 500,
    },
    dispositivoBtn: {
      background: '#fff',
      color: '#183d6a',
      border: 'none',
      borderRadius: 6,
      padding: '4px 10px',
      margin: '4px 0',
      fontSize: 13,
      cursor: 'pointer',
      transition: 'background 0.2s',
      boxShadow: '0 1px 4px #183d6a11',
    },
    dispositivoBtnHover: {
      background: '#e0e7ff',
    },
    diagramPanel: {
      flex: 1,
      padding: 28,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 16px #183d6a22',
      minHeight: 500,
    },
    diagramWrap: {
      display: 'flex',
      gap: 32,
      flexWrap: 'wrap',
    },
    sedeCard: {
      background: 'linear-gradient(120deg, #e0e7ff 60%, #fff 100%)',
      borderRadius: 12,
      boxShadow: '0 2px 8px #183d6a11',
      padding: 18,
      minWidth: 220,
      marginBottom: 18,
    },
    sedeTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
      color: '#183d6a',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    oficinaTitle: {
      fontWeight: 600,
      fontSize: 16,
      margin: '10px 0 4px 0',
      color: '#2e4a7d',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    dispositivo: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginLeft: 18,
      marginBottom: 4,
      cursor: 'pointer',
      color: '#183d6a',
      fontWeight: 500,
      fontSize: 14,
      borderRadius: 6,
      padding: '2px 6px',
      transition: 'background 0.2s',
    },
    dispositivoHover: {
      background: '#e0e7ff',
    },
    reportPanel: {
      flex: '0 1 370px',
      minWidth: 320,
      minHeight: 500,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 16px #183d6a22',
      padding: 28,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      height: '100%',
      boxSizing: 'border-box',
    },
    emptyReport: {
      textAlign: 'center',
      color: '#183d6a',
      fontWeight: 500,
      fontSize: 18,
    },
  };

  // Para hover en botones, usar useState temporal o librería, pero aquí lo hacemos simple con inline events
  const [hoverSede, setHoverSede] = useState(null);
  const [hoverDispositivo, setHoverDispositivo] = useState(null);

  return (
    <div style={styles.page}>
      <HeadBrand />
      <div style={{ height: 47 }} />
      {/* NavMenu ahora está dentro de HeadBrand */}
      <div style={{ ...styles.main, marginTop: 20 }}>
        {/* Menú lateral izquierdo: departamentos */}
        <div style={styles.sidebar}>
          <strong style={{ fontSize: 20, marginBottom: 12 }}>Departamentos</strong>
          {sedeUnica.departamentos.map((dep) => (
            <div key={dep.id}>
              <button
                onClick={() => handleDepartamentoClick(dep)}
                style={hoverSede === dep.id ? { ...styles.sedeBtn, ...styles.sedeBtnHover } : styles.sedeBtn}
                onMouseEnter={() => setHoverSede(dep.id)}
                onMouseLeave={() => setHoverSede(null)}
              >
                {dep.nombre}
              </button>
              <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                {dep.dispositivos.map((dev) => (
                  <li key={dev.id}>
                    <button
                      onClick={() => handleDispositivoClick(dev)}
                      style={hoverDispositivo === dev.id ? { ...styles.dispositivoBtn, ...styles.dispositivoBtnHover, display: 'flex', alignItems: 'center', gap: 6 } : { ...styles.dispositivoBtn, display: 'flex', alignItems: 'center', gap: 6 }}
                      onMouseEnter={() => setHoverDispositivo(dev.id)}
                      onMouseLeave={() => setHoverDispositivo(null)}
                    >
                      <FaLaptop size={14} /> {dev.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Centro: contenedor de sede y departamentos */}
        <div style={styles.diagramPanel}>
          <div style={{
            ...styles.sedeCard,
            width: '80%',
            maxWidth: 700,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            margin: '0 auto',
            background: "#e0e7ff",
          }}>
            <div style={{ ...styles.sedeTitle, fontSize: 20, marginBottom: 12 }}>
              <MdLocationCity size={26} /> {sedeUnica.nombre}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              {sedeUnica.departamentos.map((dep) => (
                <div key={dep.id} style={{
                  background: '#fff',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px #183d6a11',
                  padding: 10,
                  minWidth: 140,
                  maxWidth: 180,
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 7,
                }}>
                  <div style={{...styles.oficinaTitle, fontSize: 14}}><FaBuilding size={16} /> {dep.nombre}</div>
                  {dep.dispositivos.map((dev) => (
                    <div
                      key={dev.id}
                      onClick={() => handleDispositivoClick(dev)}
                      style={hoverDispositivo === dev.id ? { ...styles.dispositivo, ...styles.dispositivoHover, fontSize: 12, padding: '2px 4px' } : { ...styles.dispositivo, fontSize: 12, padding: '2px 4px' }}
                      onMouseEnter={() => setHoverDispositivo(dev.id)}
                      onMouseLeave={() => setHoverDispositivo(null)}
                    >
                      <FaLaptop size={12} /> {dev.nombre}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho: Reporte personalizado solo con los campos requeridos */}
        <div style={styles.reportPanel}>
          {selectedDispositivo ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, width: '100%'}}>
              <h2 style={{color: '#183d6a', fontWeight: 700, fontSize: 22, marginBottom: 8}}>Reporte de dispositivo</h2>
              <div>
                <strong>Nombre:</strong> {selectedDispositivo.usuario || selectedDispositivo.nombre || '-'}
              </div>
              <div>
                <strong>Cargo:</strong> {selectedDispositivo.cargo || '-'}
              </div>
              <div>
                <strong>Departamento:</strong> {selectedDepartamento ? selectedDepartamento.nombre : '-'}
              </div>
              <div>
                <strong>Cédula:</strong> {selectedDispositivo.cedula || '-'}
              </div>
              <div>
                <strong>Descripción del problema:</strong>
                <div style={{background: '#f5f5f5', borderRadius: 8, padding: 10, marginTop: 4}}>
                  {selectedDispositivo.observaciones || '-'}
                </div>
              </div>
              <div>
                <strong>Técnico de soporte:</strong> {
                  selectedDispositivo.tecnico ||
                  selectedDispositivo.tecnico_soporte ||
                  (selectedDispositivo.reporte && selectedDispositivo.reporte.tecnico) ||
                  '-'
                }
              </div>
              <div>
                <strong>Estado del reporte:</strong> {selectedDispositivo.estado || '-'}
              </div>
            </div>
          ) : (
            <div style={styles.emptyReport}>
              <h3>Seleccione un dispositivo</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devices;

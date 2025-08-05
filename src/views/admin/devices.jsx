 import React, { useState } from 'react';
import HeadBrand from '../../components/headBrand';
import NavMenu from '../../components/navMenu';
import Report from '../../components/report';
import mockData from './mockData.json';
import { FaBuilding, FaLaptop } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

const containerStyle = { width: '100%', height: '400px' };

const defaultCenter = { lat: 10.6545, lng: -71.6406 };


function Devices() {
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedDispositivo, setSelectedDispositivo] = useState(null);
  const [showDiagram, setShowDiagram] = useState(false);

  const handleSedeClick = (sede) => {
    setSelectedSede(sede);
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
      <NavMenu />
      <div style={styles.main}>
        {/* Menú lateral izquierdo */}
        <div style={styles.sidebar}>
          <strong style={{ fontSize: 20, marginBottom: 12 }}>Sedes</strong>
          {mockData.sedes.map((sede) => (
            <div key={sede.id}>
              <button
                onClick={() => handleSedeClick(sede)}
                style={hoverSede === sede.id ? { ...styles.sedeBtn, ...styles.sedeBtnHover } : styles.sedeBtn}
                onMouseEnter={() => setHoverSede(sede.id)}
                onMouseLeave={() => setHoverSede(null)}
              >
                {sede.nombre}
              </button>
              <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                {sede.oficinas.map((ofi) => (
                  <li key={ofi.id} style={styles.oficina}>
                    {ofi.nombre}
                    <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                      {ofi.dispositivos.map((dev) => (
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
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Centro: solo diagrama, sin mapa */}
        <div style={styles.diagramPanel}>
          <div style={styles.diagramWrap}>
            {mockData.sedes.map((sede) => (
              <div key={sede.id} style={styles.sedeCard}>
                <div style={styles.sedeTitle}><MdLocationCity size={28} /> {sede.nombre}</div>
                {sede.oficinas.map((ofi) => (
                  <div key={ofi.id}>
                    <div style={styles.oficinaTitle}><FaBuilding size={20} /> {ofi.nombre}</div>
                    {ofi.dispositivos.map((dev) => (
                      <div
                        key={dev.id}
                        onClick={() => handleDispositivoClick(dev)}
                        style={hoverDispositivo === dev.id ? { ...styles.dispositivo, ...styles.dispositivoHover } : styles.dispositivo}
                        onMouseEnter={() => setHoverDispositivo(dev.id)}
                        onMouseLeave={() => setHoverDispositivo(null)}
                      >
                        <FaLaptop size={16} /> {dev.nombre}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
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
                <strong>Área:</strong> {selectedDispositivo.departamento || '-'}
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
            (() => {
              try {
                const mockReport = require('./mockReport.json').reporte;
                return (
                  <div style={{display: 'flex', flexDirection: 'column', gap: 16, width: '100%'}}>
                    <h2 style={{color: '#183d6a', fontWeight: 700, fontSize: 22, marginBottom: 8}}>Reporte de dispositivo</h2>
                    <div>
                      <strong>Nombre:</strong> {mockReport.datos_personales.nombre || '-'}
                    </div>
                    <div>
                      <strong>Cargo:</strong> {mockReport.datos_personales.cargo || '-'}
                    </div>
                    <div>
                      <strong>Área:</strong> {mockReport.datos_personales.oficina || '-'}
                    </div>
                    <div>
                      <strong>Cédula:</strong> {mockReport.datos_personales.cedula || '-'}
                    </div>
                    <div>
                      <strong>Descripción del problema:</strong>
                      <div style={{background: '#f5f5f5', borderRadius: 8, padding: 10, marginTop: 4}}>
                        {mockReport.observaciones || '-'}
                      </div>
                    </div>
                    <div>
                      <strong>Técnico de soporte:</strong> {mockReport.tecnico || '-'}
                    </div>
                    <div>
                      <strong>Estado del reporte:</strong> {mockReport.estado || '-'}
                    </div>
                  </div>
                );
              } catch (e) {
                return (
                  <div style={styles.emptyReport}>
                    <h3>Seleccione un dispositivo</h3>
                  </div>
                );
              }
            })()
          )}
        </div>
      </div>
    </div>
  );
}

export default Devices;

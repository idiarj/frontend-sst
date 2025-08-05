import React, { useState } from 'react';
import NavMenu from '../../components/navMenu';
import mockData from './mockData.json';
import { FaBuilding, FaLaptop } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';

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
  mainPanel: {
    flex: 1,
    padding: 28,
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 16px #183d6a22',
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planPanel: {
    flex: '0 1 370px',
    minWidth: 320,
    minHeight: 500,
    background: '#f3f3f3',
    borderRadius: 16,
    boxShadow: '0 4px 16px #183d6a22',
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    alignItems: 'stretch',
    justifyContent: 'stretch',
    height: '100%',
    boxSizing: 'border-box',
  },
  input: {
    borderRadius: 10,
    border: '1px solid #d1d5db',
    padding: '10px 14px',
    fontSize: 16,
    marginBottom: 12,
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    borderRadius: 10,
    border: '1px solid #d1d5db',
    padding: '10px 14px',
    fontSize: 16,
    marginBottom: 12,
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
  },
  button: {
    background: '#2e4a7d',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    padding: '12px 32px',
    fontWeight: 600,
    fontSize: 18,
    cursor: 'pointer',
    marginTop: 18,
    boxShadow: '0 2px 8px #183d6a22',
    transition: 'background 0.2s',
  },
  title: {
    fontWeight: 700,
    fontSize: 22,
    color: '#183d6a',
    marginBottom: 18,
  },
  subtitle: {
    fontWeight: 600,
    fontSize: 18,
    color: '#2e4a7d',
    marginBottom: 10,
  },
};


const tecnicos = [
  'Dagnis',
  'Pedro',
  'Ana',
  'Luis',
];

const Plans = () => {
  const [selectedOficina, setSelectedOficina] = useState(null);
  const [tipoPlan, setTipoPlan] = useState('Preventivo');
  const [infoPlan, setInfoPlan] = useState('');
  const [tecnico, setTecnico] = useState(tecnicos[0]);
  const [hoverOficina, setHoverOficina] = useState(null);

  // Iconos iguales a Devices
  const buildingIcon = <FaBuilding size={20} style={{marginRight: 6}} />;
  const sedeIcon = <MdLocationCity size={28} style={{marginRight: 8}} />;
  const deviceIcon = <FaLaptop size={16} style={{marginRight: 4}} />;

  // Dispositivos seleccionados
  const dispositivosSeleccionados = selectedOficina ? selectedOficina.dispositivos : [];

  return (
    <div style={styles.page}>
      <div style={{ height: 47 }} />
      <NavMenu />
      <div style={styles.main}>
        {/* Sidebar igual a Devices */}
        <div style={styles.sidebar}>
          <strong style={{ fontSize: 20, marginBottom: 12 }}>Sedes</strong>
          {mockData.sedes.map((sede) => (
            <div key={sede.id}>
              <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{sede.nombre}</div>
              <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                {sede.oficinas.map((ofi) => (
                  <li key={ofi.id} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setSelectedOficina(ofi)}
                      style={hoverOficina === ofi.id ? { background: '#e0e7ff', color: '#183d6a', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer' } : { background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer' }}
                      onMouseEnter={() => setHoverOficina(ofi.id)}
                      onMouseLeave={() => setHoverOficina(null)}
                    >
                      {ofi.nombre}
                    </button>
                    <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                      {ofi.dispositivos.map((dev) => (
                        <li key={dev.id} style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>
                          {dev.nombre}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Panel central: sedes, oficinas y dispositivos con iconos */}
        <div style={styles.mainPanel}>
          <div style={{display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', width: '100%'}}>
            {mockData.sedes.map((sede) => (
              <div key={sede.id} style={{ background: '#e0e7ff', borderRadius: 12, boxShadow: '0 2px 8px #183d6a11', padding: 18, minWidth: 220, marginBottom: 18 }}>
                <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, color: '#183d6a', display: 'flex', alignItems: 'center', gap: 8 }}>{sedeIcon} {sede.nombre}</div>
                {sede.oficinas.map((ofi) => (
                  <div key={ofi.id}>
                    <div style={{ fontWeight: 600, fontSize: 16, margin: '10px 0 4px 0', color: '#2e4a7d', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => setSelectedOficina(ofi)}
                        style={selectedOficina && selectedOficina.id === ofi.id ? { background: '#e0e7ff', color: '#183d6a', border: 'none', borderRadius: 8, padding: '4px 10px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', marginRight: 6, display: 'flex', alignItems: 'center', gap: 6 } : { background: 'rgba(255,255,255,0.08)', color: '#2e4a7d', border: 'none', borderRadius: 8, padding: '4px 10px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', marginRight: 6, display: 'flex', alignItems: 'center', gap: 6 }}
                      >{buildingIcon} {ofi.nombre}</button>
                    </div>
                    <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginLeft: 18, marginBottom: 8}}>
                      {ofi.dispositivos.map((dev) => (
                        <div key={dev.id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: selectedOficina && selectedOficina.id === ofi.id ? '#e0e7ff' : '#fff', color: '#183d6a', fontWeight: 500, fontSize: 14, borderRadius: 6, padding: '2px 6px', boxShadow: '0 1px 4px #183d6a11' }}>
                          {deviceIcon} {dev.nombre}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button style={{ ...styles.button, background: '#2e4a7d', width: 340, marginTop: 32 }}>Ver Historial de planes anteriores</button>
          <div style={{ background: '#e5e7eb', borderRadius: 18, padding: 32, width: 340, textAlign: 'center', color: '#888', fontWeight: 500, fontSize: 22, marginTop: 24 }}>
            No hay planes previos
          </div>
        </div>

        {/* Panel derecho: Crear plan de mantenimiento */}
        <div style={styles.planPanel}>
          <div style={styles.title}>CREAR PLAN DE MANTENIMIENTO</div>
          <div style={styles.subtitle}>{selectedOficina ? selectedOficina.nombre : 'Seleccione una oficina'}</div>
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, color: '#2e4a7d' }}>TIPO DE PLAN</label>
            <select style={styles.select} value={tipoPlan} onChange={e => setTipoPlan(e.target.value)}>
              <option value="Preventivo">Preventivo</option>
              <option value="Correctivo">Correctivo</option>
            </select>
          </div>
          <div>
            <textarea
              style={{ ...styles.input, minHeight: 120, resize: 'vertical' }}
              placeholder={selectedOficina ? `Información de plan para ${selectedOficina.dispositivos.map(d => d.nombre).join(', ')}` : "Información de plan..."}
              value={infoPlan}
              onChange={e => setInfoPlan(e.target.value)}
              disabled={!selectedOficina}
            />
          </div>
          <div>
            <select style={styles.select} value={tecnico} onChange={e => setTecnico(e.target.value)} disabled={!selectedOficina}>
              {tecnicos.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button style={styles.button} disabled={!selectedOficina}>GENERAR</button>
          {selectedOficina && (
            <div style={{marginTop: 18, fontSize: 15, color: '#2e4a7d'}}>
              <strong>Dispositivos incluidos en el plan:</strong>
              <ul style={{marginTop: 6}}>
                {selectedOficina.dispositivos.map(dev => (
                  <li key={dev.id}>{dev.nombre}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;

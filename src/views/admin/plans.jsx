import React, { useState } from 'react';
// import NavMenu eliminado, ahora está en HeadBrand
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




// Nueva estructura: una sola sede con departamentos y dispositivos
const departamentos = [
  {
    nombre: 'RRHH',
    dispositivos: [
      { id: 'rrhh-1', nombre: 'Laptop RRHH' },
      { id: 'rrhh-2', nombre: 'Impresora RRHH' }
    ]
  },
  {
    nombre: 'PPyo',
    dispositivos: [
      { id: 'ppyo-1', nombre: 'PC PPyo' },
      { id: 'ppyo-2', nombre: 'Scanner PPyo' }
    ]
  },
  {
    nombre: 'Evaluacion y Certificacion',
    dispositivos: [
      { id: 'eval-1', nombre: 'Tablet Evaluacion' },
      { id: 'eval-2', nombre: 'Monitor Certificacion' }
    ]
  },
  {
    nombre: 'Administracion',
    dispositivos: [
      { id: 'admin-1', nombre: 'PC Administracion' },
      { id: 'admin-2', nombre: 'Router Administracion' }
    ]
  },
  {
    nombre: 'Legal',
    dispositivos: [
      { id: 'legal-1', nombre: 'Laptop Legal' },
      { id: 'legal-2', nombre: 'Impresora Legal' }
    ]
  },
  {
    nombre: 'Medicion Fiscal',
    dispositivos: [
      { id: 'mf-1', nombre: 'PC Medicion Fiscal' },
      { id: 'mf-2', nombre: 'Scanner Medicion Fiscal' }
    ]
  },
  {
    nombre: 'Osti',
    dispositivos: [
      { id: 'osti-1', nombre: 'Tablet Osti' },
      { id: 'osti-2', nombre: 'Router Osti' }
    ]
  }
];

const tecnicos = [
  'Dagnis',
  'Pedro',
  'Ana',
  'Luis',
];

const Plans = () => {
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [tipoPlan, setTipoPlan] = useState('Preventivo');
  const [infoPlan, setInfoPlan] = useState('');
  const [tecnico, setTecnico] = useState(tecnicos[0]);
  const [hoverDepartamento, setHoverDepartamento] = useState(null);
  const [planes, setPlanes] = useState([]);

  // Iconos iguales a Devices
  const buildingIcon = <FaBuilding size={20} style={{marginRight: 6}} />;
  const sedeIcon = <MdLocationCity size={28} style={{marginRight: 8}} />;
  const deviceIcon = <FaLaptop size={16} style={{marginRight: 4}} />;

  // Dispositivos seleccionados (si aplica)
  // const dispositivosSeleccionados = selectedDepartamento ? selectedDepartamento.dispositivos : [];

  // Agrupación de departamentos
  const zonaCentral4 = departamentos.slice(0, 4);
  const otrosDepartamentos = departamentos.slice(4);

  return (
    <div style={styles.page}>
      <div style={{ height: 47 }} />
      {/* NavMenu ahora está dentro de HeadBrand */}
      <div style={{ ...styles.main, marginTop: 20 }}>
        {/* Sidebar igual a Devices */}
        <div style={styles.sidebar}>
          <strong style={{ fontSize: 20, marginBottom: 12 }}>Departamentos</strong>
          <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
            {departamentos.map((dep, idx) => (
              <li key={dep.nombre} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setSelectedDepartamento(dep)}
                  style={hoverDepartamento === dep.nombre ? { background: '#e0e7ff', color: '#183d6a', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer' } : { background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 12px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer' }}
                  onMouseEnter={() => setHoverDepartamento(dep.nombre)}
                  onMouseLeave={() => setHoverDepartamento(null)}
                >
                  {dep.nombre}
                </button>
                <ul style={{ marginLeft: 0, paddingLeft: 10 }}>
                  {dep.dispositivos.map(dev => (
                    <li key={dev.id} style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>
                      {dev.nombre}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Panel central: departamentos y historial de planes */}
        <div style={styles.mainPanel}>
          {/* Cuadro único de departamentos con encabezado y subtítulo */}
          <div style={{ background: '#e0e7ff', borderRadius: 18, padding: '32px 0 24px 0', marginBottom: 24, width: '100%', maxWidth: 700, boxShadow: '0 2px 12px #183d6a22', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Encabezado centrado */}
            <div style={{ fontWeight: 'bold', fontSize: 24, color: '#183d6a', marginBottom: 8, letterSpacing: 1, textAlign: 'center', width: '100%' }}>{sedeIcon} Sede Administrativa</div>
            {/* Subtítulo alineado a la izquierda */}
            <div style={{ fontWeight: 600, fontSize: 18, color: '#2e4a7d', marginBottom: 18, alignSelf: 'flex-start', marginLeft: 38 }}>Departamentos</div>
            <div style={{ display: 'flex', gap: 32, width: '100%', justifyContent: 'center' }}>
              {/* Columna 1 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {zonaCentral4.map(dep => (
                  <button
                    key={dep.nombre}
                    onClick={() => setSelectedDepartamento(dep)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: '#fff',
                      color: '#183d6a',
                      fontWeight: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? 700 : 500,
                      fontSize: 14,
                      borderRadius: 6,
                      padding: '10px 18px',
                      boxShadow: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? '0 2px 8px #183d6a33' : '0 1px 4px #183d6a11',
                      border: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? '2px solid #2e4a7d' : 'none',
                      cursor: 'pointer',
                      marginBottom: 12,
                      width: '90%',
                      transition: 'background 0.2s, border 0.2s'
                    }}
                  >
                    {buildingIcon} {dep.nombre}
                  </button>
                ))}
              </div>
              {/* Columna 2 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {otrosDepartamentos.map(dep => (
                  <button
                    key={dep.nombre}
                    onClick={() => setSelectedDepartamento(dep)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: '#fff',
                      color: '#183d6a',
                      fontWeight: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? 700 : 500,
                      fontSize: 14,
                      borderRadius: 6,
                      padding: '10px 18px',
                      boxShadow: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? '0 2px 8px #183d6a33' : '0 1px 4px #183d6a11',
                      border: selectedDepartamento && selectedDepartamento.nombre === dep.nombre ? '2px solid #2e4a7d' : 'none',
                      cursor: 'pointer',
                      marginBottom: 12,
                      width: '90%',
                      transition: 'background 0.2s, border 0.2s'
                    }}
                  >
                    {buildingIcon} {dep.nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* ...existing code... historial de planes */}
          <div style={{ marginTop: 32, width: 340 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#2e4a7d', marginBottom: 12 }}>Historial de planes</div>
            {planes.length === 0 ? (
              <div style={{ background: '#e5e7eb', borderRadius: 18, padding: 32, textAlign: 'center', color: '#888', fontWeight: 500, fontSize: 22 }}>
                No hay planes previos
              </div>
            ) : (
              <div style={{ background: '#e5e7eb', borderRadius: 18, padding: 18 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {planes.map((plan, idx) => (
                    <li key={idx} style={{ marginBottom: 18, borderBottom: '1px solid #d1d5db', paddingBottom: 10 }}>
                      <strong>{plan.departamento}</strong> <span style={{ color: '#2e4a7d', fontWeight: 500 }}>({plan.tipoPlan})</span><br/>
                      <span style={{ fontSize: 15 }}>Técnico: {plan.tecnico}</span><br/>
                      <span style={{ fontSize: 15 }}>Info: {plan.infoPlan}</span>
                      <div style={{ fontSize: 14, marginTop: 6 }}>
                        <strong>Dispositivos:</strong> {plan.dispositivos.map(dev => dev.nombre).join(', ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho: Crear plan de mantenimiento */}
        <div style={styles.planPanel}>
          <div style={styles.title}>CREAR PLAN DE MANTENIMIENTO</div>
          <div style={styles.subtitle}>{selectedDepartamento ? selectedDepartamento.nombre : 'Seleccione un departamento'}</div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!selectedDepartamento) return;
              setPlanes(prev => [
                ...prev,
                {
                  departamento: selectedDepartamento.nombre,
                  dispositivos: selectedDepartamento.dispositivos,
                  tipoPlan,
                  infoPlan,
                  tecnico
                }
              ]);
              setInfoPlan('');
            }}
          >
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
                placeholder={selectedDepartamento ? `Información de plan para ${selectedDepartamento.nombre}` : "Información de plan..."}
                value={infoPlan}
                onChange={e => setInfoPlan(e.target.value)}
                disabled={!selectedDepartamento}
              />
            </div>
            <div>
              <select style={styles.select} value={tecnico} onChange={e => setTecnico(e.target.value)} disabled={!selectedDepartamento}>
                {tecnicos.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button type="submit" style={styles.button} disabled={!selectedDepartamento}>GENERAR</button>
          </form>
          {selectedDepartamento && (
            <div style={{marginTop: 18, fontSize: 15, color: '#2e4a7d'}}>
              <strong>Dispositivos incluidos en el plan:</strong>
              <ul style={{marginTop: 6}}>
                {selectedDepartamento.dispositivos.map(dev => (
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

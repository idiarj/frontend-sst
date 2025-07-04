import React, { useState } from 'react';
import HeadBrand from '../../components/headBrand';
import logoMini from '../../assets/logoMini.png';

function ReportDetails() {
  const [status, setStatus] = useState('PENDIENTE');  // Estado por defecto
  const [responseLevel, setResponseLevel] = useState(''); // Sin selección por defecto

  const [report, setReport] = useState({
    nombre: '',
    cedula: '',
    cargo: '',
    oficina: '',
    dispositivo: '',
    observaciones: '',
    solucion: '',
    diagnostico: '',
    tecnico: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  const estados = ['PENDIENTE', 'EN PROCESO', 'RECHAZADO', 'RESUELTO'];
  const niveles = ['ALTA', 'MEDIA', 'BAJA'];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeadBrand />
      <div style={{ padding: '120px 20px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>ENTRADA DE SOLICITUD DE REPORTES</h2>

        <div style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: 30
        }}>
          {/* Report Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontWeight: 'bold' }}>REPORTE #001</div>
            <input type="date" name="fecha" style={inputStyle} />
          </div>

          {/* Usuario Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
            {['nombre', 'cedula', 'cargo', 'oficina', 'dispositivo'].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={report[field]}
                onChange={handleChange}
                style={{ ...inputStyle, flex: '1 1 200px' }}
              />
            ))}
          </div>

          {/* Observaciones */}
          <Section title="Observaciones" name="observaciones" value={report.observaciones} onChange={handleChange} />
          <Section title="Solución" name="solucion" value={report.solucion} onChange={handleChange} />
          <Section title="Diagnóstico" name="diagnostico" value={report.diagnostico} onChange={handleChange} />

          {/* Estado del reporte */}
          <div style={{ margin: '20px 0' }}>
            <div style={labelStyle}>Seleccionar estado del reporte</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {estados.map(e => (
                <button
                  key={e}
                  onClick={() => setStatus(e)}
                  style={{
                    ...chipStyle,
                    backgroundColor: status === e ? '#2f4b8b' : '#eee',
                    color: status === e ? '#fff' : '#333'
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Nivel de respuesta */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Nivel de respuesta</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {niveles.map(n => (
                <button
                  key={n}
                  onClick={() => setResponseLevel(n)}
                  style={{
                    ...chipStyle,
                    backgroundColor: responseLevel === n ? '#2f4b8b' : '#eee',
                    color: responseLevel === n ? '#fff' : '#333'
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Técnico asignado */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Asignar Técnico</div>
            <input
              type="text"
              name="tecnico"
              value={report.tecnico}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Nombre del técnico"
            />
          </div>

          {/* Botón editar */}
          <div style={{ textAlign: 'right' }}>
            <button style={{
              backgroundColor: '#2f4b8b',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 8,
              cursor: 'pointer'
            }}>
              Editar 📝
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, name, value, onChange }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={labelStyle}>{title}</div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      style={{ ...inputStyle, width: '100%', resize: 'vertical' }}
      placeholder={`Escribe ${title.toLowerCase()}...`}
    />
  </div>
);

const inputStyle = {
  padding: '12px 16px',
  fontSize: 15,
  borderRadius: 8,
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  outline: 'none',
  flex: 1
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: 8,
  fontSize: 15
};

const chipStyle = {
  padding: '8px 16px',
  borderRadius: 20,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  minWidth: 90,
  textAlign: 'center'
};

export default ReportDetails;

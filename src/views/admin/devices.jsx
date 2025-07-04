import React, { useState, useEffect } from 'react';
import HeadBrand from '../../components/headBrand';
import { AiOutlineIdcard, AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineNoteAlt, MdDevices, MdEngineering, MdOutlineHome } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { fetchMockReport } from './fetchMockReport';
import logoMini from '../../assets/logoMini.png';

function ReportDetails() {
  const [status, setStatus] = useState('PENDIENTE');
  const [responseLevel, setResponseLevel] = useState('');
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

  useEffect(() => {
    fetchMockReport().then(data => {
      setReport(prev => ({
        ...prev,
        ...data.datos_personales,
        observaciones: data.observaciones,
        solucion: data.solucion,
        diagnostico: data.diagnostico,
        tecnico: data.tecnico
      }));
      setStatus(data.estado);
      setResponseLevel(data.nivel_respuesta);
    }).catch(err => {
      // Para desarrollo local con Vite, usar import para cargar el JSON
      import('./mockReport.json').then(module => {
        const data = module.default.reporte || module.reporte;
        setReport(prev => ({
          ...prev,
          ...data.datos_personales,
          observaciones: data.observaciones,
          solucion: data.solucion,
          diagnostico: data.diagnostico,
          tecnico: data.tecnico
        }));
        setStatus(data.estado);
        setResponseLevel(data.nivel_respuesta);
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  const estados = [
    { label: 'PENDIENTE', color: '#f5eada', border: '#fe8f2b' },
    { label: 'EN PROCESO', color: '#fff8db', border: '#ffde59' },
    { label: 'RECHAZADO', color: '#ffdadd', border: '#e60012' },
    { label: 'RESUELTO', color: '#e7ffe3', border: '#39ad2b' }
  ];

  const niveles = ['ALTA', 'MEDIA', 'BAJA'];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeadBrand />
      {/* Título de pantalla y logo juntos, menos espacio debajo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '32px 0 0 32px', marginBottom: 12, paddingTop: 40 }}>
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logoMini} alt="Logo mini" style={{ height: 36, marginRight: 8 }} />
          ENTRADA DE SOLICITUD DE REPORTES
        </span>
      </div>
      <div style={{ padding: '24px 20px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Título y fecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
          <MdOutlineNoteAlt size={28} />
          REPORTE #001
          <input type="date" name="fecha" style={{ marginLeft: 'auto', ...inputStyle, width: 200 }} />
        </div>

        {/* DATOS + ESTADO Y NIVEL */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 20,
          marginBottom: 20
        }}>
          {/* Columna izquierda - datos personales */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <InputWithIcon icon={<IoMdPerson />} name="nombre" placeholder="Nombre" value={report.nombre} onChange={handleChange} readOnly />
              <InputWithIcon icon={<AiOutlineIdcard />} name="cedula" placeholder="Cédula" value={report.cedula} onChange={handleChange} readOnly />
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <InputWithIcon icon={<MdOutlineHome />} name="oficina" placeholder="Oficina" value={report.oficina} onChange={handleChange} readOnly />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <InputWithIcon icon={<AiOutlinePaperClip />} name="cargo" placeholder="Cargo" value={report.cargo} onChange={handleChange} readOnly />
              <InputWithIcon icon={<MdDevices />} name="dispositivo" placeholder="# de dispositivo" value={report.dispositivo} onChange={handleChange} readOnly />
            </div>
          </div>

          {/* Columna derecha - estado, nivel y técnico */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>Seleccionar estado del reporte</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {estados.map(e => (
                  <button
                    key={e.label}
                    onClick={() => setStatus(e.label)}
                    style={{
                      ...chipStyle,
                      backgroundColor: status === e.label ? e.color : '#fff',
                      color: status === e.label ? '#000' : '#333',
                      border: `2px solid ${e.border}`
                    }}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16, display: 'flex', gap: 20, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Nivel de respuesta</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {niveles.map(n => (
                    <button
                      key={n}
                      onClick={() => setResponseLevel(n)}
                      style={{
                        ...chipStyle,
                        backgroundColor: responseLevel === n ? '#a4ddff' : '#fff',
                        color: responseLevel === n ? '#000' : '#333',
                        border: responseLevel === n ? '2px solid #38b6ff' : '2px solid #ccc'
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Asignar Técnico</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MdEngineering size={24} />
                  <select
                    name="tecnico"
                    value={report.tecnico}
                    onChange={handleChange}
                    style={{ ...inputStyle, width: 250 }}
                  >
                    <option value="">Seleccione un técnico</option>
                    {/* Opciones futuras desde JSON */}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Observaciones, Diagnóstico y Solución en dos columnas */}
        <div style={{ display: 'flex', gap: 48, marginBottom: 28 }}>
          <div style={{ flex: 1 }}>
            <TextArea label="Observaciones" name="observaciones" value={report.observaciones} onChange={handleChange} inputHeight={120} />
          </div>
          <div style={{ flex: 1 }}>
            <TextArea label="Diagnóstico" name="diagnostico" value={report.diagnostico} onChange={handleChange} inputHeight={120} />
          </div>
        </div>
        <div style={{ marginBottom: 24, marginTop: 24 }}>
          <TextArea label="Solución" name="solucion" value={report.solucion} onChange={handleChange} inputHeight={100} />
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
  );
}

// Subcomponentes reutilizables
const InputWithIcon = ({ icon, name, placeholder, value, onChange, readOnly }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
    {icon}
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      style={{ ...inputStyle, flex: 1, backgroundColor: readOnly ? '#f5f5f5' : '#fff' }}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, inputHeight }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={labelStyle}>{label}</div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      style={{ ...inputStyle, width: '100%', resize: 'vertical', minHeight: inputHeight || 80 }}
    />
  </div>
);

// Estilos base
const inputStyle = {
  padding: '10px 14px',
  fontSize: 15,
  borderRadius: 8,
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  outline: 'none'
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
  minWidth: 100,
  textAlign: 'center'
};

export default ReportDetails;

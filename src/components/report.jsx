import React, { useEffect, useState } from 'react';
import { AiOutlineIdcard, AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineNoteAlt, MdDevices, MdEngineering, MdOutlineHome } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';

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
      style={{ ...modernInputStyle, flex: 1, backgroundColor: readOnly ? '#f5f5f5' : '#fff' }}
      onFocus={e => e.target.style.borderColor = '#2f4b8b'}
      onBlur={e => e.target.style.borderColor = '#e0e4ea'}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, inputHeight, readOnly, placeholder }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={labelStyle}>{label}</div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      style={{
        ...modernInputStyle,
        width: '100%',
        resize: 'vertical',
        minHeight: inputHeight || 80,
        backgroundColor: readOnly ? '#f5f5f5' : '#fff',
        color: '#222',
        fontWeight: 500
      }}
      readOnly={readOnly}
      onFocus={e => e.target.style.borderColor = '#2f4b8b'}
      onBlur={e => e.target.style.borderColor = '#e0e4ea'}
      placeholder={placeholder}
    />
  </div>
);

// Modern styles from sendReport.jsx
const modernInputStyle = {
  padding: '14px 16px',
  fontSize: 15,
  borderRadius: 10,
  border: '1.5px solid #e0e4ea',
  background: '#fff',
  boxShadow: '0 4px 24px 0 rgba(47,75,139,0.18)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  color: '#222',
  marginBottom: 20
};
const modernSelect = {
  ...modernInputStyle,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  cursor: 'pointer',
  paddingRight: 40,
  background: '#fff',
};
const modernSelectWrapper = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 120,
  marginBottom: 0
};
const arrowIconStyle = {
  position: 'absolute',
  right: 18,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  fontSize: 18,
  color: '#b0b8c9',
};

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

const estados = [
  { label: 'PENDIENTE', color: '#f5eada', border: '#fe8f2b' },
  { label: 'EN PROCESO', color: '#fff8db', border: '#ffde59' },
  { label: 'RECHAZADO', color: '#ffdadd', border: '#e60012' },
  { label: 'RESUELTO', color: '#e7ffe3', border: '#39ad2b' }
];

const niveles = ['ALTA', 'MEDIA', 'BAJA'];

const Report = ({ report, status, responseLevel, onChange, setStatus, setResponseLevel, idx }) => {
  const [tecnicos, setTecnicos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [localDiag, setLocalDiag] = useState(report.diagnostico || "");
  const [localSol, setLocalSol] = useState(report.solucion || "");
  const [localStatus, setLocalStatus] = useState(status || "PENDIENTE");
  const [localLevel, setLocalLevel] = useState(responseLevel || "MEDIA");

  useEffect(() => {
    import('./tecnicos.json').then(module => {
      setTecnicos(module.default || module);
    });
  }, []);

  // Sincroniza con props si cambian externamente
  useEffect(() => {
    setLocalStatus(status || "PENDIENTE");
  }, [status]);
  useEffect(() => {
    setLocalLevel(responseLevel || "MEDIA");
  }, [responseLevel]);

  const handleSave = () => {
    if (onChange) {
      onChange({ target: { name: "diagnostico", value: localDiag.trim() } });
      onChange({ target: { name: "solucion", value: localSol.trim() } });
    }
    if (setStatus) setStatus(localStatus, idx);
    if (setResponseLevel) setResponseLevel(localLevel, idx);
    setEditMode(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', marginBottom: 32, padding: 24 }}>
      {/* Título y fecha */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>
        <MdOutlineNoteAlt size={24} />
        REPORTE #{report.id || idx + 1}
        <input type="date" name="fecha" value={report.fecha || ''} style={{ marginLeft: 'auto', ...inputStyle, width: 180 }} readOnly />
      </div>
      {/* DATOS + ESTADO Y NIVEL */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, marginBottom: 20 }}>
        {/* Columna izquierda - datos personales */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <InputWithIcon icon={<IoMdPerson />} name="nombre" placeholder="Nombre" value={report.nombre} onChange={onChange} readOnly />
            <InputWithIcon icon={<AiOutlineIdcard />} name="cedula" placeholder="Cédula" value={report.cedula} onChange={onChange} readOnly />
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <InputWithIcon icon={<MdOutlineHome />} name="oficina" placeholder="Oficina" value={report.oficina} onChange={onChange} readOnly />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <InputWithIcon icon={<AiOutlinePaperClip />} name="cargo" placeholder="Cargo" value={report.cargo} onChange={onChange} readOnly />
            <InputWithIcon icon={<MdDevices />} name="dispositivo" placeholder="# de dispositivo" value={report.dispositivo} onChange={onChange} readOnly />
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
                  onClick={editMode ? () => setLocalStatus(e.label) : undefined}
                  style={{
                    ...chipStyle,
                    backgroundColor: localStatus === e.label ? e.color : '#fff',
                    color: localStatus === e.label ? '#000' : '#333',
                    border: `2px solid ${e.border}`,
                    opacity: editMode ? 1 : 0.6,
                    cursor: editMode ? 'pointer' : 'not-allowed'
                  }}
                  disabled={!editMode}
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
                    onClick={editMode ? () => setLocalLevel(n) : undefined}
                    style={{
                      ...chipStyle,
                      backgroundColor: localLevel === n ? '#a4ddff' : '#fff',
                      color: localLevel === n ? '#000' : '#333',
                      border: localLevel === n ? '2px solid #38b6ff' : '2px solid #ccc',
                      opacity: editMode ? 1 : 0.6,
                      cursor: editMode ? 'pointer' : 'not-allowed'
                    }}
                    disabled={!editMode}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={labelStyle}>Asignar Técnico</div>
              <div style={modernSelectWrapper}>
                <MdEngineering size={24} style={{ marginRight: 4 }} />
                <select
                  name="tecnico"
                  value={report.tecnico}
                  onChange={onChange}
                  style={{ ...modernSelect, width: '100%' }}
                >
                  <option value="">Seleccione un técnico</option>
                  {tecnicos.map(t => (
                    <option key={t.id} value={t.nombre}>{t.nombre}</option>
                  ))}
                </select>
                <span style={arrowIconStyle}>▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Observaciones, Diagnóstico y Solución en dos columnas */}
      <div style={{ display: 'flex', gap: 48, marginBottom: 10 , marginRight: 25 }}>
        <div style={{ flex: 1 }}>
          <TextArea label="Observaciones" name="observaciones" value={report.observaciones} onChange={onChange} inputHeight={120} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          {editMode ? (
            <TextArea 
              label="Diagnóstico" 
              name="diagnostico" 
              value={localDiag} 
              onChange={e => setLocalDiag(e.target.value)} 
              inputHeight={120} 
              readOnly={false} 
              placeholder="Escribe aquí el diagnóstico..." 
            />
          ) : (
            <TextArea 
              label="Diagnóstico" 
              name="diagnostico" 
              value={report.diagnostico && report.diagnostico.trim() !== "" && report.diagnostico !== report.observaciones ? report.diagnostico : ""} 
              onChange={onChange} 
              inputHeight={120} 
              readOnly 
              placeholder="Sin diagnóstico" 
            />
          )}
        </div>
      </div>
      <div style={{ marginBottom: 10, marginTop: 10 , marginRight: 25}}>
        {editMode ? (
          <TextArea 
            label="Solución" 
            name="solucion" 
            value={localSol} 
            onChange={e => setLocalSol(e.target.value)} 
            inputHeight={100} 
            readOnly={false} 
            placeholder="Escribe aquí la solución..." 
          />
        ) : (
          <TextArea 
            label="Solución" 
            name="solucion" 
            value={report.solucion && report.solucion.trim() !== "" && report.solucion !== "Solución" ? report.solucion : ""} 
            onChange={onChange} 
            inputHeight={100} 
            readOnly 
            placeholder="Sin solución" 
          />
        )}
      </div>
      {/* Botones editar y guardar */}
      <div style={{ textAlign: 'right' }}>
        {editMode ? (
          <button
            style={{
              backgroundColor: '#38b6ff',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 8,
              cursor: 'pointer',
              marginRight: 8
            }}
            onClick={handleSave}
          >
            Guardar 
          </button>
        ) : null}
        <button
          style={{
            backgroundColor: '#2f4b8b',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 8,
            cursor: 'pointer'
          }}
          onClick={() => setEditMode(e => !e)}
        >
          {editMode ? 'Cancelar' : 'Editar '}
        </button>
      </div>
    </div>
  );
};

export default Report;

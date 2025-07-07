import React, { useState } from 'react'
import logoMini from '../../assets/logoMini.png'
import HeadBrand from '../../components/headBrand'

function SendReport() {
  const usuario = {
    id: 1,
    nombre: 'Simón',
    correo: 'simon@ejemplo.com'
  }

  const [form, setForm] = useState({
    asistencia: '',
    revision: '',
    instalacion: '',
    respaldo: '',
    medio: '',
    descripcion: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  const handleLogout = () => {
    localStorage.removeItem('role')
    window.location.href = '/login'
  }

  return (
    <div style={{
      fontFamily: 'Inter, Arial, sans-serif', 
      backgroundColor: '#fff',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
        background: '#fff'
      }}>
        <HeadBrand />
      </div>
      <div style={{
        backgroundColor: '#3c558a',
        color: '#fff',
        position: 'fixed',
        left: 0,
        width: '100%',
        padding: '4px 24px', 
        paddingTop: 50, 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 36, 
        zIndex: 10,
        boxShadow: '0 2px 12px 0 rgba(47,75,139,0.12)'
      }}>
        <div
          style={{ cursor: 'pointer', fontSize: 14 }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </div>

        <div style={{ fontSize: 16, marginRight: 80 }}>¿Qué hacemos?</div>

        <div style={{
          position: 'absolute',
          top: '100%',
          right: 80,
          backgroundColor: '#3c558a',
          color: '#fff',
          padding: '12px 20px',
          maxWidth: 420,
          fontSize: 14,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12
        }}>
          Ofrecemos un soporte técnico eficiente, con control total de las actividades,
          uso óptimo de recursos y una atención ágil y de calidad para cada cliente.
        </div>
      </div>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '110px 20px 20px 20px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <img src={logoMini} alt="Logo Mini"
            style={{ maxHeight: 70, width: 'auto', marginRight: 18, objectFit: 'contain' }} />
          <div>
            <h1 style={{ color: '#2f4b8b', margin: 0, fontSize: 30 }}>SOLICITUD DE SOPORTE TECNICO</h1>
            <p style={{ margin: 0, marginTop: 8, fontSize: 18 }}>Saludos {usuario.nombre} rellene la solicitud del reporte</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
            <Select name="asistencia" value={form.asistencia} onChange={handleChange} label="ASISTENCIA TECNICA" />
            <Select name="revision" value={form.revision} onChange={handleChange} label="REVISION Y/O MANTENIMIENTO" />
            <Select name="instalacion" value={form.instalacion} onChange={handleChange} label="INSTALAR Y/O REINSTALAR PROGRAMAS" />
            <Select name="respaldo" value={form.respaldo} onChange={handleChange} label="COPIA DE SEGURIDAD" />
            <Select name="medio" value={form.medio} onChange={handleChange} label="MEDIO FISICO" />
          </div>

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="ESCRIBA LA FALLA DE MANERA DETALLADA AQUI..."
            rows={4}
            style={{
              ...modernInputStyle,
              width: '100%',
              resize: 'vertical',
              minHeight: 60,
              maxHeight: 180,
              overflow: 'auto',
              marginBottom: 28
            }}
            required
            onFocus={e => e.target.style.borderColor = '#2f4b8b'}
            onBlur={e => e.target.style.borderColor = '#e0e4ea'}
          />

          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{
              backgroundColor: '#2f4b8b',
              color: '#fff',
              border: 'none',
              padding: '12px 30px',
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 6,
              cursor: 'pointer'
            }}>
              ENVIAR REPORTE
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

const selectOptions = {
  asistencia: [
    'No prende / No inicia',
    'Se reinica',
    'Malware(virus)',
    'Configurar corrreo',
    'Archivos perdidos',
    'Mensaje de error',
    'Bloqueo / Lentitud',
    'Otro',
    'Ninguno',
  ],
  revision: [
    'Monitor',
    'Teclado',
    'Mouse',
    'Regulador',
    'Puertos USB',
    'Unidad de CD / DVD',
    'Sonido',
    'otro',
    'Ninguno',
  ],
  instalacion: [
    'Todo completo',
    'Antivirus',
    'Paquete Office',
    'Lector de PDF',
    'Reproductor de video',
    'Impresora',
    'Thumderbird',
    'Otro',
    'Ninguno'
  ],
  respaldo: [
    'Mis documentos',
    'Escritorio',
    'Unidad "C"',
    'Descargas',
    'Biblioteca',
    'Otro',
    'Ninguno'
  ],
  medio: [
    'Unidad de CD',
    'Unidad de DVD',
    'Unidad USB',
    'Microsoft Outlook',
    'Carpeta compartida',
    'Otro',
    'Ninguno'
  ]
}

// Estilos modernos para inputs y selects
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
}

const modernSelectWrapper = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 350px',
  minWidth: 280,
  marginBottom: 0
}

const modernSelect = {
  ...modernInputStyle,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  cursor: 'pointer',
  paddingRight: 40,
  background: '#fff',
}

const arrowIconStyle = {
  position: 'absolute',
  right: 18,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  fontSize: 18,
  color: '#b0b8c9',
}

const Select = ({ name, value, onChange, label }) => (
  <div style={modernSelectWrapper}>
    <label style={{ fontWeight: 'bold', marginBottom: 6, fontSize: 13 }}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={modernSelect}
      required
      onFocus={e => e.target.style.borderColor = '#2f4b8b'}
      onBlur={e => e.target.style.borderColor = '#e0e4ea'}
    >
      <option value="" disabled hidden>Seleccione una opción</option>
      {selectOptions[name] && selectOptions[name].map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
    <span style={arrowIconStyle}>▼</span>
  </div>
)

export default SendReport

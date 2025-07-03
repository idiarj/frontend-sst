import React, { useState } from 'react'
import logoMini from '../../assets/logoMini.png'
import HeadBrand from '../../components/headBrand'

function SendReport() {
  // Simulación de usuario conectado
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
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      paddingTop: 35, 
      position: 'relative'
    }}>
      <HeadBrand />

      <div style={{
        backgroundColor: '#3c558a',
        color: '#fff',
        position: 'relative',
        padding: '8px 30px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50, 
        zIndex: 1
      }}>
        <div
          style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </div>

        <div style={{ fontSize: 16, fontWeight: 'bold', right: 10 }}>¿Qué hacemos?</div>

        <div style={{
          position: 'absolute',
          top: '100%',
          right: 10,
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
        padding: '30px 20px',
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
            rows={6}
            style={{
              width: '100%',
              padding: 12,
              fontSize: 14,
              borderRadius: 6,
              border: '1px solid #ccc',
              backgroundColor: '#f2f2f2',
              resize: 'none',
              boxSizing: 'border-box',
              marginBottom: 20
            }}
            required
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

// Select reutilizable mejorado
const Select = ({ name, value, onChange, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 350px', minWidth: 280 }}>
    <label style={{ fontWeight: 'bold', marginBottom: 6, fontSize: 13 }}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        padding: 10,
        fontSize: 14,
        borderRadius: 6,
        border: '1px solid #ccc',
        backgroundColor: '#f2f2f2',
        boxSizing: 'border-box'
      }}
      required
    >
      <option value="" disabled hidden>Seleccione una opción</option>
      <option>Opción 1</option>
      <option>Opción 2</option>
      <option>Opción 3</option>
      <option>Opción 4</option>
    </select>
  </div>
)

export default SendReport

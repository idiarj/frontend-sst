import React, { useState } from 'react'

function NewPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    // Aquí iría la lógica para guardar la nueva contraseña
    alert('Contraseña cambiada exitosamente')
  }

  return (
    <div style={{ maxWidth: 350, margin: '60px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8, background: '#fff' }}>
      <h2>Nueva Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Nueva contraseña</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="confirmPassword">Confirmar contraseña</label><br />
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Guardar</button>
      </form>
    </div>
  )
}

export default NewPassword

import React, { useState } from 'react'

function RecoverPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el correo de recuperación
    alert('Si el correo existe, recibirás instrucciones para recuperar tu contraseña.')
  }

  return (
    <div style={{ maxWidth: 350, margin: '60px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8, background: '#fff' }}>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Correo electrónico</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Enviar</button>
      </form>
    </div>
  )
}

export default RecoverPassword

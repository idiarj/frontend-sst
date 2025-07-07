import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import userPageImage from '../../assets/userPageImage.png'
import logo from '../../assets/logo.png'
import { validarCorreo } from '../../utils/validarCorreo'

function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const esValido = await validarCorreo(email)
    if (esValido) {
      setEnviado(true)
    } else {
      setError('Correo no válido. Intente nuevamente.')
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div style={{
          flex: 1,
          background: `url(${userPageImage}) center center / cover no-repeat`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center', color: '#000' }}>
            <img src={logo} alt="Logo" style={{ width: 440, marginBottom: 10 }} />
          </div>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: 500,
            padding: 60,
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.13)',
            backgroundColor: '#f7f9fc',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: '#2f4b8b',
              marginBottom: enviado ? 16 : 24,
              fontSize: 28,
              fontWeight: 'bold'
            }}>
              RECUPERAR CONTRASEÑA
            </h2>

            {enviado ? (
              <>
                <h3 style={{
                  color: '#777',
                  fontWeight: 'normal',
                  marginTop: 16,
                  fontSize: 22
                }}>
                  Revisa tu correo!
                </h3>
                <p style={{ fontSize: 14, color: '#2f4b8b', marginTop: 8 }}>
                  Hemos enviado un mail de verificación para cambiar tu contraseña
                </p>

                {/* Botón temporal para pruebas */}
                <button
                  style={{
                    marginTop: 30,
                    padding: 10,
                    backgroundColor: '#aaa',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/newpassword')}
                >
                  Ir a pantalla de nueva contraseña (pruebas)
                </button>

                <div style={{ fontSize: 12, marginTop: 48 }}>
                  VOLVER AL INICIO DE SESIÓN{' '}
                  <a
                    href="#"
                    style={{ color: '#2f4b8b' }}
                    onClick={e => {
                      e.preventDefault()
                      navigate('/login')
                    }}
                  >
                    HAGA CLICK AQUÍ
                  </a>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: 12 }}>{error}</div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 16,
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    padding: '8px 10px',
                    backgroundColor: '#fff'
                  }}>
                    <FaEnvelope size={18} color="#2f4b8b" style={{ marginRight: 8 }} />
                    <input
                      type="email"
                      placeholder="Ingrese su correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
                    />
                  </div>

                  <div style={{ fontSize: 12, marginBottom: 24 }}>
                    VOLVER AL INICIO DE SESIÓN{' '}
                    <a
                      href="#"
                      style={{ color: '#2f4b8b' }}
                      onClick={e => {
                        e.preventDefault()
                        navigate('/login')
                      }}
                    >
                      HAGA CLICK AQUÍ
                    </a>
                  </div>

                  <button type="submit" style={{
                    width: '100%',
                    padding: 12,
                    backgroundColor: '#2f4b8b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 30,
                    fontWeight: 'bold',
                    fontSize: 16,
                    cursor: 'pointer'
                  }}>
                    ENVIAR
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoverPassword

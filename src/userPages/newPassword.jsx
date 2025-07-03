import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import userPageImage from '../assets/userPageImage.png'
import logo from '../assets/logo.png'

function NewPassword() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
        console.log('Nueva contraseña:', password)
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
              marginBottom: 24,
              fontSize: 28,
              fontWeight: 'bold'
            }}>
              NUEVA CONTRASEÑA
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16,
                border: '1px solid #ccc',
                borderRadius: 6,
                padding: '8px 10px',
                backgroundColor: '#fff'
              }}>
                <FaLock size={18} color="#2f4b8b" style={{ marginRight: 8 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: 8
                  }}
                >
                  {showPassword ? <FaEyeSlash color="#2f4b8b" size={26}/> : <FaEye color="#2f4b8b" size={26} />}
                </button>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPassword

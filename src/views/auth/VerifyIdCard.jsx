import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaIdCard } from 'react-icons/fa'
import { achetetepese } from '../../utils/fetch.js'
import userPageImage from '../../assets/userPageImage.png'
import logo from '../../assets/logo.png'


function VerifyIdCard() {
  const [id_cardNumber, setCedula] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await achetetepese.post({
        endpoint: '/auth/verifyIdCard',
        body: { id_cardNumber },
        credentials: 'include',
      })

      console.log(response)

      const data = await response.json();
      console.table(data)
      if(!response.ok || !data.success) {
        console.error('Error al verificar la cédula:', data.error)
        setError(data.error || 'Ocurrió un error al verificar la cédula. Por favor, inténtalo de nuevo.')
        return
      }

      console.log('Cédula verificada exitosamente.');
      navigate('/register')

    } catch (error) {
      console.error('Error al verificar la cédula:', error)
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
            backgroundColor: '#f7f9fc'
          }}>
            <h2 style={{ textAlign: 'center', color: '#2f4b8b', marginBottom: 8 }}>REGÍSTRATE</h2>
            <p style={{
              textAlign: 'center',
              color: '#2f4b8b',
              fontSize: 14,
              marginBottom: 24
            }}>
              PRIMERO INGRESE SU CÉDULA DE IDENTIDAD
            </p>

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
                <FaIdCard size={18} color="#2f4b8b" style={{ marginRight: 8 }} />
                <input
                  type="text"
                  placeholder="Cédula"
                  value={id_cardNumber}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
                />
              </div>

              <div style={{ fontSize: 12, marginBottom: 16, textAlign: 'center' }}>
                <p>
                  ¿YA TIENES UNA CUENTA?{' '}
                  <a
                    href="#"
                    style={{ color: '#2f4b8b' }}
                    onClick={e => {
                      e.preventDefault()
                      navigate('/login')
                    }}
                  >
                    HAZ CLICK AQUÍ
                  </a>
                </p>
              </div>

              <button type="submit" style={{
                width: '100%',
                padding: 12,
                backgroundColor: '#2f4b8b',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 'bold',
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

export default VerifyIdCard;

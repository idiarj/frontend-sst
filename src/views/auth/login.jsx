import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaIdCard, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import userPageImage from '../../assets/userPageImage.png'
import logo from '../../assets/logo.png'
//import { users } from './users.js'
// import { getIp } from '../../utils/getIP.js'
import { achetetepese } from '../../utils/fetch.js'

function Login() {
  const [id_cardNumber, setId_CardNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      console.log('Attempting to login with id_cardNumber:', id_cardNumber, 'and password:', password)
      const response = await achetetepese.post({
        endpoint: '/auth/login',
        body: { id_cardNumber, password },
        credentials: 'include',
      })
      console.log('Login response:', response)
      const data = await response.json()
      console.table(data)

      if(!response.ok && !data.success) {
        console.error('Login failed:', data.error)
        setError(data.error || 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.')
        return
      }
      navigate('/user/sendReport', {replace: true})
    } catch (error) {
      console.error('Error during login:', error)
      setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
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
            <h2 style={{ textAlign: 'center', color: '#2f4b8b', marginBottom: 24 }}>INICIA SESIÓN</h2>
            {error && <div style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</div>}
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
                <FaIdCard size={18} color="#2f4b8b" style={{ marginRight: 8 }} />
                <input
                  type="text"
                  placeholder="Cédula"
                  value={id_cardNumber}
                  onChange={(e) => setId_CardNumber(e.target.value)}
                  required
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
                />
              </div>

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
                  placeholder="Contraseña"
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

              <div style={{ fontSize: 12, marginBottom: 16, textAlign: 'center' }}>
                <p>
                  ¿PRIMERA VEZ QUE INGRESAS?{' '}
                  <a
                    href="#"
                    style={{ color: '#2f4b8b' }}
                    onClick={e => {
                      e.preventDefault()
                      navigate('/register')
                    }}
                  >
                    HAGA CLICK AQUÍ
                  </a>
                </p>
                <p>
                  ¿OLVIDASTE TU CONTRASEÑA?{' '}
                  <a
                    href="#"
                    style={{ color: '#2f4b8b' }}
                    onClick={e => {
                      e.preventDefault()
                      navigate('/recoverpassword')
                    }}
                  >
                    HAGA CLICK AQUÍ
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
                INGRESAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

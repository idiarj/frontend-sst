import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HeadBrand from './components/headBrand'
import Login from './userPages/login.jsx'
import Register from './userPages/register.jsx'
import Register2 from './userPages/register2.jsx'
import RecoverPassword from './userPages/recoverPassword.jsx'
import NewPassword from './userPages/newPassword.jsx'

function App() {
  const cintilloHeight = 80;

  return (
    <Router>
      <HeadBrand />
      <div className="app-welcome" style={{ paddingTop: cintilloHeight }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
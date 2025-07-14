import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HeadBrand from './components/headBrand'
import Login from './views/auth/login.jsx'
import VerifyIdCard from './views/auth/VerifyIdCard.jsx'
import Register from './views/auth/Register.jsx'
import RecoverPassword from './views/auth/recoverPassword.jsx'
import NewPassword from './views/auth/newPassword.jsx'
import Devices from './views/admin/devices.jsx'
import Reports from './views/admin/reports.jsx'
import Plans from './views/admin/plans.jsx'
import Payments from './views/admin/payments.jsx'
import Settings from './views/admin/settings.jsx'
import SendReport from './views/user/sendReport.jsx'

function App() {
  const cintilloHeight = 80;


  return (
    <Router>
      <HeadBrand />
      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
        <div className="app-welcome" style={{ paddingTop: cintilloHeight }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-id" element={<VerifyIdCard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recoverpassword" element={<RecoverPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/admin/devices" element={<Devices />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user/sendreport" element={<SendReport />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
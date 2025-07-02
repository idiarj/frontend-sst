import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

return (
  <div className="app-welcome">
    <h1>Bienvenido al Sistema de Soporte Técnico</h1>
    <p>Comienza a desarrollar tu aplicación aquí.</p>
  </div>
)
}

export default App

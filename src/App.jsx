import { useState } from 'react'
import './App.css'
import HeadBrand from './components/headBrand'


function App() {
  const [count, setCount] = useState(0)

  // Altura del cintillo (ajusta si la imagen es más alta)
  const cintilloHeight = 80; // px, puedes ajustar este valor

  return (
    <>
      <HeadBrand />
      <div className="app-welcome" style={{ paddingTop: cintilloHeight }}>
        <h1>Bienvenido al Sistema de Soporte Técnico</h1>
        <p>Comienza a desarrollar tu aplicación aquí.</p>
      </div>
    </>
  )
}

export default App

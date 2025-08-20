import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './providers/userProvider.jsx'
import { router } from './router/route.jsx'
import './index.css'
//import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
      <StrictMode>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </StrictMode>,
)



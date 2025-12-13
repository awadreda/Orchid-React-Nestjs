import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Redux/store.ts'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.ts'

createRoot(document.getElementById('root')!).render(
 <StrictMode>

 <Provider store={store}>
   <RouterProvider router={router} />
    <App />
 </Provider>
  </StrictMode>,
)

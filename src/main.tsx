import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// El provider es lo que contiene los datos
// El context los genera
import { BudgetProvider } from './context/BudgetContext.tsx'

//5. Rodeamos el app con BudgetProvaider 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Context lo que hace es colocarse sobre la aplicación (el App) */}
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
)

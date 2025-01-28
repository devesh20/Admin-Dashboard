
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/shared/Layout.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Products from './components/Products.jsx'
import TrackUsage from './components/Track-Usage/TrackUsage.jsx'
import ManageInventory from './components/Manage-Inventory/ManageInventory.jsx'
import WorkersInfo from './components/Workers-Details/WorkersInfo.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Dashboard/>}/>
      <Route path='products' element={<Products/>} />
      <Route path='inventory' element={<ManageInventory/>} />
      <Route path='workers' element={<WorkersInfo/>} />
      <Route path='*' element={<div>Page not found</div>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

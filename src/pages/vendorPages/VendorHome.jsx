import React from 'react'
import Card_Dashboard from '../../components/TutorComponents/Cards/Card_Dashboard'
import Home from '../../components/TutorComponents/Dashboard/Home'
import { useLocation } from 'react-router-dom'

function VendorHome() {
  const location=useLocation()
  return (
    <div>
      
      <Home/>
      
    </div>
  )
}

export default VendorHome
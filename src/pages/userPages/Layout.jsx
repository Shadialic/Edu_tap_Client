import React from 'react'
import useNav from '../../components/UserComponents/Header'
import Footer from '../../components/UserComponents/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div>
        <div>
            <useNav/>
        </div>
        <div>
            <Outlet/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Layout
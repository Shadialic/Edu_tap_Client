import React from 'react'
import { Route, Routes,Outlet, Form } from "react-router-dom";
import VendorSignUp from '../pages/vendorPages/VendorSignUp';
import VendorLogin from '../pages/vendorPages/VendorLogin';
import VendorHome from '../pages/vendorPages/VendorHome'
import AddForm from '../components/TutorComponents/add_form/Form'
import Otp from '../components/otp/Otp';
import Header from '../components/TutorComponents/tutorLayouts/Header'
import {Footer} from '../components/TutorComponents/tutorLayouts/Footer'
import TutorProfile from '../pages/vendorPages/TutorProfile';
import WaitingList from '../pages/vendorPages/WaitingList';
const Lyouts=()=>{
  return(
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  )
}
function VendorRouter() {
  return (
    <Routes>
        <Route path="/signup" exact element={<VendorSignUp/>} /> 
        <Route path="/login" exact element={<VendorLogin/>} /> 
        <Route path='/otp'  exact element={<Otp/>}/>
        <Route path='/' exact element={<Lyouts/>}>
        <Route path="/" exact element={<VendorHome/>} /> 
        <Route path="/profile" exact element={<TutorProfile/>} /> 
        <Route path="/:category" element={<AddForm />} />
        <Route path="/waitinglist" element={<WaitingList />} />



        </Route>
       
    </Routes>
  )
}

export default VendorRouter
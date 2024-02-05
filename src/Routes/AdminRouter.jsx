import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from '../pages/AdminPages/AdminLoginPage'
import Dashboard from '../pages/AdminPages/Dashboard';
import Users from '../pages/AdminPages/Users';
import Tutors from '../pages/AdminPages/Tutors';
import TutorReq from '../pages/AdminPages/TutorReq'
import Category from '../pages/AdminPages/Category';
import CourseList from '../pages/AdminPages/CourseList';
import DisCourses from '../pages/AdminPages/DisCourses';
function AdminRouter() {
  return (
    <div>
      <Routes>
      <Route path="/" exact element={<AdminLoginPage/>} /> 
      <Route path="/dashboard" exact element={<Dashboard/>} /> 
      <Route path="/users" exact element={<Users/>} /> 
      <Route path="/tutors" exact element={<Tutors/>} /> 
      <Route path="/tutorsReq" exact element={<TutorReq/>} /> 
      <Route path="/category" exact element={<Category/>} /> 
      <Route path="/course" exact element={<CourseList/>} /> 
      <Route path="/displayCourse" element={<DisCourses />} />





      </Routes>
    </div>
  )
}

export default AdminRouter
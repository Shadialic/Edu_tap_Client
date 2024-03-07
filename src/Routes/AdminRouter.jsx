import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/AdminPages/AdminLoginPage";
import Dashboard from "../pages/AdminPages/Dashboard";
import Users from "../pages/AdminPages/Users";
import Tutors from "../pages/AdminPages/Tutors";
import TutorReq from "../pages/AdminPages/TutorReq";
import Category from "../pages/AdminPages/Category";
import CourseList from "../pages/AdminPages/CourseList";
import DisCourses from "../pages/AdminPages/DisCourses";
import AdminPublic from "./AdminPublic";
import Adminprotect from "./AdminProtect";
import Offers from "../pages/AdminPages/Offers";
import PaymentReport from "../pages/AdminPages/PaymentReport";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<AdminPublic><AdminLoginPage /></AdminPublic>} />
      <Route path="/dashboard" exact element={<Adminprotect><Dashboard /></Adminprotect>} />
      <Route path="/users" exact element={<Adminprotect><Users /></Adminprotect>} />
      <Route path="/tutors" exact element={<Adminprotect><Tutors /></Adminprotect>} />
      <Route path="/tutorsReq" exact element={<Adminprotect><TutorReq /></Adminprotect>} />
      <Route path="/category" exact element={<Adminprotect><Category /></Adminprotect>} />
      <Route path="/course" exact element={<Adminprotect><CourseList /></Adminprotect>} />
      <Route path="/displayCourse" element={<Adminprotect><DisCourses /></Adminprotect>} />
      <Route path="/offers" element={<Adminprotect><Offers /></Adminprotect>} />
      <Route path="/payment" element={<Adminprotect><PaymentReport /></Adminprotect>} />
    </Routes>
  )
}

export default AdminRouter
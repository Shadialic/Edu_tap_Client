import React from 'react'
import Sidebar from "../../components/AdminComponents/Sidebar";
import Navbar from "../../components/AdminComponents/Navbar";
import CourseMange from '../../components/AdminComponents/courseManage/CourseMange';
function CourseList() {
  return (
    <div>
    <div className="bg-gray-100 w-screen h-screen">
      <Sidebar state={'Course'}/>
      <Navbar state={'Course'}/>
      <CourseMange/>
    </div>
    </div>
  )
}

export default CourseList
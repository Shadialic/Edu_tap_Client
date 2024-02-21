import React from 'react'
import CourseMange from '../../components/AdminComponents/courseManage/CourseMange';
import Sidebar from '../../components/AdminComponents/Layouts/Sidebar';
import Navbar from '../../components/AdminComponents/Layouts/Navbar';

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
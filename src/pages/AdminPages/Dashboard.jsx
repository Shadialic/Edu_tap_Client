import React from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";




function Dashboard() {
  return (
    <>
    <div className="bg-gray-100 w-screen h-screen">
      <Sidebar state={'Dashboard'}/>
      <Navbar state={'Dashboard'}/>
    
      
      
    </div>
     
    </>
  )
}

export default Dashboard;

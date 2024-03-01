import React from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import AdminDashboard from "../../components/AdminComponents/Dashboard/AdminDashboard";

function Dashboard() {
  return (
    <>
    <div className="bg-gray-100 w-screen h-screen">
      <Sidebar state={'Dashboard'}/>
      <Navbar state={'Dashboard'}/>
      <AdminDashboard/>
    </div>
    </>
  )
}

export default Dashboard;

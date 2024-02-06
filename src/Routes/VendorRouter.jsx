import React from "react";
import { Route, Routes, Outlet, Form } from "react-router-dom";
import VendorSignUp from "../pages/VendorPages/VendorSignUp";
import VendorLogin from "../pages/VendorPages/VendorLogin";
import VendorHome from "../pages/VendorPages/VendorHome";
import AddForm from "../components/TutorComponents/Add_form/Form";
// import Otp from "../components/Otp/Otp";
import Header from "../components/TutorComponents/TutorLayouts/Header";
import { Footer } from "../components/TutorComponents/TutorLayouts/Footer";
import TutorProfile from "../pages/VendorPages/TutorProfile";
import VendorPublic from "./VendorPublic";
import Otp from "../components/otp/Otp";
import WaitingList from "../pages/vendorPages/WaitingList";

const Lyouts = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
function VendorRouter() {
  return (
    <Routes>
      <Route path="/signup" exact element={<VendorSignUp />} />

      <Route
        path="/login"
        exact
        element={
          <>
            <VendorPublic />
            <VendorLogin />
            <VendorPublic />
          </>
        }
      />

      <Route path="/otp" exact element={<Otp />} />
      <Route path="/" exact element={<Lyouts />}>
        <Route path="/" exact element={<VendorHome />} />
        <Route path="/profile" exact element={<TutorProfile />} />
        <Route path="/:category" element={<AddForm />} />
        <Route path="/waitinglist" element={<WaitingList />} />
      </Route>
    </Routes>
  );
}

export default VendorRouter;

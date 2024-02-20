import React from "react";
import { Route, Routes, Outlet, Form } from "react-router-dom";

import TutorSignUp from "../pages/TutorPages/TutorSignUp";
import TutorLogin from "../pages/TutorPages/TutorLogin";
import TutorHome from "../pages/TutorPages/TutorHome";
import AddForm from "../components/TutorComponents/Add_form/Form";
import Header from "../components/TutorComponents/TutorLayouts/Header";
import { Footer } from "../components/TutorComponents/TutorLayouts/Footer";
import TutorProfile from "../pages/TutorPages/TutorProfile";
import TutorPublic from "./TutorPublic";
import Otp from "../components/otp/Otp";
import WaitingList from "../pages/TutorPages/WaitingList";
import RunningClasses from "../pages/TutorPages/RunningClasses";
import TutorChat from "../components/Chat/TutorChat";
import Chat from "../components/Chat/Chat";


const Lyouts = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
function TutorRouter() {
  return (
    <Routes>
      <Route path="/signup" exact element={<TutorSignUp/>} />

      <Route
        path="/login"
        exact
        element={
          <>
            <TutorPublic />
            <TutorLogin />
            <TutorPublic />
          </>
        }
      />

      <Route path="/otp" exact element={<Otp />} />
      <Route path="/" exact element={<Lyouts />}>
        <Route path="/" exact element={<TutorHome />} />
        <Route path="/profile" exact element={<TutorProfile />} />
        <Route path="/:category" element={<AddForm />} />
        <Route path="/waitinglist" element={<WaitingList />} />
        <Route path="/runningClasses" element={<RunningClasses  />} />
      



      </Route>
        <Route path="/chat" element={<TutorChat />} />
    </Routes>
  );
}

export default TutorRouter;

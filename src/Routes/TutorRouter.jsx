import React from "react";
import { Route, Routes, Outlet} from "react-router-dom";
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
import Error from "../components/Error/Error";
import TutorVideoChat from "../pages/TutorPages/TutorVideoChat";
import PaymentReport from "../pages/TutorPages/PaymentReport";
import TutorProtect from "./TutorProtect";

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
      <Route path="/signup" exact element={<><TutorPublic /><TutorSignUp /><TutorPublic /></>} />
      <Route path="/login" element={<>{" "}<TutorPublic /> <TutorLogin /><TutorPublic />{" "}</>} />
      <Route path="/otp" exact element={<Otp />} />
      <Route path="/" exact element={<Lyouts />}>
        <Route path="/" exact element={<TutorProtect><TutorHome /></TutorProtect>} />
        <Route path="/profile" exact element={<TutorProtect><TutorProfile /></TutorProtect>} />
        <Route path="/:category" element={<TutorProtect><AddForm /></TutorProtect>} />
        <Route path="/waitinglist" element={<TutorProtect><WaitingList /></TutorProtect>} />
        <Route path="/runningClasses" element={<TutorProtect><RunningClasses /></TutorProtect>} />
      </Route>
      <Route path="/PaymentReport" element={<TutorProtect><PaymentReport /></TutorProtect>} />
      <Route path="/chat" element={<TutorProtect><TutorChat /></TutorProtect>} />
      <Route path="/videocall" element={<TutorProtect><TutorVideoChat /></TutorProtect>} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default TutorRouter
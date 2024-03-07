import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/UserPages/Login";
import Home from "../pages/UserPages/Home";
import Signup from "../pages/UserPages/Signup";
import Otp from "../components/otp/Otp";
import UserPublic from "./UserPublic";
import Profile from "../pages/UserPages/Profile";
import Course from "../pages/UserPages/Course";
import Enrollments from "../pages/UserPages/Enrollments";
import About from "../pages/UserPages/About";
import Blog from "../pages/UserPages/Blog";
import Success from "../components/Payment/Success";
import Faild from "../components/Payment/Faild";
import UserChat from "../components/Chat/UserChat";
import Error from "../components/Error/Error";
import UserProtect from "./UserProtect";
import UserVideoChat from "../pages/UserPages/UserVideoChat";
import Certificate from "../pages/UserPages/Certificate";


function UserRouter() {

  return (
    <Routes>
      <Route>
        <Route path="/" exact element={<Home />} />
      </Route>
      <Route
        path="/login"
        element={
          <UserPublic>
            <Login />
          </UserPublic>
        }
      />
      <Route path="/otp" exact element={<Otp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProtect><Profile/></UserProtect>} />
      <Route path="/course" element={<Course />} />
       <Route path="/enrollments"element={<UserProtect><Enrollments /> </UserProtect> }/>
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Faild />} />
      <Route path="/chat" element={<UserProtect><UserChat/></UserProtect>} />
      <Route path='/videocall' element={<UserProtect><UserVideoChat/></UserProtect>}/>
      <Route path='/certificate' element={<UserProtect><Certificate/></UserProtect>}/>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default UserRouter;

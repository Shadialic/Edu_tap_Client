import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import UserRouter from "./Routes/userRouter";
import TutorRouter from "./Routes/TutorRouter";
import AdminRouter from "./Routes/AdminRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/vendor/*" element={<TutorRouter/>} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
}

export default App;

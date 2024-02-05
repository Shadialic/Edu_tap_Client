import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import UserRouter from "./Routes/userRouter";
import VendorRouter from "./Routes/VendorRouter";
import AdminRouter from "./Routes/AdminRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/vendor/*" element={<VendorRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
}

export default App;

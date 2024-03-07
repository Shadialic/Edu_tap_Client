import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminRouter from "./routes/AdminRouter";
import TutorRouter from "./routes/TutorRouter";
import UserRouter from "./routes/UserRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/vendor/*" element={<TutorRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
}

export default App;

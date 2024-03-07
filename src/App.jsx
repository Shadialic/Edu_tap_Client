import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRouter from "./routes/UserRouter";
import TutorRouter from "./routes/TutorRouter";
import AdminRouter from "./routes/AdminRouter";

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

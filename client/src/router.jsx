import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage,.jsx";
import ResumePage from "./components/ResumePage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resume" element={<ResumePage /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;

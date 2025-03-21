import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage,.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Step1 from "./components/GetStarted/Step1_Disability.jsx";
import Step2 from "./components/GetStarted/Step2_Skills.jsx";
import Step3 from "./components/GetStarted/Step3_JobType.jsx";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/step1_disability" element={<Step1 />} />
        <Route path="/step2_skills" element={<Step2 />} />
        <Route path="/step3_jobtype" element={<Step3 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

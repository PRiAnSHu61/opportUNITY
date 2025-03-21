import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage,.jsx";
<<<<<<< HEAD
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Step1 from "./components/GetStarted/Step1_Disability.jsx";
import Step2 from "./components/GetStarted/Step2_Skills.jsx";
import Step3 from "./components/GetStarted/Step3_JobType.jsx";
=======
import ResumePage from "./components/ResumePage";

>>>>>>> 1c565aae386235602c58d5ad95dbea9ce59a6598
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/step1_disability" element={<Step1 />} />
        <Route path="/step2_skills" element={<Step2 />} />
        <Route path="/step3_jobtype" element={<Step3 />} />
=======
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resume" element={<ResumePage /> */}
>>>>>>> 1c565aae386235602c58d5ad95dbea9ce59a6598
      </Routes>
    </Router>
  );
};

export default AppRouter;

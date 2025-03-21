import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage,.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Step1 from "./components/GetStarted/Step1_Disability.jsx";
import Step2 from "./components/GetStarted/Step2_Skills.jsx";
import Step3 from "./components/GetStarted/Step3_JobType.jsx";
<<<<<<< HEAD
import Step4 from "./components/GetStarted/Step4_Location.jsx";
import Step5 from "./components/GetStarted/Step5_Salary.jsx";
import Step6 from "./components/GetStarted/Step6_Review.jsx";

=======
>>>>>>> 620c16fc260790ca2a2e96c60879431e715bd62d
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
<<<<<<< HEAD
        <Route path="/step4_location" element={<Step4 />} />  
        <Route path="/step5_salary" element={<Step5 />} />
        <Route path="/step6_review" element={<Step6 />} /> 
=======
>>>>>>> 620c16fc260790ca2a2e96c60879431e715bd62d
      </Routes>
    </Router>
  );
};

export default AppRouter;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/LandingPage,.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Step1 from "./components/GetStarted/Step1_Disability.jsx";
import Step2 from "./components/GetStarted/Step2_Skills.jsx";
import Step3 from "./components/GetStarted/Step3_JobType.jsx";
import Step4 from "./components/GetStarted/Step4_Location.jsx";
import Step5 from "./components/GetStarted/Step5_Salary.jsx";
import Step6 from "./components/GetStarted/Step6_Review.jsx";
import JobRecommendation from "./components/Jobs/JobRecommendation.jsx";
import Layout from "./components/Layout.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Get Started Flow */}
          <Route path="/step1_disability" element={<Step1 />} />
          <Route path="/step2_skills" element={<Step2 />} />
          <Route path="/step3_jobtype" element={<Step3 />} />
          <Route path="/step4_location" element={<Step4 />} />  
          <Route path="/step5_salary" element={<Step5 />} />
          <Route path="/step6_review" element={<Step6 />} /> 
          
          {/* Job Recommendations */}
          <Route path="/job_recommendations" element={<JobRecommendation />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;



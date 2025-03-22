import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Landing from "./components/Landing.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Step1 from "./components/GetStarted/Step1.jsx";
import Step2 from "./components/GetStarted/Step2.jsx";
import Step3 from "./components/GetStarted/Step3.jsx";
import Step4 from "./components/GetStarted/Step4.jsx";
import Step5 from "./components/GetStarted/Step5.jsx";
import Step6 from "./components/GetStarted/Step6_Review.jsx";
import JobRecommendation from "./components/Jobs/JobRecommendation.jsx";
import JobDetails from "./components/Jobs/JobDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "get-started",
        children: [
          {
            path: "step1",
            element: <Step1 />,
          },
          {
            path: "step2",
            element: <Step2 />,
          },
          {
            path: "step3",
            element: <Step3 />,
          },
          {
            path: "step4",
            element: <Step4 />,
          },
          {
            path: "step5",
            element: <Step5 />,
          },
          {
            path: "step6",
            element: <Step6 />,
          },
        ],
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute>
            <JobRecommendation />
          </ProtectedRoute>
        ),
      },
      {
        path: "job-details",
        element: (
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router; 
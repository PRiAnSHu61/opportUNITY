import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ requireSetup = false }) => {
  const { currentUser, hasCompletedSetup, loading } = useAuth();
  
  // While still loading auth state, show nothing or a loader
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // If setup is required but not completed, redirect to first step
  if (requireSetup && !hasCompletedSetup) {
    return <Navigate to="/get-started/step1" />;
  }
  
  // Otherwise, render the protected content
  return <Outlet />;
};
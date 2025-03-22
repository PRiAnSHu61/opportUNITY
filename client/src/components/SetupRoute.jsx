import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SetupRoute = () => {
  const { currentUser, hasCompletedSetup, loading } = useAuth();
  
  // While still loading auth state, show nothing or a loader
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // If user has already completed setup, redirect to jobs
  if (hasCompletedSetup) {
    return <Navigate to="/jobs" />;
  }
  
  // Otherwise, render the get-started flow
  return <Outlet />;
};
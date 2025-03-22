import { createContext, useContext, useState } from "react";

// Create the context
export const JobContext = createContext();

// Create a custom hook to use the context
export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};

// Provider component
export const JobProvider = ({ children }) => {
  const [jobRecommendations, setJobRecommendations] = useState({
    highly_matched: [],
    jobs_after_courses: [],
    suggested_jobs: []
  });
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [jobLoadingError, setJobLoadingError] = useState(null);

  return (
    <JobContext.Provider value={{
      jobRecommendations,
      setJobRecommendations,
      jobsLoaded,
      setJobsLoaded,
      jobLoadingError,
      setJobLoadingError
    }}>
      {children}
    </JobContext.Provider>
  );
};
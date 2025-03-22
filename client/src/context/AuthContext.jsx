import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState(null);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  // Function to check if a user has completed setup
  const checkUserSetup = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().getStarted === true) {
        setHasCompletedSetup(true);
        setUserPreferences(userDoc.data());
        return true;
      } else {
        setHasCompletedSetup(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking user setup:", error);
      setHasCompletedSetup(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkUserSetup(user);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userPreferences,
    hasCompletedSetup,
    checkUserSetup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
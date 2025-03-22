
// import { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "../firebase";
// import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userPreferences, setUserPreferences] = useState(null);
//   const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

//   // ✅ Google Sign-In and Save User Data to Firestore
//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       if (user) {
//         await saveUserToFirestore(user);
//         await checkUserSetup(user);
//         setCurrentUser(user);
//       }
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//     }
//   };

//   // ✅ Save user data to Firestore if new user
//   const saveUserToFirestore = async (user) => {
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//       await setDoc(userRef, {
//         fullName: user.displayName || "",
//         email: user.email || "",
//         photoURL: user.photoURL || "",
//         phone: "",
//         location: "",
//         education: "",
//         experience: "",
//         skills: [],
//         interests: [],
//         bio: "",
//         getStarted: false, // Default to false until setup is complete
//       });
//     }
//   };

//   // ✅ Check if user has completed setup
//   const checkUserSetup = async (user) => {
//     try {
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         const userData = userSnap.data();
//         setUserPreferences(userData);
//         setHasCompletedSetup(userData.getStarted === true);
//       } else {
//         setHasCompletedSetup(false);
//       }
//     } catch (error) {
//       console.error("Error checking user setup:", error);
//       setHasCompletedSetup(false);
//     }
//   };

//   // ✅ Logout function
//   const logout = async () => {
//     await signOut(auth);
//     setCurrentUser(null);
//     setUserPreferences(null);
//     setHasCompletedSetup(false);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         await checkUserSetup(user);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, userPreferences, hasCompletedSetup, signInWithGoogle, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState(null);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  // ✅ Google Sign-In and Save User Data to Firestore
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await saveUserToFirestore(user);
        await checkUserSetup(user);
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // ✅ Save user data to Firestore if new user
  const saveUserToFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        fullName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phone: "",
        location: "",
        education: "",
        experience: "",
        skills: [],
        interests: [],
        bio: "",
        getStarted: false, // Default to false until setup is complete
      });
    }
  };

  // ✅ Check if user has completed setup
  const checkUserSetup = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserPreferences(userData);
        setHasCompletedSetup(userData.getStarted === true);
      } else {
        setHasCompletedSetup(false);
      }
    } catch (error) {
      console.error("Error checking user setup:", error);
      setHasCompletedSetup(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserPreferences(null);
    setHasCompletedSetup(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkUserSetup(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Export checkUserSetup in the context value
  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userPreferences, 
      hasCompletedSetup, 
      signInWithGoogle, 
      logout,
      checkUserSetup // 👈 Add this line to expose the function
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
import { useContext, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect,  signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';



const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});


  // Google sign in
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      // signInWithPopup(auth, provider);
      signInWithRedirect(auth, provider)
    };
    const handleGoogleSignIn = async () => {
      try {
          await googleSignIn();
      } catch (error) {
          console.log(error);
      }
    };


  // LogOut
    const logOut = () => {
        signOut(auth)
    }
    const handleLogOut = async () => {
      try {
          await logOut();
      } catch (error) {
          console.log(error);
      }
    };

  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ handleGoogleSignIn, handleLogOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import AbsoluteSpinner from "../Components/Utils/AbsoluteSpinner";
import { USER } from "../store/USER_STORE/userActions";
import { BLOGS } from "../store/BLOGS_STORE/blogActions";
import { LISTINGS } from "../store/LISTINGS_STORE/listingActions";
import { RECOMMENDATION } from "../store/RECOMMENDATION_STORE/recommendationActions";

function isGoogleProvider(user) {
  if (user && user.providerData && Array.isArray(user.providerData)) {
    return user.providerData.some(
      (provider) => provider.providerId === "google.com"
    );
  }
  return false;
}

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const [searchPage, setSearchPage] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      USER.setUserEmail(user?.email);
      USER.fetchUser();
    });

    return () => {
      unsubscribeAuth();
    };
  }, [user, setUser]);

  const signUp = async (userName, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("1");
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
      console.log("2");

      await sendEmailVerification(auth.currentUser, {
        url: import.meta.env.VITE_REACT_APP_URL,
      });
      console.log("3");
    } catch (error) {
      throw error;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = () => {
    BLOGS.removeAllBlogs();
    USER.removeUser();
    LISTINGS.removeAllListings();
    RECOMMENDATION.removeAllRecommendation();
    return signOutFirebase(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const facebookSignIn = () => {
    return signInWithPopup(auth, new FacebookAuthProvider());
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  if (user === undefined) {
    return <AbsoluteSpinner />;
  }

  const isVerified = user && (user.emailVerified || isGoogleProvider(user));

  return (
    <FirebaseContext.Provider
      value={{
        user,
        db,
        signUp,
        signIn,
        signOut,
        googleSignIn,
        facebookSignIn,
        passwordReset,
        isVerified,
        searchPage,
        setSearchPage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebaseContext() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseProvider"
    );
  }
  return context;
}

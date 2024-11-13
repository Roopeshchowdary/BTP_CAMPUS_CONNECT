import React, { useEffect, useState } from "react";
import "./ProfileStrength.css";
import useFirebase from "../../hooks/useFirebase";
import { doc, collection, onSnapshot } from "firebase/firestore";

const ProfileStrength = () => {
  const { user, db } = useFirebase();
  const usersCollection = collection(db, "users");
  const userDocRef = doc(usersCollection, user.uid);
  const [strength, setStrength] = useState(20);

  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setStrength(calculateStrength(userData));
      }
    });

    return () => unsubscribe();
  }, [user, userDocRef]);

  const calculateStrength = (userData) => {
    let hasEmail = userData?.email ? 1 : 0;
    let hasName = userData?.name ? 1 : 0;
    let hasPicture = userData?.profilepic ? 1 : 0;
    let hasInterests = userData?.interests ? 1 : 0;
    let hasGoals = userData?.goals ? 1 : 0;

    let profileStrength =
      hasEmail * 10 +
      hasName * 10 +
      hasPicture * 30 +
      hasInterests * 25 +
      hasGoals * 25;

    return profileStrength;
  };

  const progressBarStyle = {
    width: `${strength}%`,
  };

  const progressBarColorClass = () => {
    if (strength <= 33) {
      return "red";
    } else if (strength <= 66) {
      return "green";
    } else {
      return "orange";
    }
  };

  const TypeStyle = {
    color: progressBarColorClass(),
    fontWeight: 600,
    fontSize: "28px",
  };

  return (
    <>
      <div className="profile-judge">
        <h3>Profile Strength</h3>
        <h3 className="profile-type" style={TypeStyle}>
          {strength <= 33
            ? "Beginner"
            : strength <= 66
            ? "Intermediate"
            : strength <= 100
            ? "Pro"
            : "Loading..."}
        </h3>
      </div>
      <div className={`progress-bar ${progressBarColorClass()}`}>
        <div className="progress" style={progressBarStyle}></div>
      </div>
    </>
  );
};

export default ProfileStrength;

import React from "react";
import { auth, db } from "./../../Firebase/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

export const Mgsoc = () => {
  const user = auth.currentUser;
  const firestore = db;
  const collectionName = "user_for_Gsoc";
  const collectionRef = collection(firestore, collectionName);
  //console.log(user.uid, user.displayName);

  const handleClick = async () => {
    await setDoc(doc(db, "user_for_Gsoc", user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    });

    await setDoc(doc(db, "userchats", user.uid), {});
  };
  getDocs(collectionRef)
    .then((querySnapshot) => {
      // Loop through each document in the collection
      querySnapshot.forEach((doc) => {
        // Print the document data to the console
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });

  return (
    <div className="flex flex-col items-center justify-center m-10 bg-purple-100 p-10 rounded-lg">
      <h1 className="mb-10  text-purple-700 font-extrabold  "> Hackathons </h1>
      <button
        className="p-[10px] rounded-md bg-slate-600  text-white font-bold"
        onClick={handleClick}
      >
        {" "}
        Add userself{" "}
      </button>
    </div>
  );
};

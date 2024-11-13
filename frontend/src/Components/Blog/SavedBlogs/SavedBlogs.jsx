// src/UserList.js
import React, { useEffect, useState } from "react";
import { db } from "../../../../Firebase/firebase";
import "./SavedBlogs.css";
import { getDocs, collection } from "firebase/firestore";

function SavedBlogs() {
  /* testing db */

  const [users, setUsers] = useState([]);

  const savedBlogsCollection = collection(db, "users");

  useEffect(() => {
    const getSavedBlogs = async () => {
      try {
        const data = await getDocs(savedBlogsCollection);
        const res = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(res);
      } catch (error) {
        alert(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>Your Recommendations</h2>
      {users.map((user, index) => (
        <div className="user-card" key={index}>
          <div className="user-profile-pic"></div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-bio">{user.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedBlogs;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const UserPreview = () => {
  const [users, setUsers] = useState([]);

  const usersCollection = collection(db, "users");

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollection);
        const res = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const targetUserId = id;
        const matchingUsers = res.filter((user) => user.id === targetUserId);
        setUsers(matchingUsers);
      } catch (error) {
        alert(error);
      }
    };

    getUsers();
  }, []);

  if (!users) {
    return <h1>loading...</h1>;
  } else {
    return (
      <div className="user-list">
        <div className="user-card">
          {users.map((user) => (
            <div>
              <div className="user-profile-pic"></div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-college">{user?.college}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default UserPreview;

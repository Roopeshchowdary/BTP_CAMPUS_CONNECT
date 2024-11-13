import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import "./UserProfile.css";
import defaultDP from "./defualtDP.png";
import useFirebase from "../../hooks/useFirebase";

function UserProfile() {
  const { user, db } = useFirebase();
  const [blogs, setBlogs] = useState([]);
  const [userdetails, setUserdetails] = useState(null);
  const blogsCollection = collection(db, "blogs");
  const usersCollection = collection(db, "users");

  const handleEditUserAbout = () => {
    // Open a modal or other UI element to allow the user to edit their about section
  };

  const handleEditUserGoals = () => {
    // Open a modal or other UI element to allow the user to edit their goals
  };

  useEffect(() => {
    async function fetchUserData(user) {
      try {
        const blogsQuery = query(
          blogsCollection,
          where("authorId", "==", user?.uid)
        );

        const data = await getDocs(blogsQuery);

        const res = data.docs.map((doc) => {
          const blogData = doc.data();

          return { title: blogData.title, desc: blogData.shortDesc };
        });

        return res;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    async function fetchUserDetails(uid) {
      try {
        let userQuery;
        userQuery = query(usersCollection, where("email", "==", user?.email));

        const userData = await getDocs(userQuery);
        if (!userData.empty) {
          const userDoc = userData.docs[0].data();
          setUserdetails(userDoc);
        } else {
          console.error("User data not found for UID: ", uid);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    const blogsWrittenByUser = fetchUserData(user);
    setBlogs(blogsWrittenByUser);
    setTimeout(() => {
      fetchUserDetails(user?.uid);
    }, 500);
  }, [user, userdetails]);

  return (
    <>
      <div class="card-container">
        <div class="card">
          <div class="box">
            <div class="imgContainer">
              <img
                class="profile-pic"
                src={
                  userdetails?.profilepic ? userdetails.profilepic : defaultDP
                }
              />
            </div>
            <div class="content">
              <strong>{userdetails?.name}</strong>

              <span>{user ? userdetails?.college : "Loading"}</span>
              <div class="divider"></div>

              <div class="profile-bottom">
                <h2>About</h2>
                <p>{userdetails?.about || ""}</p>
                <button onClick={handleEditUserAbout}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="programmingfans"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FF813F"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></script>

      <div className="user-meta-data">
        <section className="profile-interests">
          <h2>Interests</h2>
          <ul>
            {userdetails?.interests?.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>
        <section className="profile-goals">
          <h2>Goals</h2>
          <ul>
            {userdetails?.goals?.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default UserProfile;

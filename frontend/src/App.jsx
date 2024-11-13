import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import BlogList from "./Components/Blog/Bloglist";
import New_Blog from "./Components/Blog/New_Blog";
import LandingPage from "./Components/LandingPage/LandingPage";
import Project from "../src/projects/Project.jsx";
import Blog from "./Components/Blog/Blog";
import SignIn from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import { FirebaseProvider } from "./Context/FirebaseContext.jsx";
import PrivateRoute from "./Components/Routes/PrivateRoute.jsx";
import ListingPage from "./Components/Listing/ListingPage.jsx";
import MyListings from "./Components/Listing/MyListings/MyListings.jsx";
import ProfileUpdateForm from "./Components/Profile/ProfileUpdateForm.jsx";
import ListNow from "./Components/Listing/ListNow.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import UploadResume from "./Components/Resume/UploadResume.jsx";
import MyBlogs from "./Components/Blog/MyBlogs/MyBlogs.jsx";
import OtherProfile from "./Components/Profile/otherProfile/OtherProfile.jsx";
import { useSelector } from "react-redux";
import { USER } from "./store/USER_STORE/userActions.js";

import PdfPreview from "./Components/Resume/PdfPreview.jsx";

import { MessagePage } from "./Components/MessagePage/MessagePage.jsx";
import { Mgsoc } from "./Components/MGsoc/Mgsoc.jsx";


const App = () => {
  const { user, email } = useSelector((state) => state.userData);

  useEffect(() => {
    USER.fetchUser();
  }, []);

  return (
    <FirebaseProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Navigate to={"/blogs"} />} />
              <Route path="blogs/:id" element={<Blog />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="new_blog" element={<New_Blog />} />
              <Route
                path="profile"
                element={
                  <Profile userData={{ ...user, email }} userEmail={email} />
                }
              />
              <Route path="messages" element={<MessagePage />} />
              <Route path="msoc" element={<Mgsoc />} />
              <Route path="profile_update" element={<ProfileUpdateForm />} />
              <Route path="/listing" element={<ListingPage />}></Route>
              <Route path="/listing/list" element={<ListNow />}></Route>
              <Route
                path="/resume"
                element={
                  <div className="flex justify-center items-center h-screen">
                    <UploadResume />
                  </div>
                }
              ></Route>
              <Route
                path="/resume_preview"
                element={
                  <div className="flex justify-center items-center h-screen">
                    <PdfPreview
                      url={
                        "https://firebasestorage.googleapis.com/v0/b/campus-connect-main.appspot.com/o/resume%2Fnikhilbabarjee%40gmail.com?alt=media&token=cae96dfc-226b-4dcc-8c1c-c4a5737ed869"
                      }
                    />
                  </div>
                }
              ></Route>
              <Route path="/mylisting" element={<MyListings />} />
              <Route path="/myblogs" element={<MyBlogs />} />
              <Route path="/user/:emailId" element={<OtherProfile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/intro" element={<LandingPage />} />
            {/* <Route path="/project" element={<Project />} /> */}
          </Routes>
        </Router>
      </div>
      <ToastContainer autoClose={1000} />
    </FirebaseProvider>
  );
};

export default App;

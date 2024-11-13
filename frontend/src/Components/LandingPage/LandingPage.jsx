import React, { useState } from "react";
import "./LandingPage.css";
import Auth from "../Auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import useFirebase from "../../hooks/useFirebase";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useFirebase();

  if (user && user.emailVerified) {
    return <Navigate to={"/"} />;
  }

  // State to manage the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div style={{ width: "100vw", overflow: "none" }}>
      <section className="mx-auto lg:pb-16 pb-24 flex flex-col lg:flex-row justify-evenly items-center gap-5 bg-black lg:h-screen">
        <div className="flex lg:justify-none justify-center lg:my-0 my-8 lg:w-[500px] w-full">
          <div className="w-[90%]">
            <Auth />
          </div>
        </div>
        <div className="flex flex-col lg:gap-0 gap-6">
          <div className="introRightTitle h-30 w-full">
            <h1 className="lg:text-4xl xl:text-4xl text-xl text-center lg:text-left sm:text-lg text-white font-bold leading-snug lg:ml-7">
              Reimagine colleges as hubs <br></br>of{" "}
              <span className="text-pink-500">exploration</span>,
              <span className="text-yellow-500">creativity</span>, <br></br>
              and <span className="text-blue-500">growth</span>.
            </h1>
          </div>
          <div className="introimg relative">
            <img
              className="people-cartoon w-full max-w-md lg:ml-12 lg:mt-12"
              src="/image-removebg-preview (4) 2.png"
              alt="People Cartoon"
            />
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center m-auto">
        <div className="collaboration flex flex-col justify-center items-center lg:mt-[-101px] mt-[-136px]">
          <div className="collabTitle font-bold text-1xl lg:mt-0 mt-12 pb-4 lg:text-2xl sm:text-sm text-white bg-black w-full text-center">
            Learn and Grow with people from
          </div>
          <div className="collabBox bg-gray-300 rounded-lg mx-3 p-6 lg:px-10 gap-6 flex justify-center lg:justify-between items-center lg:overflow-none overflow-x-auto">
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/IIT_Kharagpur_Logo 2.png"
              alt="Collaboration Image 1"
            />
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/Indian_Institute_of_Technology_Roorkee_logo 2.png"
              alt="Collaboration Image 2"
            />
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/logo-iit 2.png"
              alt="Collaboration Image 3"
            />
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/BITS_Pilani-Logo 2.png"
              alt="Collaboration Image 4"
            />
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/Uni_Mannheim_Seal 2.png"
              alt="Collaboration Image 5"
            />
            <img
              className="object-cover lg:h-18 h-12"
              src="/Images/Google_2015_logo 2.png"
              alt="Collaboration Image 6"
            />
            <img
              className="object-cover lg:h-18 h-12"
              src="/Images/BCG_MONOGRAM 2.png"
              alt="Collaboration Image 7"
            />{" "}
            <img
              className="object-cover lg:h-20 h-12"
              src="/Images/Microsoft-logo_rgb_c-gray 2.png"
              alt="Collaboration Image 8"
            />
          </div>
        </div>
      </div>
      <section className="About">
        <div className="stats w-screen mx-auto ml-15 lg:mt-10 mt-6 lg:mb-10 mb-8">
          <div className="statsBox mx-10 lg:mx-20 rounded-lg bg-yellow-100  shadow-lg p-6">
            <div className="statTitle text-center mb-6 font-bold text-2xl lg:text-3xl">
              Some numbers that matter
            </div>
            <div className="statsSubboxes flex flex-col lg:flex-row justify-around">
              <div className="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="/Images/Community.png"
                  alt="Community Members"
                  className="max-w-full h-auto mb-2 pt-6"
                />
                <h1 className="text-xl lg:text-2xl font-bold">2000+</h1>
                <h6>Community Members</h6>
              </div>
              <div className="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="/Images/university.png"
                  alt="Universities Connected"
                  className="max-w-full h-auto mb-2"
                />
                <h1 className="text-xl lg:text-2xl font-bold">150+</h1>
                <h6>Universities Connected</h6>
              </div>
              <div className="statsSubBox mb-4 lg:mb-0 text-center flex flex-col items-center">
                <img
                  src="/Images/opportunity.png"
                  alt="Opportunities Listed"
                  className="max-w-full h-auto mb-2"
                />
                <h1 className="text-xl lg:text-2xl font-bold">300+</h1>
                <h6>Opportunities Listed</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="feature1 lg:mx-8 mx-4 mt-5 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card3 flex-1 p-8 blue">
            <h1 className="lg:text-2xl xl:text-3xl font-bold s mb-4">
              <span style={{ color: "rgba(238, 94, 84, 0.82)" }}>Learn</span>{" "}
              With Blogs
            </h1>
            <div className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Unlock a treasure of knowledge and right information shared by
              students and experts. From technical tutorials to startup
              experiences, dive into a world of insights and learning.
            </div>
          </div>
          <div className="feature1Right flex-1 blue p-4 overflow-hidden">
            <img
              className="w-full h-15 object-contain rounded-lg"
              src="/Images/Screenshot 2023-10-06 at 10.58.56 PM.png"
              alt="Discover Opportunities"
            />
          </div>
        </div>

        <div className="feature1 lg:mx-8 mx-4 block2 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card3 flex-1 p-8 red">
            <h1
              className="lg:text-2xl xl:text-3xl font-bold "
              style={{ color: "Black" }}
            >
              Find the Right <span style={{ color: "#FFE8B6" }}>Partners</span>
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Connect with like-minded individuals and potential collaborators
              to turn your ideas into reality. Whether it's a startup, project,
              or research initiative, we help you find the perfect match.
            </p>
          </div>
          <div className="feature1Right flex-1 red p-4 overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="/Images/Screenshot 2023-10-06 at 10.59.37 PM.png"
              alt="Discover Opportunities"
            />
          </div>
        </div>

        <div className="feature1 lg:mx-8 mx-4 block3 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card3 flex-1 p-8 yellow">
            <h1 className="lg:text-2xl xl:text-3xl">
              Discover{" "}
              <span style={{ color: "rgba(67, 122, 255, 1)" }}>
                Opportunities
              </span>
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Explore a vast array of opportunities, including exclusive
              internships, projects, and events. Broaden your horizons and grow
              both personally and professionally.
            </p>
          </div>
          <div className="feature1Right flex-1 yellow p-4 overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="/Images/Screenshot 2023-10-06 at 10.59.48 PM.png"
              alt="Discover Opportunities"
            />
          </div>
        </div>

        <div className="feature1 lg:mx-8 mx-4 block4 flex lg:flex-row flex-col mb-4">
          <div className="feature1Left card3 flex-1 p-8 bg-purple-100">
            <h1 className="lg:text-2xl xl:text-3xl">
              <span style={{ color: "rgba(0, 201, 184, 0.83)" }}>Network</span>{" "}
              with People
            </h1>
            <p className="text-gray-700 xl:text-1xl lg:text-lg text-sm">
              Connect with students and professionals from different colleges
              worldwide. Expand your network, exchange ideas, and build lifelong
              connections.
            </p>
          </div>
          <div className="feature1Right flex-1 bg-purple-100 p-4 overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-lg"
              src="/Images/Screenshot 2023-10-06 at 11.00.15 PM.png"
              alt="Discover Opportunities"
            />
          </div>
        </div>
      </section>{" "}
    </div>
  );
};

export default LandingPage;

import { useEffect } from "react";
import AboutSection from "./AboutSection";
import IntrestsSection from "./IntrestsSection";
import MainSection from "./MainSection";
import Reccomendation from "./Reccomendation";
import ResumeSection from "./ResumeSection";
import SocialSection from "./SocialSection";
import { useNavigate } from "react-router-dom";

export default function Profile({ userData, editable = true, userEmail }) {
  const navigate = useNavigate();

  return (
    <div className="profile-wrapper lg:px-72 bg-slate-100 py-5  flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5 md:min-w-[850px] ">
        <MainSection
          email={userData.email}
          name={userData.name}
          position={userData.position}
          bio={userData.bio}
          img={userData.photoURL}
          editable={editable}
          userEmail={userEmail}
          followers={userData.followers}
          following={userData.following}
        />
        <AboutSection
          about={userData.about}
          email={userData.email}
          editable={editable}
        />
        <IntrestsSection
          selectedIntrests={userData.selectedInterests}
          email={userData.email}
          editable={editable}
        />
        <div className="flex gap-5 w-full flex-col lg:flex-row ">
          <SocialSection
            github={userData.github}
            linkedin={userData.linkedin}
            twitter={userData.twitter}
            email={userData.email}
            editable={editable}
          />
          <Reccomendation
            email={userData.email}
            userEmail={userEmail}
            editable={editable}
          />
        </div>
        <ResumeSection url={userData?.resume} editable={editable} />
      </div>
    </div>
  );
}

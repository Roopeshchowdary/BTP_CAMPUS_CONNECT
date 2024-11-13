import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import ProfileData from "./profile.modal";
import { createEditables, createEditButtons } from "./util";
import useStatus from "../../hooks/useStatus";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import ProfileImg from "./ProfileImg";
import { USER } from "../../store/USER_STORE/userActions";

export default function MainSection({
  name,
  email,
  position,
  bio,
  img,
  editable = true,
  followers,
  following,
  userEmail,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, setLoading, setIdle } = useStatus();

  const [userName, setUserName] = useState(name ?? "Update your name");
  const [userPosition, setUserPosition] = useState(
    position ?? "Position not added"
  );
  const [userBio, setUserBio] = useState(bio ?? "No added bio");

  const userNameRef = useRef();
  const userPositionRef = useRef();
  const userBioRef = useRef();

  const followBoolean = followers && followers.includes(userEmail);

  async function updateProfile() {
    setUserName(userNameRef.current.value);
    setUserPosition(userPositionRef.current.value);
    setUserBio(userBioRef.current.value);
    setLoading();
    try {
      await USER.updateUser({
        name: userNameRef.current.value,
        position: userPositionRef.current.value,
        bio: userBioRef.current.value,
      });
      toast("Successfully updated user profile");
    } catch (error) {
      toast("Unable to update your profile");
    } finally {
      setIsEditing(false);
      setIdle();
    }
  }

  const shareOnClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast("Link copied to clipboard");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  const handleFollow = async () => {
    if (editable && followBoolean) return;
    setLoading();
    try {
      await ProfileData.updateFollowing(userEmail, email);

      await ProfileData.updateFollowers(email, userEmail);
      toast(`You are now following ${email}`);
    } catch (error) {
      toast("error while following");
      console.log(error);
    }
    setIdle();
  };

  return (
    <div className="main-section flex lg:flex-row flex-col justify-between gap-10 items-center w-full shadow-lg px-10 py-1  rounded-lg bg-white min-h-[300px]  relative min-w-min">
      {editable && (
        <div className=" absolute top-2 right-2 min-w-0 min-h-0">
          {createEditButtons(isEditing, setIsEditing, updateProfile, isLoading)}
        </div>
      )}
      <ProfileImg isEditable={editable} img={img} email={userEmail} />
      <div className=" lg:w-3/4 w-full flex flex-col justify-between items-center gap-5">
        <div className="user-details flex justify-between flex-col lg:flex-row items-start w-full mr-10 ">
          <div className="names flex flex-col  mb-10 justify-start items-start gap-2">
            {createEditables(
              isEditing,
              userName,
              userNameRef,
              "mb-2 font-bold"
            )}

            {createEditables(isEditing, userPosition, userPositionRef)}

            {createEditables(isEditing, userBio, userBioRef)}

            <div className="text-sm font-bold">
              {" "}
              <span>{followers ? followers.length : 0}</span>
              <span> followers</span>
            </div>

            <div className="text-sm font-bold">
              {" "}
              <span>{following ? following.length : 0}</span>
              <span> following</span>
            </div>
          </div>
        </div>
        <div className="buttons flex lg:flex-row lg:gap-0 flex-col gap-5 justify-between items-center w-full pr-3">
          <Button
            className={`lg:w-1/3 rounded-full w-full${
              followBoolean ? "bg-slate-500" : "bg-blue-700"
            }`}
            onClick={() => handleFollow()}
            disabled={!editable ? followBoolean : true}
          >
            {isLoading ? (
              <Loader />
            ) : followers ? (
              followBoolean ? (
                "Following"
              ) : (
                "Follow"
              )
            ) : (
              "Follow"
            )}
          </Button>
          <Button
            variant="outline"
            className=" lg:w-1/3 rounded-full w-full text-blue-700 border-blue-700"
          >
            Connections
          </Button>
          <Button variant="ghost" onClick={() => shareOnClick()}>
            <ShareIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

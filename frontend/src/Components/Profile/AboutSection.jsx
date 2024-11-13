import useStatus from "../../hooks/useStatus";
import { useRef, useState } from "react";
import { createEditButtons, createEditables } from "./util";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import ProfileData from "./profile.modal";

export default function AboutSection({ about, editable = true, email }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [userAbout, setUserAbout] = useState(
    about ?? " Tell us about yourself"
  );
  const { isLoading, setLoading, setIdle } = useStatus();

  const userAboutRef = useRef();

  async function updateProfile() {
    setUserAbout(userAboutRef.current.value);
    setLoading();
    try {
      await ProfileData.updateProfile(email, {
        about: userAboutRef.current.value,
      });
      toast("Successfully updated user profile");
    } catch (error) {
      toast("Unable to update your profile");
      console.log(error);
    } finally {
      setIsEditing(false);
      setIdle();
    }
  }

  return (
    <div className="main-section flex flex-col justify-between gap-1 items-start w-full shadow-lg px-10 py-5  rounded-lg bg-white text-left  relative">
      {editable && (
        <div className=" absolute top-2 right-2 min-w-0 min-h-0">
          {createEditButtons(isEditing, setIsEditing, updateProfile, isLoading)}
        </div>
      )}
      <div className="text-2xl font-bold"> About </div>
      <div className="w-full">
        {createEditables(
          isEditing,
          showFullText ? userAbout : userAbout.slice(0, 200),
          userAboutRef,
          "font-medium "
        )}
      </div>
      {userAbout.length > 200 && (
        <Button
          variant="ghost"
          className=" text-blue-700 font-medium mt-5 cursor-pointer p-0 hover:bg-transparent hover:text-blue-900"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "See less" : "See more"}
        </Button>
      )}
    </div>
  );
}

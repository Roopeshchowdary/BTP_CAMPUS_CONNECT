import { useState } from "react";
import useStatus from "../../hooks/useStatus";
import ProfileData from "./profile.modal";
import { toast } from "react-toastify";
import { createEditButtons } from "./util";
import { Button } from "../../components/ui/button";

const allIntrests = [
  "SOFTWARE DEVELOPMENT",
  "FINANCE",
  "STARTUPS",
  "CONSULTING",
  "PRODUCT",
  "ML/AI",
  "ENGINEERING",
  "PERSONAL GROWTH",
  "EXPLORING",
  "HIGHER STUDIES",
];

export default function InterestsSection({
  selectedIntrests,
  email,
  editable = true,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [userIntrests, setUserInterests] = useState(
    selectedIntrests ?? ["Show Off Your Interests"]
  );

  const { isLoading, setLoading, setIdle } = useStatus();

  async function updateProfile() {
    setLoading();
    try {
      await ProfileData.updateProfile(email, {
        selectedInterests: userIntrests,
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

  function handleOnClick(i) {
    const newIntrests = [...userIntrests];
    if (
      newIntrests.length === 1 &&
      newIntrests[0] === "Show Off Your Interests"
    ) {
      newIntrests.pop();
    }

    if (newIntrests.includes(i)) {
      const index = newIntrests.indexOf(i);
      newIntrests.splice(index, 1);
    } else {
      newIntrests.push(i);
    }

    setUserInterests(newIntrests);
  }
  return (
    <div className="main-section flex flex-col justify-between gap-5 items-start w-full shadow-lg px-10 py-5 rounded-lg bg-white text-left relative">
      {editable && (
        <div className=" absolute top-2 right-2 min-w-0 min-h-0">
          {createEditButtons(isEditing, setIsEditing, updateProfile, isLoading)}
        </div>
      )}
      <div className="text-2xl font-bold">Interests</div>
      <div className="flex flex-wrap justify-start items-center w-full gap-5">
        {isEditing
          ? allIntrests.map((interest, i) => (
              <Button
                onClick={() => handleOnClick(interest)}
                className={` p-5 min-w-[100px] bg-orange-100 font-medium text-md h-8 flex justify-center items-center rounded-md ${
                  userIntrests.includes(interest)
                    ? "bg-orange-500 hover:bg-orange-500"
                    : "hover:bg-orange-200"
                }`}
                key={i}
                variant="ghost"
              >
                {interest}
              </Button>
            ))
          : userIntrests.map((interest, i) => (
              <div
                className=" p-5 min-w-[100px] bg-orange-200 font-medium text-md h-8 flex justify-center items-center rounded-md"
                key={i}
              >
                {interest}
              </div>
            ))}
      </div>
    </div>
  );
}

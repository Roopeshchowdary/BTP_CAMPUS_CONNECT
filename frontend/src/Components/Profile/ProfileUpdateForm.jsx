import React, { useCallback, useState } from "react";
import "./Profile.css";
import useFirebase from "../../hooks/useFirebase";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import useStatus from "../../hooks/useStatus";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { useNavigate } from "react-router-dom";
import BasicDetailsForm from "./ProfileUpdateForm/BasicDetailsForm";
import InterestForm from "./ProfileUpdateForm/InterestDetailsForm";
import SocialLinksForm from "./ProfileUpdateForm/SocialLinksForm";
import Modal from "../Utils/Modal";

const updateProfile = async (email, details) => {
  try {
    const userRef = doc(db, "users", email);
    await setDoc(userRef, details);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default function ProfileUpdateForm() {
  const [currentForm, setCurrForm] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    universityName: "",
    yearOfStudy: 0,
    intrests: [],
    photoURL: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const { user } = useFirebase();
  const { isLoading, setLoading, setIdle } = useStatus();
  const navigate = useNavigate();

  const nextStep = useCallback(
    async (details) => {
      setFormData((prev) => ({ ...prev, ...details }));
      if (currentForm < 3) {
        setCurrForm((prev) => prev + 1);
      } else {
        try {
          setLoading();
          console.log(formData, "form data");
          console.log(details, "details");
          await updateProfile(user.email, { ...formData, ...details });
          navigate("/blogs");
          toast("Successfully updated user profile");
        } catch (error) {
          toast("Unable to update your profile");
        } finally {
          setIdle();
        }
      }
    },
    [setFormData, currentForm, setCurrForm, formData]
  );

  const prevStep = useCallback(() => {
    setCurrForm((prev) => Math.max(0, prev - 1));
  }, [setCurrForm]);

  return (
    <>
      <Modal modal={true}>
        <div>
          {currentForm === 1 ? (
            <BasicDetailsForm nextStep={nextStep} formData={formData} />
          ) : currentForm === 2 ? (
            <InterestForm
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
            />
          ) : (
            <SocialLinksForm
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
            />
          )}
          {isLoading && <AbsoluteSpinner />}
        </div>
      </Modal>
    </>
  );
}

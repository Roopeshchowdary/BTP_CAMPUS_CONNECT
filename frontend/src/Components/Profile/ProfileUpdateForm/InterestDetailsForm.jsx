import { useState, useCallback } from "react";
import Logo from "../../../assets/logo.png";
import { useFormik } from "formik";
import { InterestValidationSchema } from "./formValidation";

const interests = [
  "EXPLORING",
  "SOFTWARE DEVELOPMENT",
  "ML/AI",
  "STARTUPS",
  "FINANCE",
  "PRODUCT",
  "DESIGN",
  "CONSULTING",
  "WEB DEVELOPMENT",
  "PERSONAL GROWTH",
  "ENGINEERING",
  "HIGHER STUDIES",
];

const InterestForm = ({ prevStep, nextStep, formData }) => {
  const { values, errors, handleSubmit, setValues } = useFormik({
    initialValues: {
      selectedInterests: formData["selectedInterests"]
        ? formData["selectedInterests"]
        : [],
    },
    onSubmit: (values) => {
      console.log("Submitted: ", values);
      nextStep(values);
    },
    validationSchema: InterestValidationSchema,
  });

  const handleInterestClick = useCallback(
    async (interest) => {
      await setValues((prevValues) => {
        const selectedInterests = prevValues.selectedInterests || [];
        if (selectedInterests.includes(interest)) {
          return {
            ...prevValues,
            selectedInterests: selectedInterests.filter(
              (item) => item !== interest
            ),
          };
        } else {
          console.log("Updating interest", selectedInterests, interest);
          return {
            ...prevValues,
            selectedInterests: [...selectedInterests, interest],
          };
        }
      });
    },
    [setValues]
  );

  const handleFormSubmit = useCallback((event) => {
    console.log("Submit event", event);
    handleSubmit(event);
  }, []);

  return (
    <>
      <form className="text-black" onSubmit={handleFormSubmit}>
        <div className="gap-3 flex justify-center ">
          <img src={Logo} alt="logo" className="w-6 h-6 relative top-1" />
          <h4 className="sm:text-lg text-md font-semibold">
            YOUR PERSONAL DETAILS
          </h4>
        </div>
        <div className="profile-body">
          <div className="interests">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                className={
                  values["selectedInterests"] &&
                  values["selectedInterests"].includes(interest)
                    ? "selected"
                    : ""
                }
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className="buttons-container">
          <button className="previous-btn btn" type="button" onClick={prevStep}>
            &#8678; Previous
          </button>
          <button className="next-btn btn" type="submit">
            Next &#8680;
          </button>
        </div>
        <div className="text-center">
          {errors.selectedInterests && (
            <span className="text-sm text-red-500">
              {errors.selectedInterests}
            </span>
          )}
        </div>
        <div
          className="profile-footer"
          style={{
            width: "66%",
            borderRadius: "10px 0 0 10px",
            backgroundColor: "#f1c232",
          }}
        >
          medium
        </div>
      </form>
    </>
  );
};

export default InterestForm;

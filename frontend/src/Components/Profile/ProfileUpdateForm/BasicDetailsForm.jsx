import { useCallback } from "react";
import useStatus from "../../../hooks/useStatus";
import AbsoluteSpinner from "../../Utils/AbsoluteSpinner";
import uploadImage from "../../../lib/uploadFile";
import useFirebase from "../../../hooks/useFirebase";
import { toast } from "react-toastify";
import Logo from "../../../assets/logo.png";
import { useFormik } from "formik";
import { BasicDetailsSchema } from "./formValidation";
import InputWithError from "../../Utils/InputWithError";
import Select from "../../Utils/Select";
import { Label } from "flowbite-react";
import DefaultProfileIcon from "../../../assets/profile_image.png";
import university from "./universityNames.json";

const UNIVERSITY_NAMES = university["universities"];

const BasicDetailsForm = ({ nextStep, formData }) => {
  const { user } = useFirebase();

  const {
    handleBlur,
    handleChange,
    handleReset,
    values: basicDetails,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: formData["name"],
      photoURL: formData["photoURL"] || user.photoURL,
      universityName: formData["universityName"],
      yearOfStudy: formData["yearOfStudy"],
    },
    validationSchema: BasicDetailsSchema,
    onSubmit: (values) => {
      nextStep(values);
    },
  });

  const { isLoading, setLoading, setIdle } = useStatus();

  const { name, photoURL, universityName, yearOfStudy } = basicDetails;

  const handleImageChange = useCallback(
    async (e) => {
      try {
        if (e.target.files.length === 0) return;

        setLoading();
        const url = await uploadImage(
          e.target.files[0],
          `user_images/${user.email}`
        );
        await setFieldValue("photoURL", url);
      } catch (error) {
        toast("Unable to update the profile image");
      } finally {
        setIdle();
      }
    },
    [setLoading, setIdle, setFieldValue]
  );

  const handleSelectChange = useCallback(
    async (key, value) => {
      try {
        await setFieldValue(key, value);
      } catch (error) {
        console.log(error.message);
        toast("Failed to select the value");
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <div className="h-fit px-2  box-border bg-white text-black">
        <div className="gap-3 flex justify-center">
          <img src={Logo} alt="logo" className="w-6 h-6 relative top-1" />
          <h4 className="sm:text-lg text-md font-semibold">
            YOUR PERSONAL DETAILS
          </h4>
        </div>
        <div className="mt-6 text-left">
          <InputWithError
            value={name}
            name={"name"}
            type={"text"}
            placeholder={"User name"}
            label={"Your Name"}
            handleBlur={handleBlur}
            handleReset={handleReset}
            handleChange={handleChange}
            error={touched["name"] && errors["name"]}
          />
        </div>
        <div className="mt-6 text-left">
          <Label htmlFor={"user-profile"} className="font-extrabold">
            Pick a profile photo
          </Label>
          <div className="mt-3 flex justify-start items-center gap-3">
            <img
              src={photoURL || DefaultProfileIcon}
              alt="user-profile"
              id="user-profile"
              className="lg:w-24 lg:h-24 w-16 h-16 rounded-full"
            ></img>
            <input
              name="image"
              allow="image/*"
              type="file"
              className="text-xs rounded-lg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="lg:flex mt-6 justify-between w-full gap-5">
          <Select
            value={universityName}
            fields={UNIVERSITY_NAMES}
            name={"universityName"}
            label={"Your University"}
            className={
              "flex-grow text-xs font-sans lg:max-w-[250px] lg:mb-0 mb-3"
            }
            placeholder={"University"}
            handleChange={(option) =>
              handleSelectChange("universityName", option.value)
            }
            handleBlur={handleBlur}
            error={touched["universityName"] && errors["universityName"]}
          />
          <Select
            fields={[1, 2, 3, 4, 5]}
            value={yearOfStudy}
            name={"yearOfStudy"}
            label={"Year of Study"}
            className={
              "flex-grow text-xs font-sans lg:max-w-[200px] lg:mb-0 mb-3"
            }
            placeholder={"1"}
            handleBlur={handleBlur}
            handleReset={handleReset}
            handleChange={(option) =>
              handleSelectChange("yearOfStudy", option.value)
            }
            error={touched["yearOfStudy"] && errors["yearOfStudy"]}
          />
        </div>
        <div className="flex justify-end">
          <button className="next-btn btn" type="button" onClick={handleSubmit}>
            Next &#8680;
          </button>
        </div>
        <div
          className="profile-footer"
          style={{
            width: "33%",
            borderRadius: "10px 0 0 10px",
            backgroundColor: "green",
          }}
        >
          easy
        </div>
      </div>
      {isLoading && <AbsoluteSpinner />}
    </>
  );
};

export default BasicDetailsForm;

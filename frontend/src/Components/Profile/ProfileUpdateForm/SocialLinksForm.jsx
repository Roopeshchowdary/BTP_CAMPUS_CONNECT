import Logo from "../../../assets/logo.png";
import LinkedIn from "../../../assets/linkedin.png";
import Github from "../../../assets/github.png";
import Twitter from "../../../assets/twitter.png";
import { useFormik } from "formik";
import { SocialLinksValidationSchema } from "./formValidation";
import InputWithError from "../../Utils/InputWithError";

const SocialLinksForm = ({ nextStep, prevStep }) => {
  const {
    values: socialDetails,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      linkedin: "",
      github: "",
      twitter: "",
    },
    validationSchema: SocialLinksValidationSchema,
    onSubmit: (values) => nextStep(values),
  });

  const { linkedin, github, twitter } = socialDetails;

  return (
    <>
      <div className="text-black">
        <div className="gap-3 flex justify-center ">
          <img src={Logo} alt="logo" className="w-6 h-6 relative top-1" />
          <h4 className="sm:text-lg text-md font-semibold">
            YOUR PERSONAL DETAILS
          </h4>
        </div>
        <div className="profile-body">
          <div className="social-links">
            <div className="linkedin">
              <img src={LinkedIn} alt="linkedin" />
              <InputWithError
                type="text"
                placeholder="Add LinkedIn profile"
                name="linkedin"
                value={linkedin}
                onChange={handleChange}
                error={touched["linkedin"] && errors["linkedin"]}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleReset={handleReset}
                sizing={"md"}
              />
            </div>
            <div className="github">
              <img src={Github} alt="github" />
              <InputWithError
                type="text"
                placeholder="Add Github profile"
                name="github"
                value={github}
                onChange={handleChange}
                error={touched["github"] && errors["github"]}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleReset={handleReset}
                sizing={"md"}
              />
            </div>
            <div className="twitter">
              <img src={Twitter} alt="twitter" />
              <InputWithError
                type="text"
                placeholder="Add Twitter profile"
                name="twitter"
                value={twitter}
                onChange={handleChange}
                error={touched["twitter"] && errors["twitter"]}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleReset={handleReset}
                sizing={"md"}
              />
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button className="previous-btn btn" onClick={prevStep}>
            &#8678; Previous
          </button>
          <button
            className="submit-btn btn"
            onClick={handleSubmit}
            type="button"
          >
            Submit &#8680;
          </button>
        </div>
        <div
          className="profile-footer"
          style={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "#0bd417",
          }}
        >
          strong
        </div>{" "}
      </div>
    </>
  );
};

export default SocialLinksForm;

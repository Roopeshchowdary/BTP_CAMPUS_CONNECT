import * as Yup from "yup";

export const BasicDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z].*$/, "Should start with a letter")
    .min(4, "Should be at least 4 characters")
    .max(20, "Should be at most 20 characters")
    .required("Name is required"),

  yearOfStudy: Yup.number()
    .typeError("Should be a numeric value")
    .min(1, "Should be at least 1")
    .max(5, "Should be at most 5")
    .required("Year of Study is required"),

  universityName: Yup.string().required("University Name is required"),

  photoURL: Yup.string()
    .url("Should be a valid URL starting with 'https'")
    .notRequired(),

  selectedInterests: Yup.array().of(Yup.string()),
});

export const InterestValidationSchema = Yup.object().shape({
  selectedInterests: Yup.array()
    .of(Yup.string())
    .required("Select atleast one interest")
    .min(1, "Select atleast one interest"),
});

export const SocialLinksValidationSchema = Yup.object().shape({
  linkedin: Yup.string()
    .test({
      name: "atLeastOneSocialLink",
      test: function (value) {
        const github = this.resolve(Yup.ref("github"));
        const twitter = this.resolve(Yup.ref("twitter"));

        return !!value || !!github || !!twitter;
      },
      message: "At least one social link is required",
    })
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      "Should be a valid LinkedIn profile URL"
    ),

  github: Yup.string().matches(
    /^(https?:\/\/)?(www\.)?github\.com\/.*$/,
    "Should be a valid GitHub profile URL"
  ),

  twitter: Yup.string().matches(
    /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/,
    "Should be a valid Twitter profile URL"
  ),
});

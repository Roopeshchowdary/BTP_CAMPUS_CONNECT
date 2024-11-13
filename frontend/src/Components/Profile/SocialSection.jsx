import { useRef, useState } from "react";
import useStatus from "../../hooks/useStatus";
import { toast } from "react-toastify";
import { createEditButtons, createEditables } from "./util";
import ProfileData from "./profile.modal";

export default function SocialSection({
  github,
  linkedin,
  twitter,
  editable = true,
  email,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const linkedinRef = useRef();
  const githubRef = useRef();
  const twitterRef = useRef();

  const [socials, setSocials] = useState([
    {
      svg: <GithubIcon />,
      name: !github?.length ? "Add Github" : github,
      ref: githubRef,
      link: github !== "Add Github",
    },
    {
      svg: <LinkedInIcon />,
      name: !linkedin?.length ? "Add Linkedin" : linkedin,
      ref: linkedinRef,
      link: linkedin !== "Add Linkedin",
    },
    {
      svg: <TwitterIcon />,
      name: !twitter?.length ? "Add Twitter" : twitter,
      ref: twitterRef,
      link: twitter !== "Add Twitter",
    },
  ]);

  const { isLoading, setLoading, setIdle } = useStatus();

  async function updateProfile() {
    setSocials((prev) => [
      {
        svg: <GithubIcon />,
        name: githubRef.current.value || "Add Github",
        ref: githubRef,
        link: githubRef.current.value !== "Add Github",
      },
      {
        svg: <LinkedInIcon />,
        name: linkedinRef.current.value || "Add Linkedin",
        ref: linkedinRef,
        link: linkedinRef.current.value !== "Add Linkedin",
      },
      {
        svg: <TwitterIcon />,
        name: twitterRef.current.value || "Add Twitter",
        ref: twitterRef,
        link: twitterRef.current.value !== "Add Twitter",
      },
    ]);

    setLoading();
    try {
      await ProfileData.updateProfile(email, {
        github: githubRef.current.value,
        linkedin: linkedinRef.current.value,
        twitter: twitterRef.current.value,
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
    <div className="main-section flex flex-col  gap-5 items-start w-full shadow-lg px-10 py-5  rounded-lg bg-white text-left  relative">
      {editable && (
        <div className=" absolute top-2 right-2 min-w-0 min-h-0">
          {createEditButtons(isEditing, setIsEditing, updateProfile, isLoading)}
        </div>
      )}

      <div className="text-2xl font-bold"> Find me here </div>
      <div className="flex flex-col gap-5 w-full">
        {socials.map((social, i) => (
          <div
            className="flex gap-2 justify-between items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            key={i}
            onClick={() => {
              !isEditing &&
                (social.link
                  ? window.location.assign(social.name)
                  : toast("Add your social link"));
            }}
          >
            <div>{social.svg}</div>
            {createEditables(isEditing, social.name, social.ref)}
          </div>
        ))}
      </div>
    </div>
  );
}

const GithubIcon = () => (
  <svg
    aria-hidden="true"
    className="octicon octicon-mark-github"
    height="24"
    version="1.1"
    viewBox="0 0 16 16"
    width="24"
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    ></path>
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.47 7.47c-.29.29-.68.48-1.09.56.39-.23.69-.6.83-1.05-.37.22-.78.38-1.22.46-.35-.37-.85-.6-1.39-.6-1.05 0-1.9.85-1.9 1.9 0 .15.02.3.05.45-1.58-.08-3-1.23-3.63-2.92-.15.29-.23.62-.23.97 0 .67.34 1.26.85 1.61-.31-.03-.62-.12-.88-.24v.03c0 .94.67 1.72 1.56 1.9-.17.03-.34.05-.52.05-.12 0-.24 0-.36-.02.24.75.94 1.29 1.77 1.3-.65.51-1.46.81-2.33.81-.18 0-.36-.01-.54-.03.83.53 1.81.84 2.87.84 3.44 0 5.33-2.86 5.33-5.33l-.01-.24c.37-.27.69-.6.94-.96z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 2H4C2.89 2 2 2.89 2 4v16c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zM8 20h-2v-8h2v8zm-1-9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 9h-2V13c0-1.11-.89-2-2-2s-2 .89-2 2v7H7v-8h2V9c0-3.31 2.69-6 6-6s6 2.69 6 6v11z"></path>
  </svg>
);

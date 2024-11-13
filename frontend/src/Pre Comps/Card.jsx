import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import useFirebase from "../hooks/useFirebase";
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import Modal from "../Components/Utils/Modal";
import CopyToClipboard from "../Components/Utils/CopyToClipboard";
import useStatus from "../hooks/useStatus";
import { Button as SButton } from "../components/ui/button";

const addApplicationToDB = async (applicantEmail, jobId) => {
  try {
    const col = collection(db, "listing");
    const jobRef = doc(col, jobId);
    const jobSnapshot = await getDoc(jobRef);

    if (!jobSnapshot.exists) {
      throw new Error("Job not found");
    }
    // Check if the applicant already exists
    const existingApplicants = jobSnapshot.data().applicants || [];

    if (existingApplicants.includes(applicantEmail)) {
      throw new Error("Applicant already exists for this job");
    }
    // Add the new applicant
    await updateDoc(jobRef, {
      applicants: [...existingApplicants, applicantEmail],
    });
  } catch (error) {
    console.error("Error adding applicant:", error.message);
    throw error;
  }
};

export const Card = ({ post }) => {
  const { user } = useFirebase();
  const [hasApplied, setHasApplied] = useState(
    post.applicants && post.applicants.includes(user.email)
  );
  const [emailPopup, setEmailPopup] = useState(false);
  const { isLoading, setLoading, setIdle } = useStatus();
  const [showFullText, setShowFullText] = useState(false);

  const postCategory =
    post.category === "Human Resource" ? "HR" : post.category;

  const {
    email: apply_mail,
    link: apply_link,
    easy_apply,
  } = post.methods || {};

  const handleClick = useCallback(async () => {
    try {
      setLoading();
      await addApplicationToDB(user.email, post.id);
      toast("Successfully applied!");
      setHasApplied(true);
    } catch (error) {
      console.log(error.message);
      toast("Failed to apply");
    } finally {
      setIdle();
    }
  }, [setHasApplied]);

  return (
    <>
      <div className="text-left flex flex-col gap-2  rounded-xl shadow-xl p-[20px] mt-5 h-[max] border w-full">
        <div className="flex items-center gap-3">
          <Avatar className="h-[20px] w-[auto]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-[#ABAAAA]">{post.createdBy}</p>
        </div>
        <h3 className="text-xl font-semibold">{post.title}</h3>

        <p className="text-[#ABAAAA] lg:w-[75vw]">
          {post.description.length < 200 ? (
            post.description
          ) : (
            <>
              {showFullText
                ? post.description
                : post.description.slice(0, 200) + "....."}
              {post.description.length > 200 && (
                <SButton
                  variant="ghost"
                  className=" hover:bg-transparent h-0 text-blue-300"
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {showFullText ? "See less" : "See more"}
                </SButton>
              )}
            </>
          )}
        </p>

        <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-5 gap-5 lg:gap-0">
          <div className="flex gap-3">
            {/* Add null checks for postCategory, post.type, and post.payType */}
            <div
              className={`rounded-full bg-[#BADDF4] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {postCategory || "Not Specified"}
            </div>
            <div
              className={`rounded-full bg-[#75E2D9] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {post.type || " Not Specified"}
            </div>
            <div
              className={`rounded-full bg-[#E8DBEE] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {post.payType ? post.payType.split("/")[0] : "Not Specified"}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {apply_mail ? (
              <Button
                className=" bg-black h-[35px] rounded-[5px] text-white text-sm"
                disabled={emailPopup}
                onClick={() => setEmailPopup(true)}
              >
                Apply with email
              </Button>
            ) : null}
            {apply_link ? (
              <Button
                className=" bg-black h-[35px] rounded-[5px] text-white text-sm"
                href={
                  new String(apply_link).startsWith("https://")
                    ? apply_link
                    : `https://${apply_link}`
                }
                target="_blank"
              >
                Apply with link
              </Button>
            ) : null}
            {!hasApplied && easy_apply ? (
              <Button
                className=" bg-black h-[35px] rounded-[5px] text-white text-sm"
                onClick={handleClick}
                isProcessing={isLoading}
              >
                {isLoading ? "Applying" : "Easy Apply"}
              </Button>
            ) : (
              !apply_mail &&
              !apply_link && (
                <h3 className="text-md text-green-500 font-semibold">
                  Applied
                </h3>
              )
            )}
          </div>
        </div>
      </div>
      <Modal
        modal={emailPopup}
        closable={true}
        handleClose={() => setEmailPopup(false)}
      >
        <div>
          <h4 className="text-xl font-semibold text-gray-700">
            Apply with Email
          </h4>
          <CopyToClipboard textToCopy={apply_mail} />
        </div>
      </Modal>
    </>
  );
};

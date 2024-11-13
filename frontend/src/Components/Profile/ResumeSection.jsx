import React, { useState } from "react";
import PdfPreview from "../Resume/PdfPreview";
import UploadResume from "../Resume/UploadResume";
import { Delete, Edit } from "lucide-react";

const ResumeSection = ({ url, editable }) => {
  const [resumeURL, setResumeURL] = useState(url);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="main-section items-start w-full shadow-lg rounded-lg bg-white text-left relative">
      <div className=" absolute top-2 right-2 min-w-0 min-h-0">
        {!isEditMode && editable && (
          <button
            className="p-4 px-10 hover:bg-gray-200 rounded-lg"
            onClick={() => setIsEditMode(true)}
          >
            <Edit size={15} />
          </button>
        )}
        {isEditMode && editable && (
          <button
            className="p-4 px-10 hover:bg-gray-200 rounded-lg"
            onClick={() => setIsEditMode(false)}
          >
            <Delete size={15} />
          </button>
        )}
      </div>
      <div className="text-2xl font-bold px-10 pt-5"> Resume </div>
      {!isEditMode && resumeURL && (
        <PdfPreview url={resumeURL} className={"w-full min-h-[400px]"} />
      )}
      {!isEditMode && !resumeURL && (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">No resume uploaded</p>
        </div>
      )}
      {isEditMode && (
        <UploadResume
          className={"lg:px-10 lg:py-5 md:px-5 md:py-3 px-2 py-1 h-[400px]"}
          onUpload={(url) => {
            setResumeURL(url);
            setIsEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default ResumeSection;

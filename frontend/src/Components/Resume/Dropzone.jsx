import React, { useCallback, useState } from "react";
import DropZoneComponent from "react-dropzone";
import { FileInput, Label } from "flowbite-react";
import useStatus from "../../hooks/useStatus";
import useFirebase from "../../hooks/useFirebase";
import uploadFile from "../../lib/uploadFile";
import { toast } from "react-toastify";
import { updateResumeLink } from "./resume";

const Dropzone = ({ className, setFileURL }) => {
  const { isLoading, setIdle, setLoading } = useStatus();
  const { user } = useFirebase();

  const handleDrop = useCallback(
    async (files) => {
      if (files.length === 0) return;
      setLoading();
      try {
        const folderPath = `resume/${user.email}`;
        const url = await uploadFile(files[0], folderPath);
        await updateResumeLink(user.email, url);
        setFileURL(url);
        toast("Successfully updated the resume");
      } catch (error) {
        console.log(error.message);
        toast("Unable to upload file");
      } finally {
        setIdle();
      }
    },
    [setLoading]
  );

  //width and height should be set in label component

  return (
    <DropZoneComponent
      onDrop={handleDrop}
      maxFiles={1}
      disabled={isLoading}
      maxSize={2097152} // 2 MB
      accept={{
        "application/pdf": [".pdf"],
      }}
      onDropRejected={() => toast("Please upload a valid document")}
      useFsAccessApi={false}
    >
      {({ getRootProps, getInputProps }) => (
        <section className={`${className}`}>
          <div
            className="flex items-center justify-center w-full h-full"
            {...getRootProps()}
          >
            <Label
              htmlFor="dropzone-file"
              className={`dark:hover:bg-bray-800 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 
              w-full h-full 
              ${isLoading ? "bg-blue-300 border-blue-500" : null}`}
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5 ">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {!isLoading ? (
                  <>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop your resume
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF format{" "}
                      <span className="font-semibold">(MAXIMUM 2MB)</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-blue-500">
                      Uploading your resume
                    </p>
                  </>
                )}
              </div>
              <input className="hidden" type="text" {...getInputProps()} />
            </Label>
          </div>
        </section>
      )}
    </DropZoneComponent>
  );
};

export default Dropzone;

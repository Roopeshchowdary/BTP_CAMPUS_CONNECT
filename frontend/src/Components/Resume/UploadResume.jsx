import React, { useEffect, useState } from "react";
import Dropzone from "./Dropzone";

const UploadResume = ({ className, onUpload }) => {
  return (
    <div className={`${className}`}>
      <Dropzone
        className="w-full h-full scale-[80%] md:scale-90 lg:scale-95 xl:scale-100"
        setFileURL={onUpload}
      />
    </div>
  );
};

export default UploadResume;

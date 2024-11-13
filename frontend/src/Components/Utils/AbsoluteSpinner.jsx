import React from "react";
import { Spinner } from "flowbite-react";

const AbsoluteSpinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-300 bg-opacity-50">
      <Spinner size={"lg"} />
    </div>
  );
};

export default AbsoluteSpinner;

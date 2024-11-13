import { useCallback, useEffect, useState } from "react";
import DropdownIcon from "../../../assets/dropdown.png";
import Applicants from "./Applicants";

const Listing = ({ post }) => {
  const [showApplicants, setShowApplicants] = useState(false);

  const toggleShowApplicants = useCallback(
    () => setShowApplicants((prev) => !prev),
    [setShowApplicants]
  );

  return (
    <div className="text-left flex flex-col gap-2  rounded-xl shadow-xl p-[20px] mt-5 h-[max] border w-full relative">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <button onClick={toggleShowApplicants}>
          <img
            src={DropdownIcon}
            alt="drop"
            className={`w-6 h-6 ${showApplicants ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      <p className="text-[#ABAAAA]">{post.description}</p>
      <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-5 gap-5 lg:gap-0">
        <div className="flex gap-3">
          <div
            className={`rounded-full bg-[#BADDF4] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
          >
            {post.category || "Category Not Specified"}
          </div>
          <div
            className={`rounded-full bg-[#75E2D9] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
          >
            {post.type || "Type Not Specified"}
          </div>
          <div
            className={`rounded-full bg-[#E8DBEE] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
          >
            {post.payType
              ? post.payType.split("/")[0]
              : "Payment Type Not Specified"}
          </div>
        </div>
      </div>
      {showApplicants && (
        <div className="mt-5 p-5 relative">
          <Applicants post={post} />
        </div>
      )}
    </div>
  );
};

export default Listing;

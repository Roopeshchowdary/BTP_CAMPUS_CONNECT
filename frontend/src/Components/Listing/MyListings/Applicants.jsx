import { useCallback, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { selectApplicantsByIds } from "../../../store/MYLISTINGS_STORE/myListingsSlice";
import { MY_LISTINGS } from "../../../store/MYLISTINGS_STORE/myListingsActions";
import NavigationIcon from "../../../assets/backward_arrow.png";
import { useState } from "react";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;
const APPLICANTS_PAGE_SIZE = 3;

const Applicants = ({ post }) => {
  const [applicantsInfo, setApplicantsInfo] = useState({
    pageNo: 0,
    hasNext: post.applicants?.length > APPLICANTS_PAGE_SIZE,
    hasPrev: false,
    currentIds: post.applicants?.slice(
      0,
      Math.min(post.applicants?.length, APPLICANTS_PAGE_SIZE)
    ),
  });

  const applicants = useSelector((state) =>
    selectApplicantsByIds(
      state.myListingsData.applicants,
      applicantsInfo.currentIds
    )
  );

  useEffect(() => {
    MY_LISTINGS.fetchApplicants(applicantsInfo.currentIds);
  }, [applicantsInfo.currentIds]);

  const next = useCallback(() => {
    setApplicantsInfo((prev) => ({
      pageNo: prev.pageNo + 1,
      hasPrev: true,
      hasNext:
        (prev.pageNo + 2) * APPLICANTS_PAGE_SIZE < post.applicants.length,
      currentIds: post.applicants?.slice(
        (prev.pageNo + 1) * APPLICANTS_PAGE_SIZE,
        Math.min(
          post.applicants?.length,
          (prev.pageNo + 2) * APPLICANTS_PAGE_SIZE
        )
      ),
    }));
  }, [setApplicantsInfo]);

  const prev = useCallback(() => {
    setApplicantsInfo((prev) => ({
      pageNo: prev.pageNo - 1,
      hasPrev: prev.pageNo > 1,
      hasNext: true,
      currentIds: post.applicants?.slice(
        (prev.pageNo - 1) * APPLICANTS_PAGE_SIZE,
        Math.min(post.applicants?.length, prev.pageNo * APPLICANTS_PAGE_SIZE)
      ),
    }));
  }, [setApplicantsInfo]);

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Resume</Table.HeadCell>
          <Table.HeadCell>Profile</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {applicants?.map((applicant) => {
            return (
              <>
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={applicant.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {applicant.name}
                  </Table.Cell>
                  <Table.Cell>{applicant.id}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {applicant.resume ? (
                      <a
                        href={applicant.resume}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        target="_blank"
                      >
                        Resume
                      </a>
                    ) : (
                      <span className="text-sm">Not specified</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href={`${APP_URL}/user/${applicant.email}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      target="_blank"
                    >
                      Profile
                    </a>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
      <div className="mt-5 flex px-5 w-full justify-between">
        {applicantsInfo.hasPrev && (
          <button className="bg-transparent hover:bg-gray-400 p-2 rounded-md">
            <img src={NavigationIcon} className="w-5 h-5 " onClick={prev} />
          </button>
        )}
        {applicantsInfo.hasNext && (
          <button className="bg-transparent hover:bg-gray-400 p-2 rounded-md ml-auto">
            <img
              src={NavigationIcon}
              className=" rotate-180 w-5 h-5"
              onClick={next}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Applicants;

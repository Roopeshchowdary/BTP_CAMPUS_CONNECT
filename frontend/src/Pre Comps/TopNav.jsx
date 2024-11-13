import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const TopNav = ({ searchSetter }) => {
  const user = useSelector((state) => state.userData.user);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast("Successfully logged out!");
      navigate("/intro");
    } catch (error) {
      toast("Unable to logout");
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="flex mb-3 items-center justify-between px-5 pt-3">
        <div className="flex gap-5 justify-center items-center">
          <img
            src="https://photos.wellfound.com/startups/i/9819723-4cd1303e83b5cb300b722519b15a41fc-medium_jpg.jpg?buster=1696763623"
            alt=""
            className="w-[40px] h-[auto] rounded-full"
          />
          <Link
            className="font-bold text-md md:text-lg lg:text-xl text-left block"
            to={`/blogs`}
          >
            Campus-Connect
          </Link>
          <input
            type="text"
            placeholder="Search listings"
            className="border w-[350px] h-[40px] px-5 rounded-full hidden lg:block"
            onChange={(e) => searchSetter(e.target.value)}
          />
        </div>
        <div className="flex gap-3 lg:gap-[50px] items-center ml-5">
          <Link to="/blogs" className="text-[#A2A3A2]  lg:block  hidden">
            Home
          </Link>

          <Link
            to="/listing"
            className="gap-2 justify-center items-center font-semibold  lg:flex  hidden"
          >
            Opportunities
            <span className="bg-[#1B63F2] px-2  rounded-full text-white text-xs py-0.5 font-normal">
              Hiring
            </span>
          </Link>
          <Link to="/profile" className="text-[#A2A3A2]  lg:block hidden">
            Profile
          </Link>
          {/* <Avatar className="w-[32px] lg:w-[40px] h-[auto] hidden lg:block">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="block ">
              <div className="flex items-center gap-1">
                <Avatar className="w-[32px] lg:w-[40px] h-[auto]">
                  <AvatarImage src={user?.photoURL} alt="@shadcn" />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-[15px] h-[auto]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-[200px] justify-center items-center pt-5 pb-5 gap-3 mr-2 mt-2">
              <Link to="/blogs" className="text-[#A2A3A2] lg:hidden ">
                Home
              </Link>
              <Link
                to="/listing"
                className="gap-2 justify-center items-center font-semibold lg:hidden "
              >
                Opportunities
              </Link>
              <Link to="/profile" className="text-[#A2A3A2] lg:hidden ">
                Profile
              </Link>
              <Link to="/mylisting" className="text-[#A2A3A2]  ">
                My Listings
              </Link>
              <Link to="/myblogs" className="text-[#A2A3A2]  ">
                My Blogs
              </Link>
              <Link
                onClick={handleLogout}
                disabled={isLoading}
                className="text-[#A2A3A2]"
              >
                Logout
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="border h-[40px] px-5 rounded-full block lg:hidden mb-4 w-[100%]"
        onChange={(e) => searchSetter(e.target.value)}
      />

      <div className="flex justify-around fixed bottom-0 z-50 w-full bg-white h-[35px] lg:hidden">
        <Link to="/blogs">
          <span>
            <FontAwesomeIcon icon={faHouse} />
          </span>
        </Link>
        <Link to="/listing">
          <span>
            <FontAwesomeIcon icon={faBriefcase} />
          </span>
        </Link>
        <Link to="/profile">
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </Link>
      </div>
    </>
  );
};

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import { useState, useCallback, useEffect } from "react";
import { useFirebaseContext } from "../../Context/FirebaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import searchUser from "../Profile/searchProfile";
import defaultImg from "../../assets/default_image.png";
import { Button } from "../../components/ui/button";

export const TopNavbar = () => {
  const user = useSelector((state) => state.userData.user);

  const [searchResult, setSearchResult] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const { signOut } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const navigate = useNavigate();

  const { searchPage, setSearchPage } = useFirebaseContext();
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

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const contentHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight >= contentHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHome = () => {
    //  console.log("Before setting searchPage:", searchPage);
    setCurrentPage("home");

    if (!searchPage) {
      setSearchPage(true);
    }
  };

  const handleOppo = () => {
    setCurrentPage("opportunities");
    if (searchPage) {
      setSearchPage(false);
    }
  };

  const handleProfile = () => {
    setCurrentPage("profile");
  };
  const handleMyListing = () => {
    setCurrentPage("mylisting");
  };
  const handleMyBlogs = () => {
    setCurrentPage("blogs");
  };

  const location = useLocation();

  async function handleSearch(name) {
    const response = await searchUser(name);
    setSearchResult(response);
  }

  function searchResultRenderer() {
    return (
      <div className="absolute top-[62px] w-full z-10 flex flex-col justify-center items-center lg:items-start rounded-lg gap-1 bg-slate-100 bg-opacity-50">
        {searchResult.map((user) => {
          return (
            <Button
              className="w-full md:w-1/2 bg-slate-200 flex gap-8 lg:ml-60 p-4 items-center justify-start rounded-lg text-black hover:text-slate-200"
              key={user.email}
              onClick={() => {
                setSearchResult([]);
                navigate(`/user/${user.email}`);
              }}
            >
              <img
                src={user.photoUrl ? user.photoUrl : defaultImg}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <p>{user.name}</p>
            </Button>
          );
        })}
      </div>
    );
  }

  function searchRenderer() {
    if (location.pathname === "/profile") {
      return (
        <input
          type="text"
          placeholder="Search users"
          className="border lg:w-[350px] h-[40px] px-5 rounded-full  "
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={(e) => {
            setInputFocus(false);
            setTimeout(() => {
              setSearchResult([]);
              e.target.value = "";
            }, 200);
          }}
        />
      );
    }
  }

  return location.pathname !== "/listing" ? (
    <>
      <div className="flex mb-3 items-center justify-between px-5 pt-3  relative">
        <div className="flex gap-5 justify-center items-center">
          <img
            src="https://photos.wellfound.com/startups/i/9819723-4cd1303e83b5cb300b722519b15a41fc-medium_jpg.jpg?buster=1696763623"
            alt=""
            className="w-[40px] h-[auto] rounded-full"
          />
          <Link
            className="font-bold text-md md:text-lg lg:text-xl text-left block"
            to={`/blogs`}
            onClick={handleHome}
          >
            Campus-Connect
          </Link>
          {searchRenderer()}
        </div>
        {searchResultRenderer()}
        <div className="flex gap-3 lg:gap-[50px] items-center ml-5">
          <Link
            to="/blogs"
            className={`lg:block hidden ${
              location.pathname === "/blogs"
                ? "text-black font-bold"
                : "text-[#A2A3A2]"
            }`}
            onClick={handleHome}
          >
            Home
          </Link>

          <Link
            to="/listing"
            className={`gap-2 justify-center items-center font-semibold  lg:flex  hidden ${
              location.pathname === "/listing"
                ? "text-black font-bold"
                : "text-[#A2A3A2]"
            }`}
            onClick={handleOppo}
          >
            Opportunities
            <span className="bg-[#1B63F2] px-2  rounded-full text-white text-xs py-0.5 font-normal">
              Hiring
            </span>
          </Link>
          <Link
            to="/profile"
            className={`text-[#A2A3A2]  lg:block hidden ${
              location.pathname === "/profile"
                ? "text-black font-bold"
                : "text-[#A2A3A2]"
            }`}
          >
            Profile
          </Link>
          {/* <Link
            to="/project"
            className={`text-[#A2A3A2]  lg:block hidden ${
              location.pathname === "/project"
                ? "text-black font-bold"
                : "text-[#A2A3A2]"
            }`}
          >
            Projects
          </Link> */}
          {/* <Link     onClick={handleLogout}
            disabled={isLoading}  > Logout
        </Link> */}
          {/* <Avatar className="w-[32px] lg:w-[40px] h-[auto] hidden lg:block">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="block ">
              {/* lg:hidden */}
              <div className="flex items-center gap-1">
                <Avatar className="w-[32px] lg:w-[40px] h-[auto]">
                  <AvatarImage
                    className="cursor-pointer"
                    src={user?.photoURL}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {user?.name ? user?.name[0] : null}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-[15px] h-[auto] cursor-pointer" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-[200px] justify-center items-center pt-5 pb-5 gap-3 mr-2 mt-2">
              <Link
                to="/blogs"
                className={`font-bold lg:hidden ${
                  "home" !== currentPage && "text-[#A2A3A2]"
                } `}
                onClick={handleHome}
              >
                Home
              </Link>

              <Link
                to="/listing"
                className={`gap-2 justify-center items-center lg:hidden font-bold ${
                  "profile" !== currentPage && "text-[#A2A3A2]"
                }`}
                onClick={handleOppo}
              >
                Opportunities
              </Link>
              <Link
                to="/profile"
                className={`font-bold lg:hidden ${
                  "profile" !== currentPage && "text-[#A2A3A2]"
                } `}
                onClick={handleProfile}
              >
                Profile
              </Link>
              <Link
                to="/mylisting"
                className={`font-bold ${
                  "mylisting" !== currentPage && "text-[#A2A3A2]"
                }  `}
                onClick={handleMyListing}
              >
                My Listing
              </Link>
              <Link
                to="/myblogs"
                className={`font-bold ${
                  "blogs" !== currentPage && "text-[#A2A3A2]"
                }`}
                onClick={handleMyBlogs}
              >
                My Blogs
              </Link>
              <Link
                onClick={handleLogout}
                disabled={isLoading}
                className="font-bold"
              >
                Logout
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* <input
        type="text"
        placeholder="Search"
        className="border h-[40px] px-5 rounded-full block mb-4 w-[100%]"
        onChange={(e) => searchSetter(e.target.value)}
      /> */}

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
  ) : null;
};

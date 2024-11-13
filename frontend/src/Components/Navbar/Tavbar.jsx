import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import useFirebase from "../../hooks/useFirebase";
import { Button } from "flowbite-react";

function Tavbar() {
  const { isVerified, signOut } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [baricon, setbaricon] = useState(1);
  const [dropdownclass, setDropdownclass] = useState("drop-down-menu");
  const [iconClass, setIconClass] = useState("faBars");
  const navigate = useNavigate();
  // const currentUser = auth?.currentUser;
  // console.log(isVerified);

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
  const handleDropDownIcon = () => {
    setbaricon(baricon === 1 ? 0 : 1);
    setIconClass(baricon === 0 ? "faBars" : "faXmark");
    setDropdownclass(baricon === 0 ? "drop-down-menu" : "drop-down-menu open");
  };

  return (
    <nav className="bg-gray-800 sm:p-2 p-4">
      <div className="  lg:mx-4 md:mx-4 m-2 flex justify-center items-center ">
        <div className="flex items-center">
          <img
            src="https://photos.wellfound.com/startups/i/9819723-4cd1303e83b5cb300b722519b15a41fc-medium_jpg.jpg?buster=1696763623"
            alt="campusconnect"
            className="h-8 w-8 mr-2  rounded-full"
          />
          <span className="text-white lg:text-lg font-semibold text-md">
            <Link to="/signin">Campus Connect</Link>
          </span>
        </div>

        {/* <div className="flex items-center sm:mr-2 mr-4">
        <button className="text-white lg:mr-4 md:mr-4 mr-2 lg:text-lg md:text-lg text-sm font-semibold">
        <Link to="/signin" >Sign In</Link>
        </button>
        <button className="text-white pointer lg:text-lg md:text-lg text-sm font-semibold">
          <Link to="/signin" >Sign Out</Link>
        </button>
      </div> */}
      </div>
    </nav>
  );
}

export default Tavbar;

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import ProfileData from "./profile.modal";
import { toast } from "react-toastify";

export default function Reccomendation({
  email: myEmail,
  userEmail,
  editable = true,
}) {
  const [users, setUsers] = useState([]);

  const email = editable ? myEmail : userEmail;

  async function init() {
    if (!email) return;

    try {
      const response = await ProfileData.recommendations(email);
      setUsers(response);
    } catch (error) {
      console.log(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const shareOnClick = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);
      toast("Link copied to clipboard");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  const handleFollow = async () => {
    try {
      await ProfileData.updateFollowing(email, users[0].email);

      await ProfileData.updateFollowers(users[0].email, email);
      toast(`You are now following ${users[0].name}`);
    } catch (error) {
      toast("error while following");
      console.log(error);
    }
  };

  return (
    <div className="main-section flex flex-col justify-between gap-5 items-start w-full shadow-lg px-10 py-5  rounded-lg bg-white text-left  md:min-w-[500px] md:min-h-[250px]">
      <div className="text-2xl font-bold">
        {" "}
        {users.length === 0
          ? "No similar profile found "
          : "Similar profiles"}{" "}
      </div>

      {users.length > 0 && (
        <div className=" flex flex-col md:flex-row justify-between gap-10 items-center w-full ">
          <div className="img w-1/2 sm:w-1/3 md:w-1/4 box-border">
            <div className="img-wrapper rounded-full overflow-hidden bg-red-100 w-full h-full">
              <img
                src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className=" w-full md:w-3/4 flex flex-col justify-between items-center gap-4 md:gap-0">
            <div className="user-details flex justify-between flex-col md:flex-row items-start  w-full">
              <div className="names flex flex-col  mb-10 justify-start items-start">
                <div className="mb-2 font-bold">{users[0].name}</div>
                <div>{users[0].position}</div>
                <div>{users[0].bio}</div>
                <div className="text-sm font-bold">
                  {" "}
                  <span>
                    {users[0].followers ? users[0].followers.length : 0}
                  </span>
                  <span> followers</span>
                </div>

                <div className="text-sm font-bold">
                  {" "}
                  <span>
                    {users[0].following ? users[0].following.length : 0}
                  </span>
                  <span> following</span>
                </div>
              </div>
              <div className="location text-sm font-medium">
                {users[0].state} , {users[0].country}
              </div>
            </div>
            <div className="buttons flex justify-between items-center w-full pr-3">
              <Button
                className="bg-blue-700 w-1/3 rounded-full"
                onClick={() => handleFollow()}
              >
                {users[0].following
                  ? users[0].following.includes(email)
                    ? "Following"
                    : "Follow"
                  : "Follow"}
              </Button>
              {/* <Button
              variant="outline"
              className=" w-1/3 rounded-full text-blue-700 border-blue-700 p-1"
            >
              Connections
            </Button> */}

              <Button variant="ghost" onClick={() => shareOnClick()}>
                <ShareIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

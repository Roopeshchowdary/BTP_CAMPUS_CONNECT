import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStatus from "../../hooks/useStatus";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

async function isFirstSigin(email) {
  try {
    const userRef = doc(db, "users", email);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const PrivateRoute = () => {
  const { user, isVerified } = useFirebase();
  const navigate = useNavigate();
  const { isLoading, setLoading, setIdle } = useStatus();

  useEffect(() => {
    const verify = async () => {
      try {
        if (user && (await isFirstSigin(user.email))) {
          return navigate("/profile_update");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (!user || !isVerified) return;

    setLoading();
    verify().finally(() => setIdle());
  }, []);

  if (isLoading) {
    return <AbsoluteSpinner />;
  }

  if (!user) {
    return <Navigate to={"/intro"} />;
  } else if (!isVerified) {
    toast("Verify your email before singin");
    return <Navigate to={"/intro"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

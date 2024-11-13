import useFirebase from "../../hooks/useFirebase";
import Tavbar from "./Tavbar";
import { TopNavbar } from "./TopNavbar";

function Navbar() {
  const { isVerified, signOut, user } = useFirebase();

  return <>{isVerified ? <TopNavbar user={user} /> : <Tavbar />}</>;
}
export default Navbar;

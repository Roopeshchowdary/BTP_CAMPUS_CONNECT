import { useContext } from "react";
import { FirebaseContext } from "../Context/FirebaseContext";

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;

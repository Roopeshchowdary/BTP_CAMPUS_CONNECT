

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "./../../../Firebase/firebase";
import { FirebaseContext } from "../../../Context/FirebaseContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
 const {user} = useContext(FirebaseContext);
 const INITIAL_STATE={
  chatId: "null",
  user:{},
 };

 const chatReducer = (state, action) =>{
  switch(action.type){
    case "CHANGE_USER":
      return {
        user: action.payload,
        charId: user.uid > action.payload.uid ? user.uid + action.payload.uid 
        : action.payload.uid + user.uid,
      };
    default:
      return state;
  }
 };
const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

 return (
    <AuthContext.Provider value={{ data:state, dispatch }}>
      {children}
    </AuthContext.Provider>
 );
};

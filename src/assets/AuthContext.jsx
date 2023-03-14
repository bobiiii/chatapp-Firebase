import React, { createContext, useState } from "react";


export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {

    
  const [userData, setUserData] = useState({})
  const [userId, setUserId]= useState("")

  // const API_URL = "http://127.0.0.1:5000" 

  const API_URL = "https://comfortable-gold-belt.cyclic.app"
  
  return (
    <AuthContext.Provider value={{userData, setUserData, userId, setUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({ email: "", mobile_number: "" });
  const [advanceSearch, setAdvanceSearch] = useState(null);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, advanceSearch, setAdvanceSearch }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

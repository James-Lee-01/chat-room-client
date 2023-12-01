// UserContext.js
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem("chatUsername") || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("chatUserId") || "");


  const login = (name) => {
    const newUserId = uuidv4();
    sessionStorage.setItem("chatUsername", name);
    sessionStorage.setItem("chatUserId", newUserId);
    setUsername(name);
    setUserId(newUserId);
  };

  const logout = () => {
    sessionStorage.removeItem("chatUsername");
    sessionStorage.removeItem("chatUserId");
    setUsername("");
    setUserId("");
  };

  return (
    <UserContext.Provider value={{ username, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Error Handling
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem("chatUsername") || "");

  const login = (name) => {
    sessionStorage.setItem("chatUsername", name);
    setUsername(name);
  };

  const logout = () => {
    sessionStorage.removeItem("chatUsername");
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ username, login, logout }}>
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

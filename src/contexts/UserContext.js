// UserContext.jsx
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 使用 uuidv4 來產生亂數
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem("chatUsername") || ""); // username
  const [userId, setUserId] = useState(sessionStorage.getItem("chatUserId") || ""); // userId


  // 使用者登入，使用sessionStorage來儲存
  const login = (name) => {
    const newUserId = uuidv4();
    sessionStorage.setItem("chatUsername", name);
    sessionStorage.setItem("chatUserId", newUserId);
    setUsername(name);
    setUserId(newUserId);
  };

  // 使用者登出
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

UserProvider.propTypes = {
  children: PropTypes.node,
}

// Error Handling
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

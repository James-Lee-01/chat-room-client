// UserContext.jsx
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid"; // 使用 uuidv4 來產生亂數
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem("chatUsername") || ""); // username
  const [userId, setUserId] = useState(sessionStorage.getItem("chatUserId") || ""); // userId


  // 使用者登入，使用sessionStorage來儲存
  const login = useCallback((name) => {
    const newUserId = uuidv4();
    sessionStorage.setItem("chatUsername", name);
    sessionStorage.setItem("chatUserId", newUserId);
    setUsername(name);
    setUserId(newUserId);
  }, [])

  // 使用者登出
  const logout = useCallback(() => {
    sessionStorage.removeItem("chatUsername");
    sessionStorage.removeItem("chatUserId");
    setUsername("");
    setUserId("");
  }, [])

  const contextValue = useMemo(() => ({ username, userId, login, logout }), [username, userId, login, logout]);

  return (
    <UserContext.Provider value={contextValue}>
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

import React, { Children, createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

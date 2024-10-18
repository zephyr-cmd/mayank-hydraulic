import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(); // Step 1: Create the context

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {/* // Step 2: Wrap children components */}
      {children}
    </AuthContext.Provider>
  );
};

// Step 4: Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

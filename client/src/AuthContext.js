import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const verifyToken = async () => {
      if (!cookies.token) {
        setCurrentUser(null);
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/users/verifyToken",
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`
            },
            withCredentials: true
          }
        );

        const { status, user } = data;
        if (status) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setCurrentUser(null);
      }
    };

    verifyToken();
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

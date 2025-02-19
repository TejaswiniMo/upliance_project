import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password") {
          const user = { id: "1", email };
          setCurrentUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signUp = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: Date.now().toString(), email };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        resolve();
      }, 1000);
    });
  };

  const signOut = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

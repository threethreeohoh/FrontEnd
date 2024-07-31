import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const updateUsername = (name) => {
    setUsername(name);
    if (name) {
      localStorage.setItem('username', name);
    } else {
      localStorage.removeItem('username');
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername: updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

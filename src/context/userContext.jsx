import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Nidhi Mehta',
    accountType: 'Investor', // Example data, replace with real user data
    // Add other user-related data here
  });

  const logout = () => {
    // Implement your logout functionality here
    console.log('Logout clicked');
    setUser(null); // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

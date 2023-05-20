import React, {createContext, useEffect, useState} from 'react';
import DeviceStorage from '../utils/DeviceStorage';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await DeviceStorage.loadItem('token');
      const userType = await DeviceStorage.loadItem('userType');
      const id = await DeviceStorage.loadItem('id');

      if (token && userType && id) {
        setUser({token, userType, id});
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

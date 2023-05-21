import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authContext';
import TabNav from './TabNav';
import MainNav from './MainNav';

const RootNav = () => {
  const {user} = useContext(AuthContext);

  console.log('user in root nav ->', user);

  return (
    <NavigationContainer>
      {user && user.id !== null ? (
        user.userType === 'Gardener' ? (
          <MainNav />
        ) : (
          <TabNav />
        )
      ) : (
        <TabNav />
      )}
    </NavigationContainer>
  );
};

export default RootNav;

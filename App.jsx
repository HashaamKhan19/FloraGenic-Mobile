import 'react-native-gesture-handler';
import React from 'react';
import TabNav from './src/navigation/TabNav';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AuthProvider from './src/context/authContext';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {IColors} from './src/utils/IColors';

const client = new ApolloClient({
  uri: 'https://floragenic.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const hello = () => {
  return (
    <AlertNotificationRoot theme="light" colors={[IColors]}>
      <AuthProvider>
        <ApolloProvider client={client}>
          <TabNav />
        </ApolloProvider>
      </AuthProvider>
    </AlertNotificationRoot>
  );
};

export default hello;

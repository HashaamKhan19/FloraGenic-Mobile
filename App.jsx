import 'react-native-gesture-handler';
import React from 'react';
import TabNav from './src/navigation/TabNav';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://floragenic.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const hello = () => {
  return (
    <ApolloProvider client={client}>
      <TabNav />
    </ApolloProvider>
  );
};

export default hello;

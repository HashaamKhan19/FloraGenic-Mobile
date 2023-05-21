import React, {createContext, useEffect, useState} from 'react';
import DeviceStorage from '../utils/DeviceStorage';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const GET_PROFILE_DETAILS = gql`
  query ProfileDetails {
    profileDetails {
      id
      email
      userType
      details {
        ... on Customer {
          id
          firstName
          lastName
          nationality
          phoneNumber
          gender
          image
          createdAt
          updatedAt
          addresses {
            name
            location
            pin
            id
            city
            setAsDefault
          }
          payments {
            id
            cardHolderName
            cardNumber
            cardExpiryDate
            cardCVV
            userID
          }
        }
        ... on Gardener {
          id
          firstName
          lastName
          gender
          phoneNumber
          city
          CNIC
          price
          duration
          rating
          experience
          image
          createdAt
          updatedAt
        }
      }
    }
  }
`;

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

  const {data, loading, error} = useQuery(GET_PROFILE_DETAILS, {
    client,
    onCompleted: data => {
      console.log('user in context after calling profile :', data);
      setUser(prev => ({...prev, ...data.profileDetails}));
    },
    onError: error => {
      console.log('error in context after calling profile :', error);
    },
  });

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

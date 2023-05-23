import React, {createContext, useState, useContext} from 'react';
import {notification} from '../components/Popups/Alert';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  useMutation,
  useQuery,
} from '@apollo/client';
import DeviceStorage from '../utils/DeviceStorage';
import {AuthContext} from './authContext';
import {CREATE_CART_ITEM, DELETE_CART_ITEM, GET_CART_ITEMS} from './cart-query';

export const ShopContext = createContext({});

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

const ShopContextProvider = props => {
  const {user} = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [processing, setProcessing] = useState(false);

  const totalPrice =
    cartItems.reduce((total, item) => total + item.totalPrice, 0) || 0;

  const {loading, error, data} = useQuery(GET_CART_ITEMS, {
    client,
    onCompleted: data => {
      setCartItems(data.cartItems);
      setProcessing(false);
    },
    onError: error => {
      notification('error', error.message);
      setProcessing(false);
    },
    skip: !user,
  });

  const [addToCartMutation] = useMutation(CREATE_CART_ITEM, {
    client,
    onCompleted: data => {
      setCartItems(data.cartItemCreate);
      setProcessing(false);
    },
    onError: error => {
      notification('error', error.message);
      setProcessing(false);
    },
  });

  const [removeFromCartMutation] = useMutation(DELETE_CART_ITEM, {
    client,
    onCompleted: data => {
      setCartItems(data.cartItemDelete);
      setProcessing(false);
    },
    onError: error => {
      notification('error', error.message);
      setProcessing(false);
    },
  });

  const [removeCompletelyFromCartMutation] = useMutation(DELETE_CART_ITEM, {
    client,
    onCompleted: () => {
      setCartItems([]);
      setProcessing(false);
    },
    onError: error => {
      notification('error', error.message);
      setProcessing(false);
    },
  });

  const addToCart = (product, quantity) => {
    if (!user) return notification('warning', 'Please login to add to cart');

    setProcessing(true);
    addToCartMutation({
      variables: {
        data: {
          productID: product,
          quantity: quantity,
        },
      },
    });
  };

  const removeFromCart = id => {
    if (!user)
      return notification('warning', 'Please login to remove from cart');
    setProcessing(true);
    removeFromCartMutation({
      variables: {
        cartItemDeleteId: id,
      },
    });
  };

  const clearCart = () => {
    if (!user) return notification('warning', 'Please login to clear cart');
    setProcessing(true);
    removeCompletelyFromCartMutation();
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    processing,
    totalPrice,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

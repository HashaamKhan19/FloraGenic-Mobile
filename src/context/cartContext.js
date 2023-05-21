import React, {createContext, useState} from 'react';

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = item => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeItem = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const increaseQuantity = itemId => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      }),
    );
  };

  const decreaseQuantity = itemId => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export {CartContext, CartProvider};

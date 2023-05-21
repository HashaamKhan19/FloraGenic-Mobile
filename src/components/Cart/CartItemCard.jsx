import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {CartContext} from '../../context/cartContext';
import Minus from '../../assets/svg/minus.svg';
import Plus from '../../assets/svg/plus.svg';

const CartItemCard = ({item}) => {
  const {increaseQuantity, decreaseQuantity, removeItem} =
    useContext(CartContext);

  const handleIncreaseQuantity = () => {
    increaseQuantity(item.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(item.id);
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nursery}>{item.nursery}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecreaseQuantity}>
          <Minus size={24} fill="black" />
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity onPress={handleIncreaseQuantity}>
          <Plus size={24} fill="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeIconContainer}
        onPress={handleRemoveItem}>
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nursery: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeIconContainer: {
    marginLeft: 10,
  },
});

export default CartItemCard;

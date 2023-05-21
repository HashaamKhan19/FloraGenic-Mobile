import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {CartContext} from '../../context/cartContext';
import Minus from '../../assets/svg/minus.svg';
import Plus from '../../assets/svg/plus.svg';
import Trash from '../../assets/svg/trash.svg';
import Colors from '../../utils/Colors';
import dimensions from '../../utils/Dimensions';

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
      <Image source={{uri: item.image}} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nursery}>{item.nursery}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecreaseQuantity}>
          <Minus
            width={dimensions.Width / 28}
            height={dimensions.Height / 28}
            fill="black"
          />
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity onPress={handleIncreaseQuantity}>
          <Plus
            width={dimensions.Width / 28}
            height={dimensions.Height / 28}
            fill="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeIconContainer}
        onPress={handleRemoveItem}>
        <Trash size={24} fill={Colors.red} />
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
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Urbanist-Medium',
    color: Colors.black,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Urbanist-Medium',
    color: Colors.red,
    marginTop: 4,
  },
  nursery: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    color: Colors.secondaryGreen,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    fontFamily: 'Urbanist-Medium',
    color: Colors.black,
  },
  removeIconContainer: {
    marginHorizontal: 10,
  },
});

export default CartItemCard;

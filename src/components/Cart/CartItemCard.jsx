import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ShopContext} from '../../context/shopContextProvider';
import Minus from '../../assets/svg/minus.svg';
import Plus from '../../assets/svg/plus.svg';
import Trash from '../../assets/svg/trash.svg';
import Colors from '../../utils/Colors';
import dimensions from '../../utils/Dimensions';
import {ActivityIndicator} from 'react-native-paper';

const CartItemCard = ({item}) => {
  const {addToCart, removeFromCart, processing} = useContext(ShopContext);

  const handleIncreaseQuantity = () => {
    addToCart(item.productDetails.id, 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      addToCart(item.productDetails.id, -1);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  console.log('item in cart item card: ', item);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.productDetails.images[0]}}
        style={styles.image}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.productDetails.name}</Text>
        <Text style={styles.price}>Rs. {item.productDetails.retailPrice}</Text>
      </View>

      <View style={styles.quantityContainer}>
        {processing ? (
          <TouchableOpacity>
            <ActivityIndicator size={'small'} color="black" />
          </TouchableOpacity>
        ) : (
          <>
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
          </>
        )}
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
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
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
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.black,
  },
  price: {
    fontSize: 22,
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

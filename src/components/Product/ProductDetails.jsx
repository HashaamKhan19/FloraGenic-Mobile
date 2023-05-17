import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Star from '../../assets/svg/star.svg';
import HeartIcon from '../../assets/svg/heartIcon.svg';
import Colors from '../../utils/Colors';
import ImageCarousel from './ImageCarousel';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Logic to add the product to the cart
    console.log('Product added to cart!');
  };

  const images = [
    require('../../assets/images/plant2.jpeg'),
    require('../../assets/images/plant3.jpeg'),
    require('../../assets/images/plant4.jpg'),
  ];

  return (
    <View style={styles.container}>
      <ImageCarousel images={images} />

      <View style={styles.nameCont}>
        <Text style={styles.name}>Product Name</Text>
        <HeartIcon fill={Colors.secondaryGreen} />
      </View>

      <View style={styles.row}>
        <View style={styles.soldCont}>
          <Text style={styles.amountSold}>100 Sold</Text>
        </View>

        <View style={styles.innerRow}>
          <Star fill={Colors.secondaryGreen} />
          <Text style={styles.rating}>4.5</Text>
          <Text style={styles.reviews}>(100 Reviews)</Text>
        </View>
      </View>

      <View style={styles.line} />

      <Text style={styles.heading}>Description</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
        lorem id arcu volutpat, ac fringilla odio efficitur. Sed eu mauris eu
        neque blandit eleifend nec in mauris. Quisque id efficitur nisi.
      </Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantity:</Text>
        <View style={styles.quantityCont2}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.priceContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>Total Price</Text>
          <Text style={styles.price}>$99.99</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  line: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
    width: '100%',
  },
  nameCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
    marginTop: 20,
  },
  soldCont: {
    backgroundColor: Colors.lightGreen,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 320,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    gap: 16,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
  reviews: {
    color: Colors.secondaryGreen,
  },
  rating: {
    marginRight: 8,
    color: 'black',
  },
  amountSold: {
    color: Colors.secondaryGreen,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black',
    width: '100%',
    textAlign: 'left',
  },
  description: {
    marginBottom: 16,
    textAlign: 'left',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quantityText: {
    marginRight: 16,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: Colors.secondaryGreen,
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 8,
    color: Colors.secondaryGreen,
    fontWeight: 'bold',
  },
  quantityCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    width: 100,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    marginRight: 16,
    color: 'black',
  },
  totalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  addToCartButton: {
    backgroundColor: Colors.secondaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 23,
    borderRadius: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;

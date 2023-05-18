import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgCont}>
        <ImageCarousel images={images} />
      </View>

      <View style={styles.SecCont}>
        <View style={styles.nameCont}>
          <Text style={styles.name}>Product Name</Text>
          <TouchableOpacity>
            <HeartIcon fill={Colors.secondaryGreen} />
          </TouchableOpacity>
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
          neque blandit eleifend nec in mauris. Quisque id efficitur nisi. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet lorem
          id arcu volutpat, ac fringilla odio efficitur. Sed eu mauris eu neque
          blandit eleifend nec in mauris. Quisque id efficitur nisi. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Donec aliquet lorem id
          arcu volutpat, ac fringilla odio efficitur. Sed eu mauris eu neque
          blandit eleifend nec in mauris. Quisque id efficitur nisi.
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 22,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  SecCont: {
    width: '100%',
    paddingHorizontal: 22,
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
  imgCont: {
    width: '100%',
    height: 400,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 400,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Urbanist-Bold',
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
    fontFamily: 'Urbanist-Regular',
  },
  rating: {
    marginRight: 8,
    color: 'black',
    fontFamily: 'Urbanist-Bold',
  },
  amountSold: {
    color: Colors.secondaryGreen,
    fontFamily: 'Urbanist-Regular',
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Urbanist-Bold',
    marginVertical: 8,
    color: 'black',
    width: '100%',
    textAlign: 'left',
  },
  description: {
    marginBottom: 16,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Urbanist-Medium',
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
    fontFamily: 'Urbanist-Bold',
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: Colors.secondaryGreen,
    fontFamily: 'Urbanist-Bold',
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 8,
    color: Colors.secondaryGreen,
    fontFamily: 'Urbanist-Bold',
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
    marginVertical: 16,
    paddingBottom: 16,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    marginRight: 16,
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    marginRight: 16,
    color: 'black',
    fontFamily: 'Urbanist-Medium',
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
    fontFamily: 'Urbanist-Bold',
  },
});

export default ProductDetails;

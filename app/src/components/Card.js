import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ status, item }) => {

    const navigation = useNavigation();

  const getDotColor = () => {
    if (status === 'incomplete') {
      return 'red';
    } else if (status === 'pending') {
      return 'yellow';
    } else if (status === 'complete') {
      return 'green';
    }
  };

  const dotColor = getDotColor();

  const handleCardPress = () => {
    navigation.navigate('Detail', { item });
  };
  

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.outerCardContainer}>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
        </View>
        <View style={styles.outerCardContent}>
          <Text style={styles.heading1}>{item.category_name}</Text>
          <Text style={styles.heading2}>{item.vendors}</Text>
        </View>
        <View style={styles.innerCardContainer}>
          <View style={styles.innerCardContent}>
            <Text style={styles.statusText}>Status</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCardContainer: {
    backgroundColor: '#414141',
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    width: '90%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  outerCardContent: {
    padding: 16,
  },
  heading1: {
    fontSize: 24,
    color: 'white',
  },
  heading2: {
    fontSize: 18,
    color: 'white',
  },
  innerCardContainer: {
    backgroundColor: '#414141',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  innerCardContent: {
    padding: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'right',
  },
});

export default Card;
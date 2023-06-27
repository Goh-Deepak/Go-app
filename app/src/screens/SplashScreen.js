import React from 'react';
import { ActivityIndicator, Image, Text, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Image
          source={require('../../assets/images/brand-logo.png')}
          style={styles.brandImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.largeText}>India's Largest Outdoor Advertising Agency</Text>
        <Text style={styles.normalText}>Gohoardings Solution LLP</Text>
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/images/footer.png')}
          style={styles.footerImage}
          resizeMode="cover"
        />
      </View>
      {/* <ActivityIndicator size="large" color="#ffffff" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    justifyContent: 'center',
  },
  brandContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandImage: {
    width: 300,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeText: {
    fontSize: 32,
    textAlign: 'center',
    color: '#ffffff',
    paddingBottom: 10,
  },
  normalText: {
    fontSize: 16,
    color: '#ffffff',
    paddingBottom: 120,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerImage: {
    width: '100%',
    height: 100, // Adjust the height as per your requirements
  },
});

export default SplashScreen;

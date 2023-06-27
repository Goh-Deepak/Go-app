import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OptionScreen = ({ navigation }) => {
  const handleClientPress = () => {
    // Handle client button press here
  };

  const handleVendorPress = () => {
    // Handle vendor button press here
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleClientPress}>
          <Text style={styles.optionButtonText}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleVendorPress}>
          <Text style={styles.optionButtonText}>Vendor</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/images/footer.png')}
        style={styles.footerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#363636',
    },
    optionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionButton: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
    optionButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    footerImage: {
      width: '100%',
      height: 100,
    },
  });

export default OptionScreen;
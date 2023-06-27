import React from 'react';
import { Image, View, StyleSheet} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
        <Image
          source={require('../../assets/images/footer.png')}
          style={styles.footerImage}
          resizeMode="cover"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    width:'100%',
  },
  footerImage: {
    width: '100%',
    height: 100, // Adjust the height as per your requirements
  },
});

export default Footer;

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleBrandLogoPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        backgroundColor: '#363636',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={handleBrandLogoPress}>
          <Image
            source={require('../../assets/images/logobg.jpg')}
            style={{ width: 45, height: 35 }}
          />
        </TouchableOpacity>
        <Button title="Logout" color="red" onPress={logout} />
      </View>
      <View>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;

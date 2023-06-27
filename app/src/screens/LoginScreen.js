import React, { useContext, useState, useRef , useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PanResponder,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, login } = useContext(AuthContext);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const emailRef = useRef('');
  const passwordRef = useRef('');

  useEffect(() => {
    emailRef.current = email;
    passwordRef.current = password;
  }, [email, password]);

  const startAnimation = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      console.log(emailRef.current);
      console.log(passwordRef.current);
      login(emailRef.current, passwordRef.current);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Allow dragging only horizontally
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderMove: (_, gesture) => {
        slideAnimation.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 100) {
          startAnimation();
        } else {
          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const buttonTranslateX = slideAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const buttonContainerStyle = {
    backgroundColor: slideAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: ['#d3d3d3', '#ffff00'], // Change the colors as per your preference
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={email}
            selectionColor="white"
            placeholder="Enter email"
            placeholderTextColor="#fff"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            selectionColor="white"
            placeholder="Enter password"
            placeholderTextColor="#fff"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Animated.View
              style={[
                styles.draggableContainer,
                { transform: [{ translateX: buttonTranslateX }] },
                buttonContainerStyle,
              ]}
              {...panResponder.panHandlers}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/images/footer.png')}
          style={styles.footerImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#363636',
  },
  wrapper: {
    width: '80%',
  },
  labelContainer: {
    marginBottom: 12,
  },
  label: {
    color: 'white',
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color:'white'
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    backgroundColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    width: 230,
    paddingHorizontal:15,
    paddingVertical: 10,
    borderRadius: 50

  },
  draggableContainer: {
    width: '50%',
    alignSelf: 'flex-start',
    borderRadius:50
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerImage: {
    width: '100%',
    height: 100,
  },
});

export default LoginScreen;

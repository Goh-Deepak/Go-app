

import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { BASE_URL } from '../config';
import axios from 'axios';
import { Video } from 'expo-av';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleCancel = () => {
    setImageUri(null);
    setVideoUri(null);
  };

  const handleImageUpload = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  
    if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
      console.log('Permission denied');
      return;
    }
  
    const pickerResult = await ImagePicker.launchCameraAsync();
  
    if (!pickerResult.cancelled) {
      const uri = pickerResult.uri;
      setImageUri(uri);
    }
  };

  const handleVideoUpload = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  
    if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
      console.log('Permission denied');
      return;
    }
  
    if (!isRecording) {
      setIsRecording(true);
  
      const videoOptions = {
        maxDuration: 10, // Set maximum video recording duration to 10 seconds
      };
  
      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        ...videoOptions,
      });
  
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        setVideoUri(uri);
      }
  
      setIsRecording(false);
    }
  };

  const handleSave = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

    if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
      console.log('Permission denied');
      return;
    }

    // Get the device's location
    const { coords } = await Location.getCurrentPositionAsync({});

    // Access the GPS coordinates
    const { latitude, longitude } = coords;
const {id} =item
    // Create a FormData object
    const formData = new FormData();
    formData.append('id',id);
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());

    if (imageUri) {
      // Extract the base64-encoded image data from the URI
      const base64Image = imageUri.split(',')[1];

      // Convert the base64-encoded image data to binary data
      const binaryImage = atob(base64Image);
     
      const arrayBuffer = new ArrayBuffer(binaryImage.length);

      const uint8Array = new Uint8Array(arrayBuffer);
 
      for (let i = 0; i < binaryImage.length; i++) {
        uint8Array[i] = binaryImage.charCodeAt(i);
      }

      // Create a Blob object from the binary image data
      const blobImage = new Blob([arrayBuffer], { type: 'image/jpeg' });
console.log(blobImage);
      // Append the image to the FormData
      formData.append('image', blobImage, 'image.jpg');
    }

    if (videoUri) {
      try {
        const response = await fetch(videoUri);
        const blobVideo = await response.blob();
        formData.append('video', blobVideo, 'video.mp4');
      } catch (error) {
        console.log('Error fetching video:', error);
      }
    }

    try {
    
      const uploadResponse = await axios.put(`${BASE_URL}/files`, formData);

      // Handle the response from the server
      console.log('Upload successful:', uploadResponse.data);
    } catch (error) {
      console.log('Upload error:', error);
    }

    // Reset imageUri and videoUri after saving
    setImageUri(null);
    setVideoUri(null);
  };

  const handleRemoveVideo = () => {
    setVideoUri(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.row}>
            {!imageUri ? (
              <TouchableOpacity onPress={() => handleImageUpload(item.code)}>
                <View style={styles.box}>
                  <Ionicons name="add" size={32} color="black" />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.box}>
                <Image source={{ uri: imageUri }} style={styles.media} />
                <TouchableOpacity onPress={handleCancel} style={styles.crossButton}>
                  <Ionicons name="close-circle" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}

            {!videoUri ? (
              <TouchableOpacity onPress={handleVideoUpload}>
                <View style={styles.box}>
                  <Ionicons name="videocam" size={32} color="black" />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.box}>
                <Video
                  source={{ uri: videoUri }}
                  style={styles.media}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                />
                <TouchableOpacity onPress={handleRemoveVideo} style={styles.crossButton}>
                  <Ionicons name="close-circle" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>category_name : {item.category_name}</Text>
            <Text style={styles.headline}>subcategory : {item.subcategory}</Text>
            <Text style={styles.headline}>illumination : {item.illumination}</Text>
            <Text style={styles.headline}>location : {item.location}</Text>
     
          </View>

          <TextInput style={styles.commentInput} placeholder="Enter your comment" multiline />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    paddingTop: 20,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
  boxContainer: {
    backgroundColor: '#414141',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#414141',
  },
  headlineContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    flex: 1,
  },
  headline: {
    color: 'white',
    fontSize: 18,
  },
  commentInput: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: '#414141',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#414141',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#414141',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  crossButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default DetailScreen;

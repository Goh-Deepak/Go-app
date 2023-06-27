import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet,View, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config';
import Card from '../components/Card';
import Footer from '../components/Footer';

const HomeScreen = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // Fetch the user list from the API
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/vendorData`);
  //       const data = await response.json();
  //        setUsers(data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);


  const renderItem = ({ item }) => (
    <Card status="complete" item={item}/>
  );
  

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <FlatList
        style={{width : '90%'}}
        data={userInfo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#363636',
    paddingTop:20
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userDetails: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 8,
  },
  cellText: {
    marginBottom: 4,
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
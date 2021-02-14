import React, { Component, useState, useEffect } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View, Image, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(credentials) {
    
    var body = {
      email : credentials.email,
      password : credentials.password,
    };

    var formBody = [];

    for(var key in body){
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(body[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((json) => {
      if(!json.message){
        // console.log(json._id);
        const userid = json._id;
        AsyncStorage.setItem('@userid', userid);
        this.props.navigation.navigate({ name: 'ChangeProfile'});
      }
     
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){

    return (
      <View style={styles.container}>
      <Text style={styles.baseText}>
        Login
      </Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          label='Email'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label='Password'
          style={styles.input}
          secureTextEntry={true}
        />
        <Button
          title={'Login'}
          onPress={() => this.onSubmit(this.state)}
          style={styles.inputext}
        />
        
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

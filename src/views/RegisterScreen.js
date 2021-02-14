import React, { Component } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }

  onRegister(credentials) {

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
    
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((json) => {
      if(!json.message){
        this.props.navigation.navigate({ name: 'HomeScreen'});
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
        Créer un compte
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
          title={'Register'}
          onPress={() => this.onRegister(this.state)}
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

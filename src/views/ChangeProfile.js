import React, { Component } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChangeProfile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: '',
      email: '',
      lastname: '',
      password: '',
    };
  }

  componentDidMount()   {
    (async () => {
        var userid = '';
        try {
          userid = await AsyncStorage.getItem('@userid') || 'none';
          console.log("userid: " + userid)
          this.setState({'id': userid});
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }  
        return userid;
    })()
  }

  onSubmit(credentials) {
    let userid = this.state.id;
    console.log(userid);
    var body = {
      email : credentials.email,
      lastname : credentials.lastname,
      password : credentials.password,
    };

    var formBody = [];

    for(var key in body){
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(body[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    fetch('http://localhost:3000/users/' + userid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((json) => {
      if(!json.message){
        console.log("success");
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
        Change informations
      </Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          label='Email'
          style={styles.input}
        />
        <TextInput
          value={this.state.lastname}
          onChangeText={(lastname) => this.setState({lastname})}
          label='Lastname'
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
          title={'Change'}
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

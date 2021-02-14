import React, { Component } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper';
import { BackHandler } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidUpdate(){
 
  }

  goLogin(){
    this.props.navigation.navigate({ name: 'LoginScreen'});
  }

  goRegister(){
    this.props.navigation.navigate({ name: 'RegisterScreen'});
  }

  render(){

    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          Bienvenue sur Nettoies ta France ! 
        </Text>
        <Button
          title={'Login'}
          onPress={() => this.goLogin()}
          style={styles.button}
        />
        <Text> </Text>
        <Button
          title={'Register'}
          onPress={() => this.goRegister()}
         
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
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  }
});

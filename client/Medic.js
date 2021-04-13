import React, { Component } from 'react';
import Getter from './Getter';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
// TODO: Menu medic.

export default class Medic extends Component {

  callParent = async () => {
    console.log("CallParent");
  }

  render() {
    return(
      <View> 
          <Button title="suna un parinte" key="callParent" onPress={() => this.callParent()}/>
          <Button title="modul doctor" key="modulDoctor" onPress={() => Actions.assistance()}/>
      </View>
    )
  }
}
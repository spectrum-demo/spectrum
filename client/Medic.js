import React, { Component } from 'react';
import Getter from './Getter';
import config from './config';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
// TODO: Menu medic.
const MESSAGE_PARENT = "Copilul dumneavoastră vă solicită asistența! \n Mulțumim frumos, \n Echipa SPECTRUM ";

export default class Medic extends Component {

  

  callParent = async () => {
    let get = new Getter();

    let parentPhoneNo = await get.getPhoneNumber();
    console.log(parentPhoneNo);
    let response = await fetch(config.API_ADDR + '/call', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: parentPhoneNo,
        body: MESSAGE_PARENT
      })
    });
    let res = await response.json();  
    console.log(res);
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
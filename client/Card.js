import React, { setState, useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Alert, Image } from 'react-native';
import config from './config';
import SoundPlayer from 'react-native-sound-player'; 
import { Actions } from 'react-native-router-flux';
import Getter from './Getter';

class Card extends React.PureComponent {
  _isMounted = false;
  
  // Merge doar pe android / ios
  constructor(props) {
    super(props);
    console.log(props.imgURL);
  }


  render(){
      return (
        <View>
            <h1>{this.props.denumire}</h1>
            <Image
                style={{width:100, height: 100}}
                source={{uri: this.props.imgURL}}
            />           
        </View>
      );
    
  }

  
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
}


export default Card;                       
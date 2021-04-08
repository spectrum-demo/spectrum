import React, { setState, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from './config';
import SoundPlayer from 'react-native-sound-player'

class App extends React.PureComponent {

  _testFetch = async () => {
    try {
      let response = await fetch(config.API_ADDR + '/users');
      let res = await response.json();
        
      this.setState({ 'res': res });
      console.log(this.state.res);
      
    } catch (error) {
       console.error(error);
    }
    
  }

  _cardsFetch = async () => {
    try {
      let response = await fetch(config.API_ADDR + '/cards');
      let res = await response.json();
        
      this.setState({ 'res': res });
      console.log(this.state.res);
      
    } catch (error) {
       console.error(error);
    }
    
  }


  // Merge doar pe android / ios
  _testSound =  async () => {
    try {
      // or play from url
      SoundPlayer.playUrl('https://freesound.org/data/previews/77/77602_1173265-lq.mp3');
      console.log(`all good`);
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }

  constructor(props) {
    super(props);
    this._testFetch();
    this._cardsFetch();
  }

  render() {
    if (this.state) {
      return (<View>
        <div>
          {JSON.stringify(this.state.res)}
        </div>
      </View>);
    } else {
      return (<View>
        <div>
          null
        </div>
      </View>);
    }
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


export default App;
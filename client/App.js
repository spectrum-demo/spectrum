import React, { setState, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from './config';
import Sound from 'react-native-sound'


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

  playTrack = () => {
    const track = new Sound('https://pl.meln.top/mr/57c28ad74f0c47254c02de055c3135af.mp3?session_key=4d3281cffba5ec4087a8934bca9efbc7', null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }

  _testSoundPlay = async () => {
    try {
      // or play from url
      SoundPlayer.playUrl()
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }

  constructor(props) {
    super(props);
    this._testFetch();
    this.playTrack();
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
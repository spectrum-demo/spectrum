import React, { setState, useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import config from './config';
import SoundPlayer from 'react-native-sound-player'; 
import { Actions } from 'react-native-router-flux';
import Getter from './Getter';

class App extends React.PureComponent {
  _isMounted = false;
  
  _fetchData = async () => {
    try {
      this._isMounted = true;
      let get = new Getter;
      let data = await get.getButtons();

      if(this._isMounted) {
        
        this.setState({'buttons': data.entries})
        console.log(this.state.buttons);
      }
      
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
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({"buttons":  []});
    
    this._fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render(){
    if(this.state.data == '') {
      return (
        <View>
          <div>Loading</div>
        </View>
      )
    }
    else {
      
      return (
        <View>
          {
            this.state.buttons.map((prop) => {
              return (
                <View> 
                    <Button title={prop.denumire} key={prop.denumire} onPress={() => {
                      console.log(prop.denumire);
                      if(prop.denumire == "Cartonașe") {
                          Actions.categories();
                      }

                      if(prop.denumire == "Recunoașterea emoțiilor") {
                        Actions.recognition();
                      }

                      if(prop.denumire == "Asistență") {
                        Actions.medic();
                      }
                    }}/>
                </View>
            )})
          }
        </View>
      );
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
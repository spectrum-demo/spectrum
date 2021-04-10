import React, { setState, useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import config from './config';
import SoundPlayer from 'react-native-sound-player';
import Categories from './Categories';
import Recognition from './Recognition';
import Medic from './Medic';
import Getter from './Getter';

class App extends React.PureComponent {
  _isMounted = false;
  
  _fetchData = async () => {
    try {
      this._isMounted = true;
      let get = new Getter;
      let data = await get.dataFetch();

      if(this._isMounted) {
        this.setState({ 'data': data });

        for (let i = 0; i < data.pages.length; i++) {
          const element = data.pages[i];
          if(element.title == 'Butoane') {
            
            this.setState({'buttons': element.entries})
          }
          
        }
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

  renderCaseView = (param) => {
    console.log(param);
    switch (param) {
      case "Cartonașe":
        return <Categories></Categories>;
        break;
      case "Recunoașterea emoțiilor":
        return <Recognition></Recognition>;
        break;
      case "Asistență":
        return <Medic></Medic>;
        break;
    }
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({"selectedPage":  ''});
    this.setState({"data":  ''});
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
            [""].map(
              (s) => {
                console.log(this.state.selectedPage);
                if(this.state.selectedPage == undefined || this.state.selectedPage == '') {
                  return (
                    this.state.buttons.map((prop) => {
                      return (
                        <View> 
                            <Button title={prop.denumire} key={prop.denumire} onPress={() => this.setState({selectedPage: prop.denumire})}/>
                        </View>
                  )}));
                }
              }
            ) 
          }
          
          <View>
            <div> { this.renderCaseView(this.state.selectedPage) } </div> 
          </View>
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
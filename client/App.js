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
        console.log(this.state.data);
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
    this._fetchData();
    this._isMounted = true;
    this.state = {selectedPage:  ''};
    this.state = {data:  ''};
  }

  renderCaseView = (param) => {
    console.log(param);
    switch (param) {
      case "categories":
        return <Categories></Categories>;
        break;
      case "recognition":
        return <Recognition></Recognition>;
        break;
      case "medic":
        return <Medic></Medic>;
        break;
    }
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
          <Button title="Categori" onPress={() => this.setState({selectedPage: 'categories'})} />
          <Button title="Recunosterea emotiilor" onPress={() => this.setState({selectedPage: 'recognition'})} />
          <Button title="Modul doctor" onPress={() => this.setState({selectedPage: 'medic'})} />
  
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
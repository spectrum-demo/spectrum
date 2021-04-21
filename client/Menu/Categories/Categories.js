import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import Getter from '../../Utils/Getter';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Categories extends Component {
  _isMounted = false;
  
  _fetchData = async () => {
    try {
      
      this._isMounted = true;
      let get = new Getter;
      let data = await get.getCategs();

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
                                                                                                          
        if(element.title == "Categorii") {
          console.log(element);
          if(this._isMounted) {
            this.setState({ 'categoriesArr': element.entries });
          }
        }
      }
      console.log(this.state.categoriesArr);
      
    } catch (error) {
       console.error(error);
    }
  
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({ 'categoriesArr': "" });
    this.setState({ 'selectedCat': "" }); 
    
    this._fetchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let get = new Getter;
    if(this.state.categoriesArr == '') {
      return(
        <View>
          <div>
            Loading
          </div>
        </View>
      )
    }
    else {
      return(
        <View style={styles.container}>
          {this.state.categoriesArr.map((prop) => {
              return (
                <View style={styles.element}> 
                  <TouchableOpacity style={styles.button} onPress={
                      async () => {
                        let entries = await get.getSubcateg(prop.denumire);
                        console.log(entries);
                        Actions.subcategories({'title': prop.denumire, 'entries': entries});
                      }
                    }>
                    <Image
                      style={{width:100, height: 100}}
                      source={{uri: prop.imgURL}}
                    />
                  </TouchableOpacity>
                  <Text>{prop.denumire} </Text>
                </View>
              );
          })}

        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'aboslute',
    top: '15vh',
    width: '100vw',
    display: 'inline-block',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 0,
  },
  element: {
    flex: 3,
    width: '50%',
    marginBottom: '3vh',
    float: 'left',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});
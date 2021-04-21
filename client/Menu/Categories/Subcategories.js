import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Alert, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Getter from '../../Utils/Getter';

// TODO: Menu medic.

export default class Subcategories extends Component {

  constructor(props) 
  {
    super(props);
    console.log(props.entries);
  }

  render() {
    let get = new Getter();
    return(
            <View style={styles.container}>
            {this.props.entries.map((entry) => {
                return (
                  <View style={styles.element}> 
                    <TouchableOpacity style={styles.button} onPress={
                        async () => {
                          let card = await get.getCard(entry.denumire, this.props.title);
                          Actions.card({'title': card.denumire, 'imgURL': card.imgURL});
                        }
                      }>
                      <Image
                        style={{width:100, height: 100}}
                        source={{uri: entry.imgURL}}
                      />
                    </TouchableOpacity>
                    <Text>{entry.denumire} </Text>
                  </View>
                );
            })}

            </View>
          );
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
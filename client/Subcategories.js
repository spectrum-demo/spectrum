import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Getter from './Getter';

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
      <View>
        {this.props.entries.map((entry) => {
          return (
            <View> 
                <Button title={entry.denumire} key={entry.denumire} 
                  onPress=
                  {
                    async () => {
                      let card = await get.getCard(entry.denumire, this.props.title);
                      Actions.card({'title': card.denumire, 'imgURL': card.imgURL});
                    }
                  }/>
            </View>
          );
        })}
      </View>
    )
  }
}
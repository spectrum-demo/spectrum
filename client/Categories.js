import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import Getter from './Getter';

export default class Categories extends Component {
  _isMounted = false;
  _fetchData = async () => {
    try {
      
      this._isMounted = true;
      let get = new Getter;
      let data = await get.dataFetch();

      for (let i = 0; i < data.pages.length; i++) {
        const element = data.pages[i];
                                                                                                                                                                                                     
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

  renderCaseView = (param) => {
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
        <View>
          <div>
              Categories
          </div>

          {this.state.categoriesArr.map((prop) => {
              return (
                <View> 
                    <Button title={prop.denumire} key={prop.denumire} onPress={() => this.setState({"selectedPage":  ''})}/>
                    { this.renderCaseView(this.state.selectedPage) } 
                </View>
              );
          })}

        </View>
      )
    }
    
  }
}
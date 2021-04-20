import React, { Component } from 'react';
import Getter from '../../Utils/Getter';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
// TODO: Menu medic.

export default class Medic extends Component {

    _fetchQuestions = async () => {
        try {
          
            this._isMounted = true;
            let get = new Getter;
            let questions = await get.getQuestions();
            if(this._isMounted) {
                this.setState({ 'questionsArr': questions.entries });
            }
          
            console.log(this.state.questionsArr);    
          
        } catch (error) {
           console.error(error);
        }
      
    }

    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        this._isMounted = true;
        this.setState({ 'questionsArr': []});
        
        this._fetchQuestions();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadQuestions = () => {
        if(this.state.questionsArr != [] && this.state.questionsArr != undefined) {
                           
        }
    }

    render() {
        return(
            <View> 
                <div>
                    { this.state.questionsArr.map((question) => {
                return (
                    <View> 
                        <Button title={question.denumire} key={question.denumire} />
                    </View>
                );
            })        }
                </div>
            </View>
        )
  }
}
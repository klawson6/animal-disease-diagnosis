import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {STYLE_ELEMENT_ID} from "react-native-web/dist/exports/StyleSheet/constants";

export default class ButtonBasics extends Component{
    _onPressButton(){
        alert("You tapped a button!");
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button onPress={this._onPressButton} title="Press me!"/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={this._onPressButton} title="Press me!" color="#841584"/>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button onPress={this._onPressButton} title="This looks great!"/>
                    <Button onPress={this._onPressButton} title="OK!" color="#841584"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    buttonContainer:{
        margin:20
    },
    alternativeLayoutButtonContainer:{
        margin:20,
        flexDirection:"row",
        justifyContent: "space-between"
    }
});

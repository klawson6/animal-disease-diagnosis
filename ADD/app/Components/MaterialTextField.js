import React, {Component} from "react";
import {Dimensions, Image, View, StyleSheet} from "react-native";
import {TextInput} from "react-native-paper";

export default class MaterialTextField extends Component{
    render() {
        return (
            <View style={styles.textEntryContainer}>
                <Image source={this.props.icon} style={styles.optionImg}/>
                <TextInput
                    label='Identifier'
                    value={this.props.identifier}
                    onChangeText={text => this.props.onChangeText(text)}
                    style={styles.textInput}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: Dimensions.get('window').height / 15,
        flex: 1,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 14,
        margin: Dimensions.get('window').width / 40,
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionImg: {
        height: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').height / 30,
        marginRight: Dimensions.get('window').height / 60,
    },
});

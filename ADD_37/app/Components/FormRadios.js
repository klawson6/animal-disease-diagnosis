import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {RadioButton} from "react-native-paper";

export default class FormRadios extends Component {

    buildRadios(value, callback, options, key) {
        let radios = [];
        let num = options.length - 1;
        for (let i = 0; i < options.length; i++) {
            radios.push(
                <View key={"radios" + i} style={styles.radioButtonContainer}>
                    <RadioButton
                        key={value + i}
                        value={options[i]}
                        status={value === i+1 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            callback(key, i+1);
                        }}
                    />
                    <TouchableOpacity key={key + i + "touchable"} style={styles.radioTouchable} onPress={() => {
                        callback(key, i+1);
                    }}>
                        <Text key={key + i + "text"} style={styles.radioText}>{options[i]}</Text>
                    </TouchableOpacity>
                </View>);
        }
        return radios;
    }

    render() {
        return (
            <View>
                <Text style={styles.radioTitle}>{this.props.title}</Text>
                {this.buildRadios(this.props.value, this.props.onPress, this.props.options, this.props.identifier)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    radioTitle: {
        color: '#646464',
        fontSize: 18,
        marginBottom: Dimensions.get('window').width / 30,
        marginLeft: Dimensions.get('window').width / 30,
        marginRight: Dimensions.get('window').width / 30,
    },
    radioButtonContainer: {
        height: Dimensions.get('window').height / 30,
        marginLeft: Dimensions.get('window').width / 20,
        //marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        color: '#646464',
        fontSize: 18,
        marginLeft: Dimensions.get('window').width / 30,
        marginRight: Dimensions.get('window').width / 30,
    },
    radioTouchable: {
        flex: 1,
        flexDirection: "row",
        paddingTop: Dimensions.get('window').width / 60,
        paddingBottom: Dimensions.get('window').width / 60,
    },
});

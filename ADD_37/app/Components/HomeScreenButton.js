import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {Component} from "react";

export default class HomeScreenButton extends Component {

    render() {
        return (
            <View elevation={2} style={this.props.style}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.button}>
                        <Image style={styles.buttonImg}
                               source={this.props.source}/>
                        <Text style={styles.buttonText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 4,
        justifyContent: "center"
    },
    buttonImg: {
        width: "40%",
        height: "40%",
        alignSelf: "center"
    },
    buttonText: {
        alignSelf: "center",
        width: "85%",
        color: "#003c8f",
        fontSize: 18,
        textAlign: "center"
    },
});

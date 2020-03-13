import React, {Component} from "react";
import {Divider} from "react-native-paper";
import {Dimensions} from "react-native";

export default class FormDivider extends Component{

    render() {
        return (
            <Divider style={{
                height: 1,
                marginRight: Dimensions.get('window').width / 30,
                marginLeft: Dimensions.get('window').width / 30,
                marginBottom: Dimensions.get('window').width / 30
            }}/>
        );
    }

}

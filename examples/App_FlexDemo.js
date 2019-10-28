import React, {Component} from 'react';
import {View} from 'react-native';

export default class FlexDimensionBasics extends Component{
    render(){
        return(
            // Use flex:1 to fill the whole screen. Define an exact height and the children will grow in their defined ratios
            // Views are rendered in size ratio of 1:2:3
            <View style={{height:300}}>
                <View style={{flex: 1, backgroundColor: 'powderblue'}} />
                <View style={{flex: 2, backgroundColor: 'skyblue'}} />
                <View style={{flex: 3, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
}
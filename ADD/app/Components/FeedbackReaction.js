import {Dimensions, Image, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {Component} from "react";

export default class FeedbackReaction extends Component{

    render(){
        return(
            <View style={styles.feedbackImgWrapper}>
                <View style={styles.feedbackImgContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.onPress(this.props.feedbackOption, 1)}>
                        <Image style={styles.feedbackImg}
                               source={this.props.feedback === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onPress(this.props.feedbackOption, 2)}>
                        <Image style={styles.feedbackImg}
                               source={this.props.feedback === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onPress(this.props.feedbackOption, 3)}>
                        <Image style={styles.feedbackImg}
                               source={this.props.feedback === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedbackImgWrapper: {
        // flex: 1.5,
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height / 18,
        width: "100%",
    },
    feedbackImgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: Dimensions.get('window').width / 30,
        paddingRight: Dimensions.get('window').width / 30,
    },
    feedbackImg: {
        width: Dimensions.get('window').width / 12,
        height: Dimensions.get('window').width / 12,
    },
});

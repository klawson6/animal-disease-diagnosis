import React, {Component} from "react";
import {Dimensions, Image, Text, TouchableOpacity, View, StyleSheet,} from "react-native";

export default class FeedbackFormSmall extends Component {

    render() {
        return (
            <View style={styles.feedbackContainer}>
                <View style={styles.feedbackScreen}>
                    <View style={styles.feedbackScreenMargin}>
                        <Text style={styles.feedbackTitle}>Feedback</Text>
                        <Text style={styles.feedbackText}>How was your experience capturing and uploading this
                            case?</Text>
                        <View style={styles.feedbackImgWrapper}>
                            <View style={styles.feedbackImgContainer}>
                                <TouchableOpacity onPress={() => this.props.onPress(1)}>
                                    <Image style={styles.feedbackImg}
                                           source={require('../assets/img/sad.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.onPress(2)}>
                                    <Image style={styles.feedbackImg}
                                           source={require('../assets/img/neutral.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.onPress(3)}>
                                    <Image style={styles.feedbackImg}
                                           source={require('../assets/img/happy.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.darken}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedbackContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 4,
        position: "absolute",
    },
    darken: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "black",
        opacity: 0.6,
        position: "absolute",
        zIndex: 4
    },
    feedbackScreen: {
        alignSelf: "center",
        width: Dimensions.get('window').width * 4 / 5,
        height: Dimensions.get('window').height / 5,
        // flex: 1,
        alignItems: 'center',
        zIndex: 5,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 4}],
        borderRadius: 3,
        backgroundColor: '#ffffff',
        //borderWidth: 1,
    },
    feedbackScreenMargin: {
        width: Dimensions.get('window').width * 4 / 5,
        height: Dimensions.get('window').height / 5,
        padding: Dimensions.get('window').width / 30,
    },
    feedbackTitle: {
        flex: 1.5,
        fontWeight: "bold",
        flexDirection: 'column',
        color: 'black',
        fontSize: 20,
        width: "100%",
    },
    feedbackText: {
        flex: 3,
        fontSize: 16,
        flexDirection: 'column',
        width: "100%",
    },
    feedbackImgWrapper: {
        flex: 1.5,
        flexDirection: 'column',
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

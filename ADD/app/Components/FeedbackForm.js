import {Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {Component} from "react";
import {Button, Divider} from "react-native-paper";
import FeedbackReaction from "./FeedbackReaction";

export default class FeedbackForm extends Component{

    render() {
        return (
            <View style={styles.feedbackContainer}>
                <View style={styles.feedbackScreen}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.feedbackTitle}>Feedback</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.onClose();
                        }} style={styles.closeImgWrapper}>
                            <Image style={styles.closeImg} source={require('../assets/img/close.png')}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.feedbackScreenMargin}>
                        <Text style={styles.feedbackText}>How is your experience with:{'\n'}</Text>
                        <Text style={styles.feedbackTextOption}>The overall application?</Text>
                        <FeedbackReaction onPress={this.props.onReaction} feedback={this.props.feedback[0]}  feedbackOption={"feedback1"}/>
                        <Text style={styles.feedbackTextOption}>Capturing, filling out and
                            uploading a HEALTHY case?</Text>
                        <FeedbackReaction onPress={this.props.onReaction} feedback={this.props.feedback[1]}  feedbackOption={"feedback2"}/>
                        <Text style={styles.feedbackTextOption}>Capturing, filling out and
                            uploading a DISEASE case?</Text>
                        <FeedbackReaction onPress={this.props.onReaction} feedback={this.props.feedback[2]} feedbackOption={"feedback3"}/>
                        <Text style={styles.feedbackTextOption}>Managing your cases? (Saving, editing and
                            uploading)</Text>
                        <FeedbackReaction onPress={this.props.onReaction} feedback={this.props.feedback[3]} feedbackOption={"feedback4"}/>
                        <Divider style={{
                            height: 1,
                            marginRight: Dimensions.get('window').width / 30,
                            marginLeft: Dimensions.get('window').width / 30,
                            marginBottom: Dimensions.get('window').width / 30
                        }}/>
                        <Text style={styles.feedbackText}>Please explain what you have experienced using the
                            application:{'\n'}</Text>
                        <Text style={styles.feedbackTextOption}>Any unexpected
                            behaviour in this application (Bugs/Glitches/Crashes)?</Text>
                        <TextInput value={this.props.feedback[4]} multiline={true} placeholder={"Feedback"}
                                   style={styles.textEntry}
                                   onChangeText={(value) => {
                                       this.props.onReaction("feedback5", value)
                                   }}/>
                        <Text style={styles.feedbackTextOption}>Any features and/or functionality you
                            would add/remove from this application?</Text>
                        <TextInput value={this.props.feedback[6]} multiline={true} placeholder={"Feedback"}
                                   style={styles.textEntry}
                                   onChangeText={(value) => {
                                       this.props.onReaction("feedback6", value)
                                   }}/>
                        <Button style={styles.uploadButton} mode="contained" loading={this.props.uploading}
                                onPress={() => {
                                    this.props.onUpload()
                                }}>
                            Upload
                        </Button>
                        <Divider style={{
                            height: 1,
                            marginTop: Dimensions.get('window').width / 30,
                            marginRight: Dimensions.get('window').width / 30,
                            marginLeft: Dimensions.get('window').width / 30,
                            marginBottom: Dimensions.get('window').height / 2
                        }}/>
                    </ScrollView>
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
        height: Dimensions.get('window').height * 4 / 5,
        // flex: 1,
        alignItems: 'center',
        zIndex: 5,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 10}],
        borderRadius: 3,
        backgroundColor: '#ffffff',
        //borderWidth: 1,
    },
    feedbackScreenMargin: {
        width: Dimensions.get('window').width * 4 / 5,
        height: Dimensions.get('window').height * 7 / 10,
        padding: Dimensions.get('window').width / 30,
    },
    titleContainer: {
        // width: "100%",
        height: Dimensions.get('window').height / 10,
        flexDirection: 'row',
        flex: 1,
    },
    feedbackTitle: {
        flex: 4,
        fontWeight: "bold",
        color: 'black',
        fontSize: 20,
        alignSelf: "center"
    },
    closeImgWrapper: {
        flex: 1,
        justifyContent: "center",
        marginRight: Dimensions.get('window').width / 30
    },
    closeImg: {
        alignSelf: "flex-end",
        width: Dimensions.get('window').width / 30,
        height: Dimensions.get('window').width / 30,
    },
    feedbackText: {
        // flex: 3,
        fontSize: 16,
        // flexDirection: 'column',
        width: "100%",
        //height: Dimensions.get('window').height / 14
    },
    feedbackTextOption: {
        width: "100%",
        fontSize: 16,
        paddingLeft: Dimensions.get('window').width / 30,
        paddingRight: Dimensions.get('window').width / 30,
    },

    textEntry: {
        width: "100%",
        borderRadius: 4,
        borderColor: "#646464",
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: Dimensions.get('window').width / 30,
        paddingRight: Dimensions.get('window').width / 30,
        marginTop: Dimensions.get('window').width / 30,
        marginBottom: Dimensions.get('window').width / 30,
    },
    uploadButton: {
        width: Dimensions.get("window").width / 2.5,
        marginRight: Dimensions.get("window").width / 25,
        marginLeft: Dimensions.get("window").width / 25,
        alignSelf: "center"
    },
});

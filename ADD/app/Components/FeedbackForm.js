import {Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {Button, Divider} from "react-native-paper";

export default class FeedbackForm extends Component{

    render() {
        return (
            <View style={styles.feedbackContainer}>
                <View style={styles.feedbackScreen}>
                    <ScrollView style={styles.feedbackScreenMargin}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.feedbackTitle}>Feedback</Text>
                            <TouchableOpacity onPress={() => {
                                this._handleFeedbackActive()
                            }} style={styles.closeImgWrapper}>
                                <Image style={styles.closeImg} source={require('../assets/img/close.png')}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.feedbackText}>How is your experience with:{'\n'}</Text>
                        <Text style={styles.feedbackTextOption}>The overall application?</Text>
                        <View style={styles.feedbackImgWrapper}>
                            <View style={styles.feedbackImgContainer}>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback1", 1)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback1 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback1", 2)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback1 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback1", 3)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback1 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.feedbackTextOption}>Capturing, filling out and
                            uploading a HEALTHY case?</Text>
                        <View style={styles.feedbackImgWrapper}>
                            <View style={styles.feedbackImgContainer}>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback2", 1)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback2 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback2", 2)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback2 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback2", 3)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback2 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.feedbackTextOption}>Capturing, filling out and
                            uploading a DISEASE case?</Text>
                        <View style={styles.feedbackImgWrapper}>
                            <View style={styles.feedbackImgContainer}>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback3", 1)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback3 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback3", 2)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback3 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback3", 3)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback3 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.feedbackTextOption}>Managing your cases? (Saving, editing and
                            uploading)</Text>
                        <View style={styles.feedbackImgWrapper}>
                            <View style={styles.feedbackImgContainer}>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback4", 1)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback4 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback4", 2)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback4 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._handleFeedbackOption("feedback4", 3)}>
                                    <Image style={styles.feedbackImg}
                                           source={this.state.feedback4 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                        <TextInput value={this.state.feedback5} multiline={true} placeholder={"Feedback"}
                                   style={styles.textEntry}
                                   onChangeText={(value) => {
                                       this._handleFeedbackOption("feedback5", value)
                                   }}/>
                        <Text style={styles.feedbackTextOption}>Any features and/or functionality you
                            would add/remove from this application?</Text>
                        <TextInput value={this.state.feedback6} multiline={true} placeholder={"Feedback"}
                                   style={styles.textEntry}
                                   onChangeText={(value) => {
                                       this._handleFeedbackOption("feedback6", value)
                                   }}/>
                        <Button style={styles.uploadButton} mode="contained" loading={this.state.uploading}
                                onPress={() => {
                                    this._handleUpload()
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
        height: Dimensions.get('window').height * 4 / 5,
        padding: Dimensions.get('window').width / 30,
    },
    titleContainer: {
        // width: "100%",
        height: Dimensions.get('window').height / 24,
        flexDirection: 'row',
        flex: 1
    },
    feedbackTitle: {
        flex: 4,
        fontWeight: "bold",
        color: 'black',
        fontSize: 20,
    },
    closeImgWrapper: {
        flex: 1,
        justifyContent: "center"
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

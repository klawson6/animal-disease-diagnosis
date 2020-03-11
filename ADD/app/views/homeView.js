import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    ScrollView,
    AsyncStorage,
    Alert,
    TextInput
} from 'react-native';
import {ScreenOrientation} from 'expo';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';
import {Divider, Button, Provider as PaperProvider, DefaultTheme} from "react-native-paper";
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";
import HomeScreenButton from "../Components/HomeScreenButton";
import FeedbackForm from "../Components/FeedbackForm";

class HomeView extends Component {

    /**
     *  View dependant fields.
     *
     *  hasPermissions:     True if the user can given the app all required permissions (Camera, Media Lib)
     *  loading:            True if the app is loading any data from storage, tells the Component to display the loading screen.
     **/
    state = {
        feedback1: 0,
        feedback2: 0,
        feedback3: 0,
        feedback4: 0,
        feedback5: "",
        feedback6: "",
        uploading: false,
        feedbackPending: false
    };

    /**
     *  Sets initial state once the component mount to the screen
     *
     *  model:     The model for the app
     **/
    componentDidMount() {
        this.setState({model: this.props.navigation.getParam("model")});
    }

    /**
     *  Callback executed when the button in the view corresponding to starting a new healthy case, is clicked.
     *
     *  Navigates the view to the CameraView Component if all permissions have been granted.
     **/
    onHealthyPress() {
        if (this.state.model.hasPermissions()) { // Check for granted permissions.
            this.props.navigation.navigate('cameraView', { // Navigate the view to CameraView.
                type: "Healthy Animal", // Passing a parameter to indicate the state of CameraView to be loaded.
                model: this.props.navigation.getParam("model")
            });
        } else {
            this.state.model.initPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to starting a new disease case, is clicked.
     *
     *  Navigates the view to the CameraView Component if all permissions have been granted.
     **/
    onDiseasePress() {
        if (this.state.model.hasPermissions()) { // Check for granted permissions.
            console.log("We here");
            this.props.navigation.navigate('cameraView', { // Navigate the view to CameraView.
                type: "Disease", // Passing a parameter to indicate the state of CameraView to be loaded.
                model: this.props.navigation.getParam("model")
            });
        } else {
            console.log("We here2");
            this.state.model.initPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to the case list, is clicked.
     *
     *  Navigates the view to the GalleryView Component if all permissions have been granted.
     **/
    onGalleryPress() {
        if (this.state.model.hasPermissions()) { // Check for granted permissions.
            // this.setState({loading: true, loadingText: "Loading cases..."}); // Sets the loading state to true.
            AsyncStorage.getItem("settings") // Asynchronously retrieves saved settings from local app storage
                .then(item => { // Lambda callback passing in the resolved promise
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    if (item) { // If there were saved settings
                        this.props.navigation.navigate('galleryView', { // Navigate the view to GalleryView.
                            home: true,  // Passing a parameter to indicate the state of GalleryView to be loaded.
                            settings: JSON.parse(item), // Passing an object corresponding to loaded settings as a parameter.
                            model: this.props.navigation.getParam("model")
                        });
                    } else
                        this.props.navigation.navigate('galleryView', { // Navigate the view to GalleryView.
                            home: true,  // Passing a parameter to indicate the state of GalleryView to be loaded.
                            model: this.props.navigation.getParam("model")
                        });
                })
                .catch(error => { // Lambda callback passing in the resolved promise if an error occurred
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    console.log("Error getting settings from local storage: " + error); // Log an error for debugging
                })
        } else {
            this.state.model.initPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to the settings, is clicked.
     *
     *  Navigates the view to the SettingsView Component if all permissions have been granted.
     **/
    onSettingsPress() {
        if (this.state.model.hasPermissions()) { // Check for granted permissions.
            this.props.navigation.navigate('settingsView', { // Navigate the view to SettingsView.
                model: this.props.navigation.getParam("model")
            });
        } else {
            this.state.model.initPermissions(); // Ask for permissions
        }
    }

    onHelpPress() {
        this.props.navigation.navigate('helpView'); // Navigate to the how to use page
    }

    /**
     *  Deletes all app data and images, or logs everything
     **/
    onClearPress() {
        // FOR CLEARING STORAGE
        AsyncStorage.clear(error => {
            if (error !== null && error !== undefined) {
                console.log('Key specific error(s) occurred when saving a classification: ' + error)
            }
        })
            .then(() => {
                console.log("Storage cleared.");
            })
            .catch(error => {
                console.log('Error clearing storage: ' + error)
            });
        MediaLibrary.getAlbumAsync("Animal Disease Diagnosis")
            .then(album => {
                MediaLibrary.deleteAlbumsAsync([album], true)
                    .then(success => {
                        console.log("Images deleted: " + success);
                    })
                    .catch(error => {
                        console.log("Error deleting images " + error);
                    })
            })
            .catch(error => {
                console.log("Error getting album to delete " + error);
            })

        // FOR PRINTING STORAGE
        // AsyncStorage.getAllKeys()
        //     .then(keys => keys.forEach(k => {
        //         AsyncStorage.getItem(k)
        //             .then(value => console.log(k + " : " + value));
        //     }));
        //
        // AsyncStorage.getItem("numCases")
        //     .then(value => console.log(value));
    }

    onUploadPress() {
        this.state.model.checkInternetAccess()
            .then(result => {
                console.log(result);
                if (result) {
                    this.state.model.uploadFeedback(
                        {
                            "feedback1": this.state.feedback1,
                            "feedback2": this.state.feedback2,
                            "feedback3": this.state.feedback3,
                            "feedback4": this.state.feedback4,
                            "feedback5": this.state.feedback5,
                            "feedback6": this.state.feedback6,
                        })
                        .then(result => {
                            if(result){
                                new Alert.alert(
                                    'Uploaded',
                                    'Your feedback has been uploaded. Thank you.',
                                    [{text: 'OK'},],
                                    {cancelable: false},
                                );
                            } else {
                                new Alert.alert(
                                    'Upload Failed',
                                    'Your feedback failed to upload. Please try again on a strong Wi-Fi connection.',
                                    [{text: 'OK'}],
                                    {cancelable: false},
                                );
                            }
                            this._handleFinishedUpload();
                        })
                } else {
                }
            })
    }

    _handleFinishedUpload = () => {
        this.setState({
            feedbackPending: false,
            uploading: false,
            feedback1: 0,
            feedback2: 0,
            feedback3: 0,
            feedback4: 0,
            feedback5: null,
            feedback6: null,
        });
    };

    _handleFeedbackActive = () => {
        if (this.state.feedbackPending) {
            this._handleFinishedUpload();
        } else {
            this.setState({
                feedbackPending: !this.state.feedbackPending,
            });
        }
    };

    _handleFeedbackOption = (key, val) => {
        this.setState({[key]: val});
    };

    _handleUpload = () => {
        this.setState({uploading: true});
        this.onUploadPress();
    };

    /**
     *  The XML that describes the component tree that build this component.
     **/
    render() {
        const theme = {
            ...DefaultTheme,
            roundness: 5,
            colors: {
                ...DefaultTheme.colors,
                primary: '#1565c0',
                accent: '#5e92f3',
            },
        };

        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    {this.state.feedbackPending ?
                        <FeedbackForm onReaction={this._handleFeedbackOption}
                                      onUpload={this._handleUpload}
                                      onClose={this._handleFeedbackActive}
                                      uploading={this.state.uploading}
                                      feedback={[
                                          this.state.feedback1,
                                          this.state.feedback2,
                                          this.state.feedback3,
                                          this.state.feedback4,
                                          this.state.feedback5,
                                          this.state.feedback6,]}/>
                        : null}
                    <View style={styles.frontContainer}>
                        <View style={styles.emptyTop}>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonRow}>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this.onHealthyPress.bind(this)}
                                                  source={require('../assets/img/cow-healthy2.png')}
                                                  text={"Healthy Case"}/>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this.onDiseasePress.bind(this)}
                                                  source={require('../assets/img/cow-disease2.png')}
                                                  text={"Disease Case"}/>
                            </View>
                            <View style={styles.buttonRow}>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this.onGalleryPress.bind(this)}
                                                  source={require('../assets/img/folder-blue2.png')}
                                                  text={"Saved Cases"}/>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this.onClearPress.bind(this)}
                                                  source={require('../assets/img/question-blue2.png')}
                                                  text={"How to Use"}/>
                            </View>
                            <View style={styles.buttonRow}>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this._handleFeedbackActive.bind(this)}
                                                  source={require('../assets/img/feedback-blue2.png')}
                                                  text={"Provide Feedback"}/>
                                <HomeScreenButton style={styles.buttonWrapper}
                                                  onPress={this.onSettingsPress.bind(this)}
                                                  source={require('../assets/img/cog-blue2.png')}
                                                  text={"Settings"}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.topBack}>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.topText1}>Image Collection Tool for Animal Disease Diagnosis</Text>
                            <Text style={styles.topText2}>v 1.2.4</Text>
                        </View>
                        <Image resizeMode={"cover"} style={styles.topImg}
                               source={require('../assets/img/cows-blue-back.png')}/>
                    </View>
                    <View style={styles.botBack}>
                    </View>
                </View>
            </PaperProvider>
        );
    }
}

/**
 *  The stylesheet for this component
 **/
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    frontContainer: {
        height: Dimensions.get("window").height,
        zIndex: 2,
        position: "absolute",
        width: Dimensions.get("window").width,
    },
    emptyTop: {
        height: Dimensions.get("window").height * 6 / 17,
    },
    buttonContainer: {
        height: Dimensions.get("window").height * 12 / 17,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    buttonWrapper: {
        width: Dimensions.get("window").width * 3 / 8,
        height: Dimensions.get("window").width * 3 / 8,
        marginBottom: Dimensions.get("window").width / 12,
        backgroundColor: "white",
        borderRadius: 4,
        justifyContent: "center"
    },
    topBack: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center"
    },
    topTextContainer: {
        flex: 2,
        width: Dimensions.get("window").width,
        justifyContent: "space-evenly",
        zIndex: 1,
        position: "absolute",
    },
    topText1: {
        alignSelf: "center",
        width: "85%",
        color: "white",
        fontSize: 25,
        textAlign: "center"
    },
    topText2: {
        alignSelf: "center",
        width: "85%",
        color: "white",
        fontSize: 18,
        textAlign: "center"
    },
    topImg: {
        height: '100%',
        width: '100%',
        zIndex: 0,
        position: "absolute",
    },
    botBack: {
        flex: 5,
        flexDirection: "column",
        backgroundColor: "#f5f5f5"
    }
});

export default HomeView;

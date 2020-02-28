import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
    Dimensions,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {ScreenOrientation} from 'expo';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';
import {Provider as PaperProvider} from "react-native-paper";

class HomeView extends Component {

    /**
     *  View dependant fields.
     *
     *  hasPermissions:     True if the user can given the app all required permissions (Camera, Media Lib)
     *  loading:            True if the app is loading any data from storage, tells the Component to display the loading screen.
     **/
    state = {
        hasPermissions: false,
        // loading: false,
        // loadingText: "",
    };

    /**
     *  Function executed when this component mounts to the display.
     *
     *  Sets the loading state to true.
     *  Initial request for permissions from the user.
     *  Looks the app orientation to vertical.
     *  Initialises the app storage.
     **/
    componentDidMount() {
        // this.setState({loading: true}); // Sets the loading state to true.
        this.askForPermissions(); // Initial request for permissions
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // Lock the screen orientation to vertical.
            .then() // Do nothing on success.
            .catch(error => { // Log an error for debugging
                console.log('Error occurred when locking orientation: ' + error)
            });
        AsyncStorage.getAllKeys() // Fetch all keys to values from the locally stored data
            .then(keys => {
                if (!keys.includes('numCases')) { // Find the key for the number of cases, if it does not exist, create and initialise it to 0.
                    AsyncStorage.setItem('numCases', '0');
                }
                if (!keys.includes('settings')) { // Find the key for the number of cases, if it does not exist, create and initialise it to 0.
                    AsyncStorage.setItem('settings', JSON.stringify({
                        wifi: true,
                        cell: true,
                        species: null,
                        location: null,
                        name: null
                    }));
                }
                // this.setState({loading: false}); // Set the loading state to false
            })
            .catch(error => {
                // this.setState({loading: false}); // Set the loading state to false
                console.log('Error occurred when creating numCases: ' + error)
            });
    }

    /**
     *  Asks the user for necessary permissions.
     *  Will set the state of permissions based on the user's response.
     **/
    askForPermissions() {
        Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
            .then(result => {
                this.setState({hasPermissions: result.status === 'granted'}); // Set the state of hasPermissions to true if all permissions were granted.
            });
    }

    /**
     *  Callback executed when the button in the view corresponding to starting a new healthy case, is clicked.
     *
     *  Navigates the view to the CameraView Component if all permissions have been granted.
     **/
    onHealthyPress() {
        if (this.state.hasPermissions) { // Check for granted permissions.
            this.props.navigation.navigate('cameraView', { // Navigate the view to CameraView.
                type: "Healthy Animal", // Passing a parameter to indicate the state of CameraView to be loaded.
            });
        } else {
            this.askForPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to starting a new disease case, is clicked.
     *
     *  Navigates the view to the CameraView Component if all permissions have been granted.
     **/
    onDiseasePress() {
        if (this.state.hasPermissions) { // Check for granted permissions.
            this.props.navigation.navigate('cameraView', { // Navigate the view to CameraView.
                type: "Disease", // Passing a parameter to indicate the state of CameraView to be loaded.
            });
        } else {
            this.askForPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to the case list, is clicked.
     *
     *  Navigates the view to the GalleryView Component if all permissions have been granted.
     **/
    onGalleryPress() {
        if (this.state.hasPermissions) { // Check for granted permissions.
            // this.setState({loading: true, loadingText: "Loading cases..."}); // Sets the loading state to true.
            AsyncStorage.getItem("settings") // Asynchronously retrieves saved settings from local app storage
                .then(item => { // Lambda callback passing in the resolved promise
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    if (item) { // If there were saved settings
                        this.props.navigation.navigate('galleryView', { // Navigate the view to GalleryView.
                            home: true,  // Passing a parameter to indicate the state of GalleryView to be loaded.
                            settings: JSON.parse(item) // Passing an object corresponding to loaded settings as a parameter.
                        });
                    } else
                        this.props.navigation.navigate('galleryView', { // Navigate the view to GalleryView.
                            home: true,  // Passing a parameter to indicate the state of GalleryView to be loaded.
                        });
                })
                .catch(error => { // Lambda callback passing in the resolved promise if an error occurred
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    console.log("Error getting settings from local storage: " + error); // Log an error for debugging
                })
        } else {
            this.askForPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to the settings, is clicked.
     *
     *  Navigates the view to the SettingsView Component if all permissions have been granted.
     **/
    onSettingsPress() {
        if (this.state.hasPermissions) { // Check for granted permissions.
            // this.setState({loading: true, loadingText: "Loading settings..."}); // Sets the loading state to true.
            AsyncStorage.getItem("settings") // Asynchronously retrieves saved settings from local app storage
                .then(item => { // Lambda callback passing in the resolved promise
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    if (item) { // If there were saved settings
                        this.props.navigation.navigate('settingsView', { // Navigate the view to SettingsView.
                            settings: JSON.parse(item) // Passing an object corresponding to loaded settings as a parameter.
                        });
                    } else
                        this.props.navigation.navigate('settingsView'); // Navigate the view to SettingsView.
                })
                .catch(error => { // Lambda callback passing in the resolved promise if an error occurred
                    // this.setState({loading: false,}); // Sets the loading state to false.
                    console.log("Error getting settings from local storage: " + error); // Log an error for debugging
                })
        } else {
            this.askForPermissions(); // Ask for permissions
        }
    }

    onHelpPress() {
        this.props.navigation.navigate('helpView'); // Navigate the view to SettingsView.
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

    _handleFeedbackActive = () => {
        if (this.state.feedbackPending)
            this.setState({
                feedbackPending: !this.state.feedbackPending,

            });
    };

    _handleFeedbackOption = (key, val) => {
        this.setState({[key]: val});
    };

    /**
     *  The XML that describes the component tree that build this component.
     **/
    render() {
        return (
            <View style={styles.container}>
                {/*{this.state.loading ?*/}
                {/*    <View style={styles.loadContainer}>*/}
                {/*        <View style={styles.loadingScreen}>*/}
                {/*            <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>*/}
                {/*            <Text style={styles.loadingText}>{this.state.loadingText}</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.darken}>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    : null}*/}
                {this.state.feedbackPending ?
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
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback1", 1)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback1 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback1", 2)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback1 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback1", 3)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback1 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.feedbackTextOption}>Capturing, filling out and
                                    uploading a HEALTHY case?</Text>
                                <View style={styles.feedbackImgWrapper}>
                                    <View style={styles.feedbackImgContainer}>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback2", 1)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback2 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback2", 2)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback2 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback2", 3)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback2 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.feedbackTextOption}>Capturing, filling out and
                                    uploading a DISEASE case?</Text>
                                <View style={styles.feedbackImgWrapper}>
                                    <View style={styles.feedbackImgContainer}>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback3", 1)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback3 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback3", 2)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback3 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback3", 3)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback3 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.feedbackTextOption}>Managing your cases? (Saving, editing and
                                    uploading)</Text>
                                <View style={styles.feedbackImgWrapper}>
                                    <View style={styles.feedbackImgContainer}>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback4", 1)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback4 === 1 ? require('../assets/img/sad-selected.png') : require('../assets/img/sad.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback4", 2)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback4 === 2 ? require('../assets/img/neutral-selected.png') : require('../assets/img/neutral.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedbackOption("feedback4", 3)}>
                                            <Image style={styles.feedbackImg}
                                                   source={this.state.feedback4 === 3 ? require('../assets/img/happy-selected.png') : require('../assets/img/happy.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.darken}>
                        </View>
                    </View>
                    : null}
                <View style={styles.frontContainer}>
                    <View style={styles.emptyTop}>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonRow}>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this.onHealthyPress.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/cow-healthy2.png')}/>
                                        <Text style={styles.buttonText}>Healthy Case</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this.onDiseasePress.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/cow-disease2.png')}/>
                                        <Text style={styles.buttonText}>Disease Case</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this.onGalleryPress.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/folder-blue2.png')}/>
                                        <Text style={styles.buttonText}>Saved Cases</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this.onHelpPress.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/question-blue2.png')}/>
                                        <Text style={styles.buttonText}>How to Use</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this._handleFeedbackActive.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/feedback-blue2.png')}/>
                                        <Text style={styles.buttonText}>Provide Feedback</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View elevation={2} style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={this.onSettingsPress.bind(this)}>
                                    <View style={styles.button}>
                                        <Image style={styles.buttonImg}
                                               source={require('../assets/img/cog-blue2.png')}/>
                                        <Text style={styles.buttonText}>Settings</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.topBack}>
                    <View style={styles.topTextContainer}>
                        <Text style={styles.topText1}>Image Collection Tool for Animal Disease Diagnosis</Text>
                        <Text style={styles.topText2}>v 1.1.3</Text>
                    </View>
                    <Image resizeMode={"cover"} style={styles.topImg}
                           source={require('../assets/img/cows-blue-back.png')}/>
                </View>
                <View style={styles.botBack}>
                </View>
            </View>
        );
    }
}

/**
 *  The stylesheet for this component
 **/
const styles = StyleSheet.create({
    // loadContainer: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    //     zIndex: 4,
    //     position: "absolute",
    // },
    // darken: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    //     backgroundColor: "black",
    //     opacity: 0.6,
    //     position: "absolute",
    //     zIndex: 4
    // },
    // loadingScreen: {
    //     alignSelf: "center",
    //     width: Dimensions.get('window').width / 2,
    //     height: Dimensions.get('window').height / 4,
    //     // flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly',
    //     backgroundColor: '#FFFFFF',
    //     zIndex: 5,
    //     position: 'absolute',
    //     transform: [{translateY: Dimensions.get('window').height * 3 / 8}],
    //     borderRadius: 3,
    //     //borderColor: '#003c8f',
    //     //borderWidth: 1,
    // },
    // loadingImg: {
    //     width: Dimensions.get('window').width / 4,
    //     height: Dimensions.get('window').width / 4,
    //     margin: Dimensions.get('window').width / 14,
    // },
    // loadingText: {
    //     color: '#000000',
    //     fontSize: 18,
    // },
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
        height: Dimensions.get('window').height / 5,
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

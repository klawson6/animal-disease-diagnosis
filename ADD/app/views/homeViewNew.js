import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {ScreenOrientation} from 'expo';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';

class HomeView extends Component {

    /**
     *  View dependant fields.
     *
     *  hasPermissions:     True if the user can given the app all required permissions (Camera, Media Lib)
     *  loading:            True if the app is loading any data from storage, tells the Component to display the loading screen.
     **/
    state = {
        hasPermissions: false,
        loading: false,
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
        this.setState({loading: true}); // Sets the loading state to true.
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
                this.setState({loading: false}); // Set the loading state to false
            })
            .catch(error => {
                this.setState({loading: false}); // Set the loading state to false
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
            this.setState({loading: true}); // Sets the loading state to true.
            AsyncStorage.getItem("settings") // Asynchronously retrieves saved settings from local app storage
                .then(item => { // Lambda callback passing in the resolved promise
                    this.setState({loading: false,}); // Sets the loading state to false.
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
                    this.setState({loading: false,}); // Sets the loading state to false.
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
            this.setState({loading: true}); // Sets the loading state to true.
            AsyncStorage.getItem("settings") // Asynchronously retrieves saved settings from local app storage
                .then(item => { // Lambda callback passing in the resolved promise
                    this.setState({loading: false,}); // Sets the loading state to false.
                    if (item) { // If there were saved settings
                        this.props.navigation.navigate('settingsView', { // Navigate the view to SettingsView.
                            settings: JSON.parse(item) // Passing an object corresponding to loaded settings as a parameter.
                        });
                    } else
                        this.props.navigation.navigate('settingsView'); // Navigate the view to SettingsView.
                })
                .catch(error => { // Lambda callback passing in the resolved promise if an error occurred
                    this.setState({loading: false,}); // Sets the loading state to false.
                    console.log("Error getting settings from local storage: " + error); // Log an error for debugging
                })
        } else {
            this.askForPermissions(); // Ask for permissions
        }
    }

    /**
     *  Callback executed when the button in the view corresponding to "How to Use", is clicked.
     *
     *  Will do handy stuff eventually, right now it deletes all app data and images, or logs everything
     **/
    onHelpPress() {
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

    /**
     *  The XML that describes the component tree that build this component.
     **/
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <View style={styles.loadingScreen}>
                        <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>
                        <Text style={styles.loadingText}>Loading settings...</Text>
                    </View>
                    : null}
                <View style={styles.topBack}>
                    <Image resizeMode={"cover"} style={styles.topImg} source={require('../assets/img/cows-blue.jpg')}/>
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
    container: {
        flex: 1,
    },
    topBack:{
        flex: 2,
        flexDirection: "column",
        //backgroundColor: "#73c4c4"
    },
    topImg:{
        height:'100%',
        width:'100%'
    },
    botBack:{
        flex: 5,
        flexDirection: "column",
        backgroundColor: "white"
    }
    // background: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
    // topContainer: {
    //     width: Dimensions.get('window').width,
    //     flex: 4,
    //     alignItems: 'center',
    //     zIndex: 0
    // },
    // titleContainer: {
    //     flex: 1,
    //     flexDirection: 'column-reverse',
    //     // backgroundColor: '#000000',
    //     //justifyContent: 'space-around',
    // },
    // title: {
    //     textAlign: 'center',
    //     color: '#73c4c4',
    //     fontFamily: Platform.OS === 'android'
    //         ? "sans-serif-light"
    //         : 'Avenir-Light',
    //     fontSize: 30,
    //     textShadowColor: '#000000',
    //     //flex: 1,
    // },
    // buttonContainer: {
    //     flex: 3,
    //     flexDirection: 'column',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     //backgroundColor: '#ff6381',
    //
    // },
    // button: {
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: '#808080',
    //     backgroundColor: '#f9f9f9',
    //     width: Dimensions.get('window').width * 2 / 3,
    //     height: Dimensions.get('window').height / 10,
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly'
    // },
    // buttonText: {
    //     textAlign: 'center',
    //     color: '#73c4c4',
    //     fontFamily: Platform.OS === 'android'
    //         ? "sans-serif-light"
    //         : 'Avenir-Light',
    //     fontSize: 25,
    // },
    // helpContainer: {
    //     flex: 2,
    //     flexDirection: 'column-reverse',
    //     //justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     //backgroundColor: '#6bff40',
    // },
    // buttonHelp: {
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: '#808080',
    //     backgroundColor: '#f9f9f9',
    //     width: Dimensions.get('window').width * 2 / 5,
    //     height: Dimensions.get('window').height / 14,
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly'
    // },
    // buttonHelpText: {
    //     textAlign: 'center',
    //     color: '#73c4c4',
    //     fontFamily: Platform.OS === 'android'
    //         ? "sans-serif-light"
    //         : 'Avenir-Light',
    //     fontSize: 20,
    // },
    // navContainer: {
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height / 4,
    //     //backgroundColor: '#4345ff',
    //     flex: 1,
    //     zIndex: 0
    // },
    // imgContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "space-evenly",
    //     alignItems: 'center',
    // },
    // image: {
    //     width: 65,
    //     height: 65,
    // },
    // settingsTouchable: {
    //     transform: [{
    //         translateX: 65,
    //     }],
    //     alignItems: 'center',
    // },
    // galleryTouchable: {
    //     transform: [{
    //         translateX: -65,
    //     }],
    //     alignItems: 'center',
    //     //backgroundColor: '#000000',
    // },
    // caption: {
    //     textAlign: 'center',
    //     color: '#73c4c4',
    //     fontFamily: Platform.OS === 'android'
    //         ? "sans-serif-light"
    //         : 'Avenir-Light',
    //     fontSize: 18,
    // },
    // loadingScreen: {
    //     width: Dimensions.get('window').width / 2,
    //     height: Dimensions.get('window').height / 4,
    //     // flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly',
    //     backgroundColor: '#FFFFFF',
    //     zIndex: 1,
    //     position: 'absolute',
    //     transform: [{translateY: Dimensions.get('window').height / 4}],
    //     borderRadius: 5,
    //     borderColor: '#808080',
    //     borderWidth: 1,
    // },
    // loadingImg: {
    //     width: Dimensions.get('window').width / 4,
    //     height: Dimensions.get('window').width / 4,
    //     margin: Dimensions.get('window').width / 12,
    // },
    // loadingText: {
    //     //flex: 1,
    //     color: '#000000',
    //     fontFamily: Platform.OS === 'android'
    //         ? "sans-serif-light"
    //         : 'Avenir-Light',
    //     fontSize: 20,
    // },
});

export default HomeView;

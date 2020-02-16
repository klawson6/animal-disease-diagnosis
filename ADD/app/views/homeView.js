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

    state = {
        cases: null,
        hasPermissions: false,
        loading: false,
    };

    componentDidMount() {
        this.setState({loading: true});
        this.askForPermissions();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
            .then()
            .catch(error => {
                console.log('Error occurred when locking orientation: ' + error)
            });
        AsyncStorage.getAllKeys()
            .then(keys => {
                if (!keys.includes('numCases')) {
                    AsyncStorage.setItem('numCases', '0');
                }
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('Error occurred when creating numCases: ' + error)
            });
    }

    askForPermissions() {
        Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
            .then(result => {
                this.setState({hasPermissions: result.status === 'granted'});
            });
    }

    onHealthyPress() {
        if (this.state.hasPermissions) {
            this.props.navigation.navigate('cameraView', {
                type: "Healthy Animal",
            });
        } else {
            this.askForPermissions();
        }
    }

    onDiseasePress() {
        if (this.state.hasPermissions) {
            this.props.navigation.navigate('cameraView', {
                type: "Disease",
            });
        } else {
            this.askForPermissions();
        }
    }

    onGalleryPress() {
        if (this.state.hasPermissions) {
            this.props.navigation.navigate('galleryView', {
                home: true,
            });
        } else {
            this.askForPermissions();
        }
    }

    onSettingsPress() {
        if (this.state.hasPermissions) {
            this.setState({loading: true});
            AsyncStorage.getItem("settings")
                .then(item => {
                    this.setState({loading: false,});
                    if (item) {
                        this.props.navigation.navigate('settingsView', {
                            settings: JSON.parse(item)
                        });
                    } else
                        this.props.navigation.navigate('settingsView');
                    console.log(this.state);
                })
                .catch(error => {
                    console.log("Error getting settings from local storage: " + error);
                })
        } else {
            this.askForPermissions();
        }
    }

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

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <View style={styles.loadingScreen}>
                        <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>
                        <Text style={styles.loadingText}>Loading settings...</Text>
                    </View>
                    : null}
                <View style={styles.topContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            New Case:
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {/*Binding this, means the scope of onPressButton is kept to the component, so this refers to this and not the function*/}
                        <TouchableOpacity onPress={this.onHealthyPress.bind(this)}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>Healthy Animal</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDiseasePress.bind(this)}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>Diseased Animal</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this.onHelpPress.bind(this)}>
                            <View style={[styles.buttonHelp]}>
                                <Text style={styles.buttonHelpText}>How to Use</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.navContainer}>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity style={styles.galleryTouchable} onPress={this.onGalleryPress.bind(this)}>
                            <Image style={[styles.image]}
                                   source={require('../assets/img/folder.png')}/>
                            <Text style={styles.caption}>Cases</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingsTouchable} onPress={this.onSettingsPress.bind(this)}>
                            <Image style={[styles.image]}
                                   source={require("../assets/img/settings.png")}/>
                            <Text style={styles.caption}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topContainer: {
        width: Dimensions.get('window').width,
        flex: 4,
        alignItems: 'center',
        zIndex: 0
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        // backgroundColor: '#000000',
        //justifyContent: 'space-around',
    },
    title: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 30,
        textShadowColor: '#000000',
        //flex: 1,
    },
    buttonContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //backgroundColor: '#ff6381',

    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#f9f9f9',
        width: Dimensions.get('window').width * 2 / 3,
        height: Dimensions.get('window').height / 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 25,
    },
    helpContainer: {
        flex: 2,
        flexDirection: 'column-reverse',
        //justifyContent: 'space-evenly',
        alignItems: 'center',
        //backgroundColor: '#6bff40',
    },
    buttonHelp: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#f9f9f9',
        width: Dimensions.get('window').width * 2 / 5,
        height: Dimensions.get('window').height / 14,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonHelpText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
    navContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        //backgroundColor: '#4345ff',
        flex: 1,
        zIndex: 0
    },
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    image: {
        width: 65,
        height: 65,
    },
    settingsTouchable: {
        transform: [{
            translateX: 65,
        }],
        alignItems: 'center',
    },
    galleryTouchable: {
        transform: [{
            translateX: -65,
        }],
        alignItems: 'center',
        //backgroundColor: '#000000',
    },
    caption: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 18,
    },
    loadingScreen: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 4}],
        borderRadius: 5,
        borderColor: '#808080',
        borderWidth: 1,
    },
    loadingImg: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        margin: Dimensions.get('window').width / 12,
    },
    loadingText: {
        //flex: 1,
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
});

export default HomeView;

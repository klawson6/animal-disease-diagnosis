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
import * as Permissions from "expo-permissions";

class HomeView extends Component {

    state = {
        cases: null,
        hasPermissions: false,
    };

    componentDidMount() {
        this.askForPermissions();
        AsyncStorage.getAllKeys()
            .then(keys =>{
                if (!keys.includes('numCases')){
                    AsyncStorage.setItem('numCases', '0');
                }
            })
            .catch(error => {
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
            this.props.navigation.navigate('galleryView');
        } else {
            this.askForPermissions();
        }
    }

    onSettingsPress() {
        if (this.state.hasPermissions) {
            this.props.navigation.navigate('settingsView')
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


        // FOR PRINTING STORAGE
        // AsyncStorage.getAllKeys()
        //     .then(keys => keys.forEach(k => {
        //         AsyncStorage.getItem(k)
        //             .then(value => console.log(value));
        //     }));
        //
        // AsyncStorage.getItem("numCases")
        //     .then(value => console.log(value));
    }

    render() {
        return (
            <View style={styles.container}>
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
    }
});

export default HomeView;

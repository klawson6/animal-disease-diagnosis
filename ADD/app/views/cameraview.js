import React, {Component, useState, useEffect} from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, Alert,
    Animated
} from 'react-native';
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

class CameraView extends Component {

    camera = null;
    cameraView = null;
    case = {
        assets: [],
    };

    state = {
        thumbnail: require('../assets/img/white.png'),
        white: require('../assets/img/white.png'),
        loading: require('../assets/img/loading.gif'),
        cases: null,
        capturing: false
    };

    onContinueButton() {
        this.props.navigation.navigate('categoriseView', {
            images: this.case,
        })
    }

    onGalleryButton() {
        this.props.navigation.navigate('galleryView', {
            case: this.case,
            home: false,
        })
    }

    onSnapButtonCamera() {
        if (this.camera) {
            this.setState({
                capturing: true,
            });
            const options = {skipProcessing: true, base64: true, exif: true};
            this.camera.takePictureAsync(options)
                .then(photo => {
                    photo.exif.Orientation = 1;
                    this.setState({
                        thumbnail: photo,
                    });
                    const {uri} = photo;
                    MediaLibrary.createAssetAsync(uri)
                        .then(asset => {
                            this.saveImage(asset);
                        })
                        .catch(error => {
                            console.log('Error creating asset of captured image.', error);
                        });
                })
                .catch(error => {
                    console.log('Error taking photo.', error);
                });
        }
    }

    saveImage(asset) {
        MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
            .then(album => {
                if (asset !== null) {
                    if (album === null) {
                        MediaLibrary.createAlbumAsync('Animal Disease Diagnosis', asset, false)
                            .then(album => {
                                this.addImageToState(album, asset.filename);
                            })
                            .catch(error => {
                                this.setState({
                                    capturing: false,
                                });
                                console.log('Error saving image to camera roll.', error);
                                new Alert.alert(
                                    'Error',
                                    'Your image could not be saved.\n' + error
                                )
                            });
                    } else {
                        MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
                            .then(() => {
                                this.addImageToState(album, asset.filename);
                            })
                            .catch(error => {
                                this.setState({
                                    capturing: false,
                                });
                                console.log('Error saving image to camera roll.', error);
                                new Alert.alert(
                                    'Error',
                                    'Your image could not be saved.\n' + error
                                )
                            });
                    }
                }
            })
            .catch(error => {
                this.setState({
                    capturing: false,
                });
                console.log('No folder for Animal Disease Diagnosis to save case.', error);
            })
    }

    addImageToState(album, name) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
            .then(assets => {
                for (const a of assets.assets) {
                    if (a.filename === name) {
                        this.case.assets.push(a);
                        break;
                    }
                }
                this.setState({
                    capturing: false,
                });
            })
            .catch(error => {
                this.setState({
                    capturing: false,
                });
                console.log('Could not get assets from folder.', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.capturing ?
                    <FadeInView style={styles.flash}/>
                    : null}
                <View style={styles.cameraContainer}>
                    <View ref={ref => {
                        this.cameraView = ref;
                    }}>
                        <Camera ref={ref => {
                            this.camera = ref;
                        }} style={styles.camera} type={Camera.Constants.Type.back} props={{ratio: "4:3"}}/>
                    </View>
                </View>
                <View style={styles.navContainer}>
                    <Text style={styles.buttonTitle}>Capture Images of
                        the {this.props.navigation.getParam('type')}</Text>
                    <View pointerEvents={this.state.capturing ? 'none' : 'auto'} style={styles.imgContainer}>
                        <TouchableOpacity onPress={this.onGalleryButton.bind(this)}>
                            <Image style={[styles.image, styles.galleryTouchable]}
                             source={this.state.capturing ? this.state.loading : this.state.thumbnail}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSnapButtonCamera.bind(this)}>
                            <Image style={styles.image}
                                // source={this.state.capturing ? require("../assets/img/loading.gif") : require("../assets/img/camera.png")}/>
                                   source={require("../assets/img/camera.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onContinueButton.bind(this)}>
                            <Image style={[styles.image, styles.settingsTouchable]}
                                   source={require("../assets/img/arrow.png")}/>
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        zIndex: 0
    },
    cameraContainer: {
        width: Dimensions.get('window').width,
        flex: 1,
        overflow: "hidden",
        zIndex: 0
    },
    flash: {
        zIndex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        backgroundColor: "#ffffff",
        position: "absolute",
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        borderRadius: 20,
    },
    navContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        zIndex: 0,
    },
    buttonTitle: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif"
            : 'Avenir-Light',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
    },
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    image: {
        width: 65,
        height: 65,
        overlayColor: 'white',
    },
    settingsTouchable: {
        transform: [{
            translateX: 25,
        }],
    },
    galleryTouchable: {
        transform: [{
            translateX: -25,
        }],
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 5,
    }
});

export default CameraView;

const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
    //const [fadeAnim2] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.sequence([
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 100,
                }
            ),
            Animated.timing(
               fadeAnim,
                {
                    toValue: 0,
                    duration: 400,
                }
            )

        ]).start();
    }, []);
    // React.useEffect(() => {
    //     Animated.timing(
    //         fadeAnim,
    //         {
    //             toValue: 1,
    //             duration: 5000,
    //         }
    //     ).start();
    // }, []);

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
};

import React, {Component, useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, Alert,
    Animated, AsyncStorage
} from 'react-native';
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

class CameraView extends Component {

    camera = null;
    cameraView = null;
    case = {
        assets: [],
    };

    sideMap = {
        "Front": 1,
        "Right-hand": 2,
        "Back": 3,
        "Left-hand": 4,
    };

    state = {
        thumbnail: require('../assets/img/white.png'),
        white: require('../assets/img/white.png'),
        loading: require('../assets/img/mat-spin.gif'),
        cases: null,
        capturing: false,
        type: '',
        side: "Front",
        sideImg: require("../assets/img/cow-front-lines-thin2.png"),
        done: false,
        isLoading: false,
    };

    onContinueButton() {
        if ((this.state.type === "Healthy Animal" && !this.state.done) || !this.case.assets.length) {
            this.state.type === "Healthy Animal" ?
                new Alert.alert(
                    'More Pictures Required',
                    'Please take a picture from each of the 4 required angles.'
                ) :
                new Alert.alert(
                    'Picture(s) Required',
                    'Please take at least 1 picture of the disease/signs.'
                )
        } else {
            this.setState({isLoading: true});
            AsyncStorage.getItem("settings")
                .then(item => {
                    this.setState({isLoading: false});
                    this.props.navigation.navigate('categoriseView', {
                        images: this.case,
                        type: this.state.type,
                        settings: JSON.parse(item),
                    })
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    console.log("Error getting default information from storage: " + error);
                    new Alert.alert(
                        'Error',
                        'An error occurred loading your default information. Please try again.'
                    )
                });
        }
    }

    onGalleryButton() {
        this.props.navigation.navigate('galleryView', {
            case: this.case,
            home: false,
        })
    }

    onSnapButtonCamera() {
        if (this.state.type === "Healthy Animal" && this.state.done) {
            new Alert.alert(
                'No More Pictures Required',
                'You have taken pictures from each of the 4 required angles.\nPlease annotate this case.'
            )
        } else if (this.camera) {
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

    switchSide() {
        switch (this.state.side) {
            case "Front":
                this.setState({
                    capturing: false,
                    side: "Right-hand",
                    sideImg: require("../assets/img/cow-right-lines-thin.png")
                });
                break;
            case "Right-hand":
                this.setState({
                    capturing: false,
                    side: "Back",
                    sideImg: require("../assets/img/cow-rear-thin.png")
                });
                break;
            case "Back":
                this.setState({
                    capturing: false,
                    side: "Left-hand",
                    sideImg: require("../assets/img/cow-left-lines-thin.png")
                });
                break;
            case "Left-hand":
                this.setState({
                    capturing: false,
                    side: "Front",
                    sideImg: require("../assets/img/cow-front-lines-thin2.png"),
                    done: true,
                });
                this.onContinueButton();
                break;
            default:
                console.log("Error in state regarding the side currently being photographed.")
        }
    }

    addImageToState(album, name) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
            .then(assets => {
                for (const a of assets.assets) {
                    if (a.filename === name) {
                        this.case.assets.push([a, this.state.type === "Disease" ? 0 : this.sideMap[this.state.side]]);
                        break;
                    }
                }
                console.log(this.state.type);
                if (this.state.type !== "Disease")
                    this.switchSide();
                else
                    this.setState({capturing: false});
            })
            .catch(error => {
                this.setState({
                    capturing: false,
                });
                console.log('Could not get assets from folder.', error);
            });
    }

    constructor(props) {
        super(props);
        this.state.type = this.props.navigation.getParam('type');
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.capturing ?
                    <FadeInView style={styles.flash}/>
                    : null}
                {this.state.type === "Healthy Animal" ?
                    <View style={styles.helpContainer}>
                        <Image style={styles.helpImg} source={this.state.sideImg}/>
                        <Image style={styles.helpPhone} source={require("../assets/img/viewfinder2-thin.png")}/>
                    </View>
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
                    {this.state.type === "Disease" ?
                        <Text style={styles.buttonTitle}>Capture Images of the Disease</Text>
                        : <Text style={styles.buttonTitle}>Capture an Image of:{'\n'}The {this.state.side} side</Text>}
                    <View pointerEvents={this.state.capturing ? 'none' : 'auto'} style={styles.imgContainer}>
                        <TouchableOpacity onPress={this.onGalleryButton.bind(this)}>
                            <Image style={[styles.imageSmall, styles.galleryTouchable]}
                                   source={this.state.capturing ? this.state.loading : this.state.thumbnail}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSnapButtonCamera.bind(this)}>
                            <Image style={styles.image}
                                   source={require("../assets/img/material-cam.png")}/>
                        </TouchableOpacity>
                        {this.state.type === "Healthy Animal" ?
                            <View style={[styles.imageSmall, styles.settingsTouchable]}>
                            </View> :
                            <TouchableOpacity onPress={this.onContinueButton.bind(this)}>
                                <Image
                                    style={[styles.imageSmall, styles.settingsTouchable]}
                                    source={this.state.capturing ? require("../assets/img/mat-spin.gif") : require("../assets/img/arrow2.png")}/>
                            </TouchableOpacity>}
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
    flash: {
        zIndex: 3,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        backgroundColor: "#ffffff",
        position: "absolute",
    },
    helpContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        zIndex: 1,
    },
    helpPhone: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width * 7 / 20,
        opacity: 0.8,
        transform: [{
            translateY: Dimensions.get('window').height / 10
        }],
        //backgroundColor: "blue"
    },
    helpImg: {
        width: Dimensions.get('window').width * 3 / 7,
        height: Dimensions.get('window').width * 3 / 7,
        opacity: 0.8,
        transform: [{
            translateY: Dimensions.get('window').height / 14
        }]
    },
    cameraContainer: {
        width: Dimensions.get('window').width,
        //flex: 1,
        overflow: "hidden",
        zIndex: 0,
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        borderRadius: 20,
    },
    toCapture: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
    },
    navContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        zIndex: 0,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "white"
    },
    buttonTitle: {
        color: '#646464',
        fontSize: 18,
        alignSelf: "center",
        textAlign: "center",
    },
    imgContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    image: {
        width: Dimensions.get('window').width / 6,
        height: Dimensions.get('window').width / 6,
        overlayColor: 'white',
        alignSelf: 'center'
    },
    imageSmall: {
        width: Dimensions.get('window').width / 8,
        height: Dimensions.get('window').width / 8,
        overlayColor: 'white',
        alignSelf: 'center'
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

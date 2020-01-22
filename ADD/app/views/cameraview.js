import React, {Component} from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, AsyncStorage
} from 'react-native';
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';

class CameraView extends Component {

    camera = null;
    cameraView = null;
    case = {
        assets: [],
    };

    state = {
        thumbnail: require('../assets/img/white.png'),
        white: require('../assets/img/white.png'),
        cases: null,
    };

    onContinueButton() {
        //this.savePhotos('categoriseView');
        this.props.navigation.navigate('categoriseView', {
            images: this.case,
        })
    }

    onGalleryButton() {
        //this.savePhotos('galleryView');
        // TODO show the case photos not all photos, and then in home->gallery show cases not photos.
        this.props.navigation.navigate('galleryView', {
            case: this.case,
            home: false,
        })
    }

    onSnapButtonCamera() {
        if (this.camera) {
            const options = {skipProcessing: true, base64: true, exif: true};
            console.log("waiting...");
            this.camera.takePictureAsync(options)
                .then(photo => {
                    photo.exif.Orientation = 1;
                    this.setState({
                        thumbnail: photo,
                    });
                    const {uri} = photo;
                    MediaLibrary.createAssetAsync(uri)
                        .then(asset => {
                            this.case.assets.push(asset);
                            console.log('Photo taken.');
                            console.log(photo.uri);
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

    onSnapButtonScreenShot() {
        if (this.camera) {
            const options = {
                result: 'tmpfile',
                quality: 1,
                format: 'png',
            };
            captureRef(this.cameraView, options)
                .then(uri => {
                    this.setState({
                        thumbnail: {uri: uri},
                    });

                    this.savePhoto({uri: uri});
                    console.log('Photo taken.');
                    console.log(photo.uri);
                })
                .catch(error => {
                    console.log('Error taking photo.', error);
                });
        }
    }

    savePhotos(nav) {
        MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
            .then(album => {
                MediaLibrary.addAssetsToAlbumAsync(this.case, album, false)
                    .then(() => {
                        //this.props.navigation.navigate(nav);
                        console.log('Cases saved to camera roll.');
                    })
                    .catch(error => {
                        console.log('Error saving case to camera roll.', error);
                    });            })
            .catch(error => {
                console.log('No folder for Animal Disease Diagnosis to save case.', error);
            })
    }

    componentDidMount() {
        //this.loadAlbum(); //TODO Loads full album, optimise to load just thumbnail
    }

    loadAlbum() {
        MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
            .then(album => {
                album !== null ? this.loadImages(album) : console.log("No album for Animal Disease Diagnosis yet.");
            })
            .catch(error => {
                console.log('No folder for Animal Disease Diagnosis.', error);
            })
    }

    loadImages(album) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
            .then(assets => {
                while (assets.hasNextPage) {
                    console.log("Loading images...");
                    // TODO stop user interaction while it loads?
                }
                console.log('Estimated number of loaded images: ' + assets.totalCount);
                console.log('Actual number of loaded images: ' + assets.assets.length);
                this.setState({
                    cases: assets,
                    thumbnail: assets.assets[0],
                });
            })
            .catch(error => {
                console.log('Could not get assets from folder.', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <View ref={ref => {
                        this.cameraView = ref;
                    }} style={styles.cameraContainerBorder}>
                        <Camera ref={ref => {
                            this.camera = ref;
                        }} style={styles.camera} type={Camera.Constants.Type.back} props={{ratio: "4:3"}}/>
                    </View>
                </View>
                <View style={styles.navContainer}>
                    <Text style={styles.buttonTitle}>Capture Images of
                        the {this.props.navigation.getParam('type')}</Text>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity onPress={this.onGalleryButton.bind(this)}>
                            <Image style={[styles.image, styles.galleryTouchable]}
                                   source={this.state.thumbnail}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSnapButtonCamera.bind(this)}>
                            <Image style={styles.image}
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
    },
    cameraContainer: {
        width: Dimensions.get('window').width,
        flex: 1,
        overflow: "hidden",
    },
    cameraContainerBorder: {
        //borderWidth: 1,
        //borderColor: '#808080',
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        borderRadius: 20,
    },
    navContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
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

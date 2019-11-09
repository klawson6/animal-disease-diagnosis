import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import * as Permissions from "expo-permissions";
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import {SortBy} from "expo-media-library";

class CameraView extends Component {

    camera = null;

    state = {
        thumbnail: require('../assets/img/white.png'),
        white: require('../assets/img/white.png'),
        cases: null,
    };

    onContinueButton() {
        this.props.navigation.navigate('categoriseView')
    }

    onGalleryButton() {
        this.props.navigation.navigate('galleryView', {
            cases: this.state.cases,
        })
    }

    async onSnapButton() {
        if (this.camera) {
            const options = {skipProcessing: true, base64: true, exif: true};
            console.log("waiting...");
            await this.camera.takePictureAsync(options)
                .then(photo => {
                    photo.exif.Orientation = 1;
                    this.setState({
                        thumbnail: photo,
                    });
                    this.savePhoto(photo);
                    console.log('Photo taken.');
                    console.log(photo.uri);
                })
                .catch(error => {
                    console.log('Error taking photo.', error);
                });
        }
    }

    async savePhoto(photo) {
        const {uri} = photo;
        MediaLibrary.createAssetAsync(uri)
            .then(asset => {
                MediaLibrary.createAlbumAsync('Animal Disease Diagnosis', asset, false)
                    .then(album => {
                        if (this.state.cases === null)
                            this.loadImages(album);
                        else
                            this.state.cases.assets.unshift(photo);
                        console.log('Image captured and saved to the device.');
                    })
                    .catch(error => {
                        console.log('Error saving photo.', error);
                    });
            });
    }

    componentDidMount() {
        //const {status} = await Permissions.getAsync(
        // Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        //     .then( result => {
        //         this.setState({hasPermissions: result.status === 'granted'});
        //         if(this.state.hasPermissions){
        //             this.render();
        //             this.loadThumbnail();
        //         } else {
        //             this.props.navigation.navigate('HomeView')
        //         }
        //     });
        this.loadThumbnail();
    }

    loadThumbnail() {
        // NOTE DO NOT CALL SETSTATE A BUNCH OF TIMES CLOSE  BY EACH OTHER??
        if (this.props.navigation.getParam('cases') !== null) {
            console.log('Images found in HomeView state.');
            this.setState({
                thumbnail: this.props.navigation.getParam('cases').assets[0],
                white: this.props.navigation.getParam('cases').assets[0],
                cases: this.props.navigation.getParam('cases'),
            });
        }
    }

    loadImages(album) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
            .then(assets => {
                while (assets.hasNextPage) {
                    console.log("Loading images...");
                }
                console.log('Estimated number of loaded images: ' + assets.totalCount);
                console.log('Actual number of loaded images: ' + assets.assets.length);
                console.log(assets);
                this.setState({
                    cases: assets,
                });
            })
            .catch(error => {
                console.log('Could not get assets from folder.', error);
            });
    }

    render() {
        // TODO handle declined camera and filesystem request
        // const {hasCameraPermission} = this.state;
        // if (hasCameraPermission === null) {
        //     return <View/>;
        // } else if (hasCameraPermission === false) {
        //     return <Text>No access to camera</Text>;
        // } else {
        // const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <View style={styles.cameraContainerBorder}>
                        <Camera ref={ref => {
                            this.camera = ref;
                        }} style={styles.camera} type={Camera.Constants.Type.back} props={{ratio: "4:3"}}/>
                    </View>
                </View>
                <View style={styles.navContainer}>
                    <Text style={styles.buttonTitle}>Capture Images of the {this.props.navigation.getParam('type')}</Text>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity onPress={this.onGalleryButton.bind(this)}>
                            <Image style={[styles.image, styles.galleryTouchable]}
                                   source={this.state.thumbnail}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSnapButton.bind(this)}>
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
        borderWidth: 1,
        borderColor: 'black',
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
        fontFamily: "sans-serif-light",
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
        borderColor: '#73c4c4',
        borderWidth: 1,
        borderRadius: 5,
    }
});

export default CameraView;
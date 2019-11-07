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

class CameraView extends Component {

    camera = null;

    state = {
        hasPermissions: null,
        thumbnail: require('../assets/img/white.png'),
        white: require('../assets/img/white.png'),
    };

    async componentDidMount() {
        const { status } = await Permissions.getAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        );
        this.setState({hasPermissions: status === 'granted'});
    }

    onGalleryButton() {
        this.props.navigation.navigate('galleryView')
    }

    async onSnapButton() {
        if (this.camera) {
            const options = {skipProcessing: true, base64: true, exif: true};
            console.log("waiting...");
            await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                this.setState({
                    thumbnail: photo,
                });
                console.log(photo.uri);
            });
        }
    }

    onContinueButton() {
        this.props.navigation.navigate('categoriseView')
    }

    render() {
        // const {hasCameraPermission} = this.state;
        // if (hasCameraPermission === null) {
        //     return <View/>;
        // } else if (hasCameraPermission === false) {
        //     return <Text>No access to camera</Text>;
        // } else {
        const {navigation} = this.props;
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
                    <Text style={styles.buttonTitle}>Capture Images of the {navigation.getParam('type')}</Text>
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
        //flex: 5,
        //flexDirection: "column",
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').width,
        flex: 1,
        overflow: "hidden",
        //backgroundColor:"#fdff17",
        //justifyContent: "flex-end",
    },
    cameraContainerBorder: {
        // //flex:1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').width*4/3,
        borderWidth: 1,
        borderColor: 'black',
        // overflow: "hidden",
        //backgroundColor: "#f6f6f6"
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 4 / 3,
        borderRadius: 20,
    },
    buttonTitle: {
        //flex: 1,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
    },
    navContainer: {
        //flexDirection: "row",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        //backgroundColor:"#0f33ff",
        // backgroundColor: '#7d7d7d',
        // justifyContent: "space-between",
    },
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    image: {
        // borderRadius: 32.5,
        // backgroundColor: '#000000',
        //borderColor: 'black',
        //borderWidth: 2,
        // width: Dimensions.get('window').width/6,
        // height: (Dimensions.get('window').height - (Dimensions.get('window').width * 4 / 3))/3,
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
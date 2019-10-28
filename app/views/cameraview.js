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
import * as ImagePicker from 'expo-image-picker';


// More info on all the options is below in the API Reference... just some common use cases shown here
// const options = {
//     title: 'Select Avatar',
//     customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

// Launch Camera:
// ImagePicker.launchCamera(options, (response) => {
//     // Same code as in above section!
//     console.log('Response = ', response);
//
//     if (response.didCancel) {
//         console.log('User cancelled image picker');
//     } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//     } else {
//         const source = {uri: response.uri};
//
//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//
//         this.setState({
//             avatarSource: source,
//         });
//     }
// });


class CameraView extends Component {

    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    // state = {
    //     image: null,
    // };

    onPressButton() {
        this.props.navigation.navigate('settingsView')
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
                        {/*<Image source={this.state.avatarSource}/>*/}
                        {/*{image &&*/}
                        {/*<Image source={{uri: image}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*4/3}}/>}*/}
                    </View>
                </View>
                <View style={styles.navContainer}>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                            <Image style={[styles.image, styles.galleryTouchable]}
                                   source={require('../assets/img/gallery.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._pickImage}>
                            <Image style={styles.image}
                                   source={require("../assets/img/camera.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                            <Image style={[styles.image, styles.settingsTouchable]}
                                   source={require("../assets/img/settings.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
        //}
    }

    // componentDidMount() {
    //     this.getPermissionAsync();
    // }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // }

    // _pickImage = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         aspect: [4, 3],
    //     });
    //     if (!result.cancelled) {
    //         this.setState({image: result.uri});
    //     }
    // };
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
        flex:1,
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
        height: Dimensions.get('window').width*4/3,
        borderRadius: 20,
    },
    navContainer: {
        //flexDirection: "row",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/4,
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
    }
});

export default CameraView;
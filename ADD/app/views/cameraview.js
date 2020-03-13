import React, {Component, useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, Alert,
    Animated,
} from 'react-native';
import {Camera} from "expo-camera";

class CameraView extends Component {

    camera = null;
    cameraView = null;
    case = {
        assets: [],
    };

    sideMap = {
        "None": 0,
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

    model;

    checkImages() {
        if ((this.state.type && !this.state.done) || !this.model.getCurrentCase().assets.length) {
            this.state.type ?
                new Alert.alert(
                    'More Pictures Required',
                    'Please take a picture from each of the 4 required angles.'
                ) :
                new Alert.alert(
                    'Picture(s) Required',
                    'Please take at least 1 picture of the disease/signs.'
                );
            return false;
        }
        return true;
    }

    onContinueButton() {
        if (this.checkImages()) {
            this.props.navigation.navigate('categoriseView', {
                model: this.props.navigation.getParam("model")
            });
        }
    }

    onGalleryButton() {
        this.props.navigation.navigate('galleryView', {
            model: this.props.navigation.getParam("model"),
        })
    }

    onSnapButtonCamera() {
        if (this.state.type && this.state.done) {
            new Alert.alert(
                'No More Pictures Required',
                'You have taken pictures from each of the 4 required angles.\nPlease annotate this case.'
            )
        } else if (this.camera) {
            this.setState({
                capturing: true,
            });
            this.model.takePicture(this.sideMap[this.state.side])
                .then(photo => {
                    if (photo) {
                        this.setState({
                            thumbnail: photo,
                            capturing: false
                        });
                        if (this.state.type) this.switchSide();
                    } else {
                        new Alert.alert(
                            'Error',
                            'Your image could not be saved.\n' + error
                        );
                        this.setState({
                            capturing: false
                        });
                    }
                })
                .catch(error => {
                    console.log("Error occurred capturing image: " + error);
                    new Alert.alert(
                        'Error',
                        'Your image could not be saved.\n' + error
                    );
                    this.setState({
                        capturing: false
                    });
                })
        }
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

    constructor(props) {
        super(props);
        this.model = this.props.navigation.getParam('model');
        this.state.type = this.model.getCaseType();
        this.state.side = this.state.type ? "Front" : "None";
    }

    componentDidMount() {
        this.model.setCamera(this.camera);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.capturing ?
                    <FadeInView style={styles.flash}/>
                    : null}
                {this.state.type ?
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
                    {this.state.type ?
                        <Text style={styles.buttonTitle}>Capture an Image of:{'\n'}The {this.state.side} side</Text>
                        : <Text style={styles.buttonTitle}>Capture Images of the Disease</Text>}
                    <View pointerEvents={this.state.capturing ? 'none' : 'auto'} style={styles.imgContainer}>
                        <TouchableOpacity style={styles.galleryTouchable} onPress={this.onGalleryButton.bind(this)}>
                            <Image style={styles.imageSmall}
                                   source={this.state.capturing ? this.state.loading : this.state.thumbnail}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSnapButtonCamera.bind(this)}>
                            <Image style={styles.image}
                                   source={require("../assets/img/material-cam.png")}/>
                        </TouchableOpacity>
                        {this.state.type ?
                            <View style={[styles.imageSmall, styles.settingsTouchable]}>
                            </View> :
                            <TouchableOpacity style={styles.settingsTouchable}
                                              onPress={this.onContinueButton.bind(this)}>
                                <Image
                                    style={styles.imageSmall}
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
        overflow: "hidden"
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

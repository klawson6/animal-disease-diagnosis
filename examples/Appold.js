import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class CameraButton extends Component {

    onPressButton() {
        this.props.navigation.navigate('CView');
    }

    render() {
        return (
            <View style={styles.container}>
                {/*Binding this, means the scope of onPressButton is kept to the component, so this refers to this and not the function*/}
                <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

class CameraView extends Component {

    camera = null;
    snap = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }


    onPressButton() {
        // TODO capture and display image
        this.props.navigation.navigate('Capture');
    }

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Camera ref={ref => {
                        this.camera = ref;
                    }} style={styles.camera} type={Camera.Constants.Type.back}/>
                    <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                        <View style={styles.capture}>
                            <Text style={styles.buttonText}>Capture</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

class Capture extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        borderRadius: 30,
        width: 260,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#82e9f3',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    camera: {
        height: 440,
        width: 330,
    },
    capture: {
        borderRadius: 20,
        width: 100,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#82e9f3',
        justifyContent: 'space-evenly',
    }
});

const RootStack = createStackNavigator(
    {
        Home: CameraButton,
        CView: CameraView,
        Capture: Capture,
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class Appold extends React.Component {
    render() {
        return <AppContainer/>;
    }
}
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, Dimensions,
} from 'react-native';

class HomeView extends Component {

    onHealthyPress() {
        this.props.navigation.navigate('cameraView', {
            type: "healthy",
        })
    }

    onDiseasePress() {
        this.props.navigation.navigate('cameraView', {
            type: "disease",
        })
    }

    onGalleryPress() {
        this.props.navigation.navigate('galleryView')
    }

    onSettingsPress() {
        this.props.navigation.navigate('settingsView')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleContainer}>
                        {/*<Image style={styles.titleImg}*/}
                        {/*       source={require('../assets/img/title.png')}/>*/}
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

                </View>
                <View style={styles.navContainer}>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity style={styles.galleryTouchable} onPress={this.onGalleryPress.bind(this)}>
                            <Image style={[styles.image]}
                                   source={require('../assets/img/gallery.png')}/>
                            <Text style={styles.caption}>Gallery</Text>
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
    topContainer: {
        width: Dimensions.get('window').width,
        //height: Dimensions.get('window').width * 4 / 3,
        flex: 1,

        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        //backgroundColor: '#7d7d7d'
    },
    titleImg: {
        width: 250,
        height: 75,
    },
    title: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 30,
        //textShadowRadius: 8,

        textShadowColor: '#000000',
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // backgroundColor: '#000000'
        transform: [{
            translateY: -50,
        }],
    },
    button: {
        // borderRadius: 10,
        // borderColor: '#689491',
        // borderWidth: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#f9f9f9',
        width: 200,
        height: 50,
        alignItems: 'center',
        //backgroundColor: '#73c4c4',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
    },
    navContainer: {
        // flexDirection: "row",
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        //backgroundColor: '#ecff1f',
        // justifyContent: "space-between",
    },
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    image: {
        // borderRadius: 5,
        // backgroundColor: '#1A936F',
        // borderColor: 'black',
        // borderWidth: 1,
        width: 65,
        height: 65,
        // width: Dimensions.get('window').width/6,
        // height: Dimensions.get('window').width * 4 / 24,
    },
    settingsImg: {
        width: 65,
        height: 65,
    },
    galleryImg: {
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
    },
    caption: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 18,
    },
});

export default HomeView;

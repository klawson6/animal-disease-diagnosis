import React, {Component} from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    TextInput,
    AsyncStorage, Image, Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';

class SettingsView extends Component {

    state = {
        wifi: false,
        cell: false,
        species: null,
        location: null,
        name: null,
        loading: null,
    };

    onSavePress() {
        this.setState({loading: true});
        AsyncStorage.setItem("settings", JSON.stringify(this.state))
            .then(() => {
                this.setState({loading: false});
                new Alert.alert("Saved", "Your settings have been saved.", [{
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('homeView')
                }]);
                console.log("Settings saved.")
            })
            .catch(error => {
                new Alert.alert("Save Failed", "Your settings could not be saved, an error occurred");
                console.log("Error saving settings: " + error);
            });
    }

    constructor(props) {
        super(props);
        if (this.props.navigation.getParam("settings"))
            this.state = Object.assign({}, this.state, this.props.navigation.getParam("settings"));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <View style={styles.loadingScreen}>
                        <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>
                        <Text style={styles.loadingText}>Loading settings...</Text>
                    </View>
                    : null}
                <Text style={styles.title}>Settings</Text>
                <View style={styles.topContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.textEntryContainer}>
                            <Text style={styles.textEntryText}>Full Name:</Text>
                            <TextInput
                                onChangeText={text => {
                                    this.setState(text ? {name: text} : {name: null})
                                }}
                                style={styles.textEntryBox}
                                defaultValue={this.state.name}
                            />
                        </View>
                        <Text style={styles.uploadTitle}>Default Species:</Text>
                        <RNPickerSelect
                            onValueChange={(value) =>
                                this.setState({species: value ? value : null})}
                            value={this.state.species}
                            items={[
                                {label: "None", value: ""},
                                {label: 'Cattle', value: 'Cattle'},
                                {label: 'Goat', value: 'Goat'},
                                {label: 'Sheep', value: 'Sheep'},
                                {label: 'Camel', value: 'Camel'},
                                {label: 'Horse', value: 'Horse'},
                                {label: 'Donkey', value: 'Donkey'},
                            ]}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                fontFamily: "sans-serif-light",
                                fontSize: 20,
                            }}
                        />
                        <Text style={styles.uploadTitle}>Default Location:</Text>
                        <RNPickerSelect
                            onValueChange={(value) =>
                                this.setState({location: value ? value : null})}
                            value={this.state.location}
                            items={[
                                {label: "None", value: ""},
                                {label: 'Addis Ababa', value: 'Addis Ababa'},
                                {label: 'Afar Region', value: 'Afar Region'},
                                {label: 'Amhara Region', value: 'Amhara Region'},
                                {label: 'Benishangul-Gumuz Region', value: 'Benishangul-Gumuz Region'},
                                {label: 'Dire Dawa', value: 'Dire Dawa'},
                                {label: 'Gamebela Region', value: 'Gamebela Region'},
                                {label: 'Harari Region', value: 'Harari Region'},
                                {label: 'Oromia Region', value: 'Oromia Region'},
                                {label: 'Somali Region', value: 'Somali Region'},
                                {
                                    label: 'Southern Nations, Nationalities and Peoples\' Region',
                                    value: 'Southern Nations, Nationalities and Peoples\' Region'
                                },
                                {label: 'Tigray Region', value: 'Tigray Region'},
                            ]}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                fontFamily: "sans-serif-light",
                                fontSize: 20,
                            }}
                        />
                        <Text style={styles.uploadTitle}>Upload Cases Using:</Text>
                        <CheckBox
                            title='WiFi'
                            checkedIcon='check-square'
                            uncheckedIcon='check-square'
                            checked={this.state.wifi}
                            onPress={() => this.setState({wifi: !this.state.wifi})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <CheckBox
                            title='Cellular Data'
                            checkedIcon='check-square'
                            uncheckedIcon='check-square'
                            checked={this.state.cell}
                            onPress={() => this.setState({cell: !this.state.cell})}
                            textStyle={styles.options}
                        />
                    </ScrollView>
                </View>
                <View style={styles.saveContainer}>
                    {/*Binding this, means the scope of onPressButton is kept to the component, so this refers to this and not the function*/}
                    <TouchableOpacity onPress={this.onSavePress.bind(this)}>
                        <View style={[styles.button]}>
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
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
    title: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 30,
        margin: 15,
        zIndex: 0
    },
    topContainer: {
        width: Dimensions.get('window').width * 4.5 / 5,
        flex: 1,
        margin: Dimensions.get('window').width / 20,
        borderRadius: 5,
        borderColor: '#808080',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0
    },
    scrollContainer: {
        width: Dimensions.get('window').width * 4 / 5,
        flex: 1,
        marginTop: Dimensions.get('window').width / 20,
        marginBottom: Dimensions.get('window').width / 20,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 20,
        marginBottom: Dimensions.get('window').width / 20, flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textEntryText: {
        flex: 1,
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
    textEntryBox: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#f9f9f9',
        height: Dimensions.get('window').height / 20,
        flex: 2,
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        textAlign: 'center',
    },
    uploadTitle: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    }, options: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-thin"
            : 'Avenir-Light',
        fontSize: 20,
    },
    optionsContainer: {
        margin: 10,
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height / 10,
        zIndex: 0
    },
    button: {
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 1,
        width: 160,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
    locBox: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#f9f9f9',
        height: Dimensions.get('window').height / 20,
        flex: 1,
        flexDirection: 'row',
        color: '#808080',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center'
    },
    loadingScreen: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 4}],
        borderRadius: 5,
        borderColor: '#808080',
        borderWidth: 1,
    },
    loadingImg: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        margin: Dimensions.get('window').width / 12,
    },
    loadingText: {
        //flex: 1,
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
});

export default SettingsView;

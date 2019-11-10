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
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';

class SettingsView extends Component {

    state = {
        wifi: false,
        cell: false,
        defaultAnimal: null,
    };

    onSavePress() {
        this.props.navigation.navigate('homeView')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.topContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.textEntryContainer}>
                            <Text style={styles.textEntryText}>Full Name:</Text>
                            <TextInput
                                style={styles.textEntryBox}
                            />
                        </View>
                        <Text style={styles.uploadTitle}>Default Species:</Text>
                        <RNPickerSelect
                            onValueChange={(value) =>
                                this.setState({defaultAnimal: value})}
                            items={[
                                {label: 'Cow', value: 'cow'},
                                {label: 'Goat', value: 'goat'},
                                {label: 'Sheep', value: 'sheep'},
                                {label: 'Camel', value: 'camel'},
                                {label: 'Horse', value: 'horse'},
                            ]}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                fontFamily: "sans-serif-light",
                                fontSize: 20,
                            }}
                        />
                        <Text style={styles.uploadTitle}>Default Location:</Text>
                        <TextInput onChangeText={text => {
                            this.setState({location: text})
                        }} style={styles.locBox}/>
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
    title:{
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 30,
        margin: 15,
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
    },
    scrollContainer:{
        width: Dimensions.get('window').width * 4 / 5,
        flex: 1,
        marginTop: Dimensions.get('window').width / 20,
        marginBottom: Dimensions.get('window').width / 20,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 20,
        marginBottom: Dimensions.get('window').width / 20,        flex: 1,
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
    },options: {
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
});

export default SettingsView;
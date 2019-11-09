import React, {Component} from 'react';
import {
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

class CategoriseView extends Component {

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
                <Text style={styles.title}>Categorise the Image(s)</Text>
                <ScrollView style={styles.topContainer}>
                    <View style={styles.textEntryContainer}>
                        <Text style={styles.textEntryText}>Your Full Name:</Text>
                        <TextInput
                            style={styles.textEntryBox}
                        />
                    </View>
                    <Text style={styles.uploadTitle}>Species:</Text>
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
                    <Text style={styles.uploadTitle}>Date of Observation:</Text>
                    {/*<Text style={styles.uploadTitle}>Upload Cases Using:</Text>*/}
                    {/*<CheckBox*/}
                    {/*    title='WiFi'*/}
                    {/*    checkedIcon='check-circle'*/}
                    {/*    uncheckedIcon='check-circle'*/}
                    {/*    checked={this.state.wifi}*/}
                    {/*    onPress={() => this.setState({wifi: !this.state.wifi})}*/}
                    {/*    textStyle={styles.options}*/}
                    {/*    containerStyle={styles.optionsContainer}*/}
                    {/*/>*/}
                    {/*<CheckBox*/}
                    {/*    title='Cellular Data'*/}
                    {/*    checkedIcon='check-circle'*/}
                    {/*    uncheckedIcon='check-circle'*/}
                    {/*    checked={this.state.cell}*/}
                    {/*    onPress={() => this.setState({cell: !this.state.cell})}*/}
                    {/*    textStyle={styles.options}*/}
                    {/*/>*/}
                </ScrollView>
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
        fontFamily: "sans-serif-light",
        fontSize: 30,
        margin: 15,
    },
    topContainer: {
        width: Dimensions.get('window').width * 4 / 5,
        flex: 1,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 20,
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textEntryText: {
        flex: 1,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
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
        fontFamily: "sans-serif-light",
        fontSize: 20,
        textAlign: 'center',
    },
    uploadTitle: {
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },options: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: "sans-serif-thin",
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
        borderColor: '#689491',
        borderWidth: 1,
        width: 160,
        height: 35,
        alignItems: 'center',
        backgroundColor: '#73c4c4',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: "sans-serif-light",
        fontSize: 20,
    }
});

export default CategoriseView;
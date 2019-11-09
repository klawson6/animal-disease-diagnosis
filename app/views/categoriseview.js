import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    TextInput,
    DatePickerAndroid,
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';

class CategoriseView extends Component {

    state = {
        age: 0,
        defaultAnimal: null,
        dateSelected: 'DD/MM/YY',
    };

    onSavePress() {
        this.props.navigation.navigate('homeView')
    }

    onDatePress() {
        DatePickerAndroid.open({date: new Date(),})
            .then(result => {
                if (result.action !== DatePickerAndroid.dismissedAction) {
                    this.setState({
                        dateSelected: '' + result.day + '/' + result.month + '/' + result.year
                    })
                }
            })
            .catch(error => {
                console.warn('Cannot open date picker', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Categorise the Image(s)</Text>
                <ScrollView style={styles.topContainer}>
                    <View style={styles.textEntryContainer}>
                        <Text style={styles.nameText}>Full Name:</Text>
                        <TextInput style={styles.nameBox}/>
                    </View>
                    <View style={styles.textEntryContainer}>
                        <Text style={styles.dateText}>Date of Observation:</Text>
                        <TouchableOpacity style={styles.datePicker} onPress={this.onDatePress.bind(this)}>
                            <Text style={styles.dateChosen}>{this.state.dateSelected}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textEntryContainer}>
                        <Text style={styles.nameText}>Location:</Text>
                        <TextInput style={styles.nameBox}/>
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
                    <Text style={styles.uploadTitle}>Age of Animal:</Text>
                    <CheckBox
                        title='0 - 6 Months'
                        checkedIcon='check-circle'
                        uncheckedIcon='check-circle'
                        checked={this.state.age === 1}
                        onPress={() => this.setState({age: this.state.age === 1 ? 0 : 1})}
                        textStyle={styles.options}
                        containerStyle={styles.optionsContainer}
                    />
                    <CheckBox
                        title='7 - 12 months'
                        checkedIcon='check-circle'
                        uncheckedIcon='check-circle'
                        checked={this.state.age === 2}
                        onPress={() => this.setState({age: this.state.age === 2 ? 0 : 2})}
                        textStyle={styles.options}
                        containerStyle={styles.optionsContainer}
                    />
                    <CheckBox
                        title='13 - 24 Months'
                        checkedIcon='check-circle'
                        uncheckedIcon='check-circle'
                        checked={this.state.age === 3}
                        onPress={() => this.setState({age: this.state.age === 3 ? 0 : 3})}
                        textStyle={styles.options}
                        containerStyle={styles.optionsContainer}
                    />
                    <CheckBox
                        title='Over 24 Months'
                        checkedIcon='check-circle'
                        uncheckedIcon='check-circle'
                        checked={this.state.age === 4}
                        onPress={() => this.setState({age: this.state.age === 4 ? 0 : 4})}
                        textStyle={styles.options}
                        containerStyle={styles.optionsContainer}
                    />
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
    title: {
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
    nameText: {
        flex: 1,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
    },
    nameBox: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#f9f9f9',
        height: Dimensions.get('window').height / 20,
        flex: 2,
        flexDirection: 'row',
        color: 'black',
        fontFamily: "sans-serif-light",
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center'
    },
    dateText: {
        flex: 1.75,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
    },
    datePicker: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: '#f9f9f9',
        height: Dimensions.get('window').height / 20,
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateChosen:{
        color: 'black',
        fontFamily: "sans-serif-light",
        fontSize: 20,
    },
    uploadTitle: {
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    options: {
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
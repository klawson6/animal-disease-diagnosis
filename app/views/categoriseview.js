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
    DatePickerAndroid,
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';

class CategoriseView extends Component {

    state = {
        name: null,
        dateSelected: 'DD/MM/YY',
        location: null,
        species: null,
        age: 0,
        breed: 0,
        diagnosis: null,
        defaultAnimal: null,
    };

    onSavePress() {
        console.log(this.state);
        this.props.navigation.navigate('homeView');
    }

    onDatePress() {
        DatePickerAndroid.open({date: new Date(),})
            .then(result => {
                if (result.action !== DatePickerAndroid.dismissedAction) {
                    this.setState({dateSelected: result.day + '/' + result.month + '/' + result.year});
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
                <View style={styles.topContainer}>
                    <ScrollView scrollIndicatorInsets={{right: -20}} style={styles.scrollContainer}>
                        <View style={styles.textEntryContainer}>
                            <Text style={styles.nameText}>Full Name:</Text>
                            <TextInput onChangeText={text => {
                                this.setState({name: text})
                            }} style={styles.nameBox}/>
                        </View>
                        <View style={styles.textEntryContainer}>
                            <Text style={styles.dateText}>Date of Observation:</Text>
                            <TouchableOpacity style={styles.datePicker} onPress={this.onDatePress.bind(this)}>
                                <Text style={styles.dateChosen}>{this.state.dateSelected}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textEntryContainer}>
                            <Text style={styles.nameText}>Location:</Text>
                            <TextInput onChangeText={text => {
                                this.setState({location: text})
                            }} style={styles.nameBox}/>
                        </View>
                        <Text style={styles.optionTitle}>Species:</Text>
                        <RNPickerSelect
                            onValueChange={value => {
                                this.setState({species: value})
                            }}
                            items={[
                                {label: 'Cattle', value: 'cattle'},
                                {label: 'Goat', value: 'goat'},
                                {label: 'Sheep', value: 'sheep'},
                                {label: 'Camel', value: 'camel'},
                                {label: 'Horse', value: 'horse'},
                                {label: 'Donkey', value: 'donkey'},
                            ]}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                fontFamily: "sans-serif-light",
                                fontSize: 20,
                            }}
                        />
                        <Text style={styles.optionTitle}>Age of Animal:</Text>
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
                        <Text style={styles.optionTitle}>Breed of Animal:</Text>
                        <CheckBox
                            title='Local'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checked={this.state.breed === 1}
                            onPress={() => this.setState({breed: this.state.breed === 1 ? 0 : 1})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <CheckBox
                            title='Exotic'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checked={this.state.breed === 2}
                            onPress={() => this.setState({breed: this.state.breed === 2 ? 0 : 2})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <CheckBox
                            title='Cross'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checked={this.state.breed === 3}
                            onPress={() => this.setState({breed: this.state.breed === 3 ? 0 : 3})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <Text style={styles.optionTitle}>Sex of Animal:</Text>
                        <CheckBox
                            title='Male'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checked={this.state.sex === 1}
                            onPress={() => this.setState({sex: this.state.sex === 1 ? 0 : 1})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <CheckBox
                            title='Female'
                            checkedIcon='check-circle'
                            uncheckedIcon='check-circle'
                            checked={this.state.sex === 2}
                            onPress={() => this.setState({sex: this.state.sex === 2 ? 0 : 2})}
                            textStyle={styles.options}
                            containerStyle={styles.optionsContainer}
                        />
                        <Text style={styles.optionTitle}>Presumed Diagnosis:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                this.setState({diagnosis: value})
                            }}
                            items={[
                                {label: 'Anthrax', value: 'anthrax', color:'#000000'},
                                {label: 'Babesiosis', value: 'babesiosis', color:'#000000'},
                                {label: 'Blackleg', value: 'blackleg', color:'#000000'},
                                {label: 'CBPP', value: 'cbpp', color:'#000000'},
                                {label: 'Colibacillosis', value: 'colibacillosis', color:'#000000'},
                                {label: 'Cowdriosis', value: 'Cowdriosis', color:'#000000'},
                                {label: 'Fasciolosis', value: 'fasciolosis', color:'#000000'},
                                {label: 'FMD', value: 'fmd', color:'#000000'},
                                {label: 'Pasteurollosis', value: 'pasteurollosis', color:'#000000'},
                                {label: 'Parasitic Gastro Enteritis', value: 'pge', color:'#000000'},
                                {label: 'Lumpy Skin Disease', value: 'lsd', color:'#000000'},
                                {label: 'Lungworm', value: 'lungworm', color:'#000000'},
                                {label: 'Rabies', value: 'rabies', color:'#000000'},
                                {label: 'Trypanosomiasis', value: 'trypanosomiasis', color:'#000000'},
                                {label: 'Tuberculosis', value: 'tuberculosis', color:'#000000'},
                                {label: 'Other', value: 'other', color:'#000000'},
                            ]}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{
                                fontFamily: "sans-serif-light",
                                fontSize: 20,
                            }}
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
        marginTop: Dimensions.get('window').width / 40,
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
    scrollContainer: {
        width: Dimensions.get('window').width * 4 / 5,
        flex: 1,
        marginTop: Dimensions.get('window').width / 20,
        marginBottom: Dimensions.get('window').width / 20,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 20,
        marginBottom: Dimensions.get('window').width / 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        flex: 1,
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
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
        color: '#808080',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center'
    },
    dateText: {
        flex: 1.75,
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
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
    dateChosen: {
        color: '#808080',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    },
    optionTitle: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
    },
    options: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-thin"
            : 'Avenir-Light',
        fontSize: 20,
    },
    optionsContainer: {
        margin: Dimensions.get('window').width / 40,
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
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
    }
});

export default CategoriseView;
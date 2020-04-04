import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image, Alert
} from 'react-native';
import {
    DefaultTheme,
    Menu,
    Switch,
    TextInput,
    Provider as PaperProvider,
    Button
} from "react-native-paper";
import {Divider} from "react-native-paper";

class SettingsViewModel extends Component {

    state = {
        wifi: false,
        cell: false,
        species: null,
        location: null,
        identifier: null,
        loading: false,
        locExpanded: false,
        specExpanded: false,
        locationShown: null,
        speciesShown: null,
    };

    model;

    onSavePress() {
       // this.setState({loading: true});
        this.model.saveSettings({
            wifi: this.state.wifi,
            cell: this.state.cell,
            species: this.state.species,
            location: this.state.location,
            identifier: this.state.identifier,
        })
            .then(result => {
                if (result) {
                    new Alert.alert("Saved", "Your settings have been saved.", [{
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('homeView')
                    }]);
                } else {
                    new Alert.alert("Save Failed", "Your settings could not be saved, an error occurred");
                }
                this.setState({loading: false});
            })
    }

    constructor(props) {
        super(props);
        this.model = this.props.navigation.getParam("model");
    }

    componentDidMount() {
        this.model.getSettings()
            .then(settings => {
                this.setState({
                    wifi: settings.wifi,
                    cell: settings.cell,
                    identifier: settings.identifier,
                    location: settings.location,
                    locationShown: settings.location,
                    species: settings.species,
                    speciesShown: settings.species,
                });
            });
    }

    _handleSpeciesPress = (val) => {
        this.setState({
            speciesExpanded: !this.state.speciesExpanded,
            species: val ? val : this.state.species,
            speciesShown: this.state.speciesExpanded ? val ? val : this.state.species : this.state.species ? this.state.species : " "
        });
    };

    _handleLocPress = (val) => {
        this.setState({
            locExpanded: !this.state.locExpanded,
            location: val ? val : this.state.location,
            locationShown: this.state.locExpanded ? val ? val : this.state.location : this.state.location ? this.state.location : " "
        });
    };

    render() {
        const theme = {
            ...DefaultTheme,
            roundness: 5,
            colors: {
                ...DefaultTheme.colors,
                primary: '#1565c0',
                accent: '#5e92f3',
            },
        };

        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.topContainer}>
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/person-grey.png')} style={styles.optionImg}/>
                                <TextInput
                                    label='Default Identifier'
                                    value={this.state.identifier}
                                    onChangeText={text => this.setState({identifier: text})}
                                    style={styles.textInput}
                                />
                            </View>
                            <Divider style={{height: 1, marginBottom: Dimensions.get('window').width / 20}}/>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/species-choice.png')} style={styles.optionImg}/>
                                <View style={styles.textInput}>
                                    <TouchableOpacity onPress={this._handleSpeciesPress.bind(this, null)}>
                                        <TextInput
                                            label='Default Species'
                                            value={this.state.speciesShown}
                                            editable={false}
                                            underlineColor={this.state.speciesExpanded ? "#1565c0" : null}
                                        />
                                        <Image source={require('../assets/img/down-arrow.png')}
                                               style={styles.dropdownImg}/>
                                    </TouchableOpacity>
                                    <Menu
                                        visible={this.state.speciesExpanded}
                                        onDismiss={this._handleSpeciesPress.bind(this, null)}
                                        statusBarHeight={0}
                                        selectionColor={"#1565c0"}
                                        anchor={{
                                            x: Dimensions.get("window").width * 14 / 15,
                                            y: Dimensions.get("window").height * 1.7 / 15
                                        }}>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Cattle")
                                        }} title="Cattle"/>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Goat")
                                        }} title="Goat"/>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Sheep")
                                        }} title="Sheep"/>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Camel")
                                        }} title="Camel"/>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Horse")
                                        }} title="Horse"/>
                                        <Menu.Item onPress={() => {
                                            this._handleSpeciesPress("Donkey")
                                        }} title="Donkey"/>
                                    </Menu>
                                </View>
                            </View>
                            <Divider style={{height: 1, marginBottom: Dimensions.get('window').width / 20}}/>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/pin.png')} style={styles.optionImg}/>
                                <View style={styles.textInput}>
                                    <TouchableOpacity onPress={this._handleLocPress.bind(this, null)}>
                                        <TextInput
                                            label='Default Location'
                                            value={this.state.locationShown}
                                            editable={false}/>
                                        <Image source={require('../assets/img/down-arrow.png')}
                                               style={styles.dropdownImg}/>
                                    </TouchableOpacity>
                                    <Menu
                                        visible={this.state.locExpanded}
                                        onDismiss={this._handleLocPress.bind(this, null)}
                                        statusBarHeight={0}
                                        selectionColor={"#1565c0"}
                                        anchor={{
                                            x: Dimensions.get("window").width * 14 / 15,
                                            y: Dimensions.get("window").height * 1.7 / 15
                                        }}>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Addis Ababa")
                                        }} title="Addis Ababa"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Afar Region")
                                        }} title="Afar Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Amhara Region")
                                        }} title="Amhara Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Benishangul-Gumuz Region")
                                        }} title="Benishangul-Gumuz Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Dire Dawa")
                                        }} title="Dire Dawa"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Gamebela Region")
                                        }} title="Gamebela Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Harari Region")
                                        }} title="Harari Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Oromia Region")
                                        }} title="Oromia Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Somali Region")
                                        }} title="Somali Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Southern Nations, Nationalities and Peoples\' Region")
                                        }} title="Southern Nations, Nationalities and Peoples\' Region"/>
                                        <Menu.Item onPress={() => {
                                            this._handleLocPress("Tigray Region")
                                        }} title="Tigray Region"/>
                                    </Menu>
                                </View>
                            </View>
                            <Divider style={{height: 1, marginBottom: Dimensions.get('window').width / 20}}/>
                            <View style={[styles.switchContainer, {marginTop: Dimensions.get('window').width / 20}]}>
                                <Text style={styles.switchText}>Wi-Fi Uploads: </Text>
                                <Switch
                                    value={this.state.wifi}
                                    onValueChange={() => {
                                        this.setState({wifi: !this.state.wifi});
                                    }}
                                    style={styles.switchIcon}
                                />
                            </View>
                            <View style={styles.switchContainer}>
                                <Text style={styles.switchText}>Cellular Uploads: </Text>
                                <Switch
                                    value={this.state.cell}
                                    onValueChange={() => {
                                        this.setState({cell: !this.state.cell});
                                    }}
                                    style={styles.switchIcon}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.saveContainer}>
                        <Button style={{width: "40%"}} mode="contained" loading={this.state.loading}
                                onPress={() => {this.onSavePress()}}>
                            Save
                        </Button>
                    </View>
                </View>
            </PaperProvider>
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
        color: '#646464',
        fontSize: 30,
        marginTop: Dimensions.get('window').height / 60,
        marginBottom: Dimensions.get('window').height / 60,
        zIndex: 0
    },
    topContainer: {
        width: Dimensions.get('window').width * 4.5 / 5,
        flex: 1,
        margin: Dimensions.get('window').width / 20,
        borderRadius: 5,
        borderColor: '#c1c1c1',
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
    textInput: {
        height: Dimensions.get('window').height / 15,
        flex: 1,
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 14,
        marginBottom: Dimensions.get('window').width / 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownImg: {
        height: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').height / 30,
        zIndex: 1,
        position: "absolute",
        alignSelf: "flex-end",
        transform: [{translateY: Dimensions.get('window').height / 45}, {translateX: -Dimensions.get('window').height / 60}],
    },
    optionImg: {
        height: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').height / 30,
        marginRight: Dimensions.get('window').height / 60,
    },
    switchContainer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: Dimensions.get('window').height / 30,
    },
    switchText: {
        flex: 1,
        flexDirection: "row",
        fontSize: 18,
        color: "#646464"
    },
    switchIcon: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center"
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height * 2 / 10,
        zIndex: 0
    },
});

export default SettingsViewModel;

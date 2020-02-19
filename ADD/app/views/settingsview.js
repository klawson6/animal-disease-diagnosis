import React, {Component} from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    AsyncStorage, Image, Alert
} from 'react-native';
import {
    DefaultTheme,
    Menu,
    Switch,
    TextInput,
    Provider as PaperProvider,
    Divider,
    Button
} from "react-native-paper";

class SettingsView extends Component {

    state = {
        wifi: false,
        cell: false,
        species: null,
        location: null,
        name: null,
        loading: null,
        locExpanded: false,
        specExpanded: false,
        locationShown: null,
        speciesShown: null,
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
                    {/*{this.state.loading ?*/}
                    {/*    <View style={styles.loadContainer}>*/}
                    {/*        <View style={styles.loadingScreen}>*/}
                    {/*            <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>*/}
                    {/*            <Text style={styles.loadingText}>Saving...</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.darken}>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    : null}*/}
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.topContainer}>
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/person-grey.png')} style={styles.optionImg}/>
                                <TextInput
                                    label='Default Identifier'
                                    value={this.state.name}
                                    onChangeText={text => this.setState({name: text})}
                                    style={styles.textInput}
                                />
                            </View>
                            <Divider style={{marginBottom: Dimensions.get('window').width / 20}}/>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/species-choice.png')} style={styles.optionImg}/>
                                <View style={styles.textInput}>
                                    <Menu
                                        visible={this.state.speciesExpanded}
                                        onDismiss={this._handleSpeciesPress.bind(this, null)}
                                        statusBarHeight={0}
                                        selectionColor={"#1565c0"}
                                        anchor={
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
                                        }>
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
                            <Divider style={{marginBottom: Dimensions.get('window').width / 20}}/>
                            <View style={styles.textEntryContainer}>
                                <Image source={require('../assets/img/pin.png')} style={styles.optionImg}/>
                                <View style={styles.textInput}>
                                    <Menu
                                        visible={this.state.locExpanded}
                                        onDismiss={this._handleLocPress.bind(this, null)}
                                        statusBarHeight={0}
                                        selectionColor={"#1565c0"}
                                        anchor={
                                            <TouchableOpacity onPress={this._handleLocPress.bind(this, null)}>
                                                <TextInput
                                                    label='Default Location'
                                                    value={this.state.locationShown}
                                                    editable={false}/>
                                                <Image source={require('../assets/img/down-arrow.png')}
                                                       style={styles.dropdownImg}/>
                                            </TouchableOpacity>
                                        }>
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
                            <Divider style={{marginBottom: Dimensions.get('window').width / 20}}/>
                            {/*<Text style={styles.uploadTitle}>Upload Cases Using:</Text>*/}
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
                        <Button style={{width: "40%"}} mode="contained" loading={this.state.loading} onPress={this.onSavePress.bind(this)}>
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
        margin: 15,
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
    uploadTitle: {
        color: '#646464',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
    },


    textEntryContainer: {
        height: Dimensions.get('window').height / 14,
        marginBottom: Dimensions.get('window').width / 20,
        flex: 1,
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
    }, textFieldBox: {
        //borderRadius: 20,
        backgroundColor: "#f1f1f1",
        height: Dimensions.get('window').height / 14,
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
        margin: 10,
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height * 2 / 10,
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
    loadContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1,
        position: "absolute",
    },
    darken: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "black",
        opacity: 0.6,
        position: "absolute",
        zIndex: 1
    },
    loadingScreen: {
        alignSelf: "center",
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        zIndex: 2,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 4}],
        borderRadius: 3,
        // borderColor: '#808080',
        // borderWidth: 1,
    },
    loadingImg: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        margin: Dimensions.get('window').width / 12,
    },
    loadingText: {
        //flex: 1,
        color: '#000000',
        fontSize: 18,
    },
});

export default SettingsView;

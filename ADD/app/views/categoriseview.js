import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage,
    Image,
    Alert, TouchableOpacity
} from 'react-native';
import {
    Button, DefaultTheme, Divider, Menu, TextInput, Provider as PaperProvider, RadioButton
} from "react-native-paper"
import Swiper from "@manjiz/react-native-swiper"
import RNDateTimePicker from '@react-native-community/datetimepicker';
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";

class CategoriseView extends Component {

    diseases = {
        Cattle: [
            <Menu.Item key={"Cattle-Unknown"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Cattle-Anthrax"} onPress={() => {
                this._handleDiseasePress("Anthrax")
            }} title="Anthrax"/>,
            <Menu.Item key={"Cattle-Babesiosis"} onPress={() => {
                this._handleDiseasePress("Babesiosis")
            }} title="Babesiosis"/>,
            <Menu.Item key={"Cattle-Blackleg"} onPress={() => {
                this._handleDiseasePress("Blackleg")
            }} title="Blackleg"/>,
            <Menu.Item key={"Cattle-CBPP / CCPP"} onPress={() => {
                this._handleDiseasePress("CBPP / CCPP")
            }} title="CBPP / CCPP"/>,
            <Menu.Item key={"Cattle-Colibacillosis"} onPress={() => {
                this._handleDiseasePress("Colibacillosis")
            }} title="Colibacillosis"/>,
            <Menu.Item key={"Cattle-Cowdriosis"} onPress={() => {
                this._handleDiseasePress("Cowdriosis")
            }} title="Cowdriosis"/>,
            <Menu.Item key={"Cattle-Fasciolosis"} onPress={() => {
                this._handleDiseasePress("Fasciolosis")
            }} title="Fasciolosis"/>,
            <Menu.Item key={"Cattle-Foot & Mouth Disease"} onPress={() => {
                this._handleDiseasePress("Foot & Mouth Disease")
            }} title="Foot & Mouth Disease"/>,
            <Menu.Item key={"Cattle-Pasteurellosis"} onPress={() => {
                this._handleDiseasePress("Pasteurellosis")
            }} title="Pasteurellosis"/>,
            <Menu.Item key={"Cattle-PGE / GIT Parasite"} onPress={() => {
                this._handleDiseasePress("PGE / GIT Parasite")
            }} title="PGE / GIT Parasite"/>,
            <Menu.Item key={"Cattle-Lumpy Skin Disease"} onPress={() => {
                this._handleDiseasePress("Lumpy Skin Disease")
            }} title="Lumpy Skin Disease"/>,
            <Menu.Item key={"Cattle-Rabies"} onPress={() => {
                this._handleDiseasePress("Rabies")
            }} title="Rabies"/>,
            <Menu.Item key={"Cattle-Trypanosomiasis"} onPress={() => {
                this._handleDiseasePress("Trypanosomiasis")
            }} title="Trypanosomiasis"/>,
            <Menu.Item key={"Cattle-Tuberculosis"} onPress={() => {
                this._handleDiseasePress("Tuberculosis")
            }} title="Tuberculosis"/>,
            <Menu.Item key={"Cattle-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ],
        Horse: [
            <Menu.Item key={"Horse-Unknown"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Horse-African Horse Sickness (AHS)"} onPress={() => {
                this._handleDiseasePress("African Horse Sickness (AHS)")
            }} title="African Horse Sickness (AHS)"/>,
            <Menu.Item key={"Horse-Anthrax"} onPress={() => {
                this._handleDiseasePress("Anthrax")
            }} title="Anthrax"/>,
            <Menu.Item key={"Horse-Ascaris (Foals only)"} onPress={() => {
                this._handleDiseasePress("Ascaris (Foals only)")
            }} title="Ascaris (Foals only)"/>,
            <Menu.Item key={"Horse-Babesiosis"} onPress={() => {
                this._handleDiseasePress("Babesiosis")
            }} title="Babesiosis"/>,
            <Menu.Item key={"Horse-GI (Non-infectious / Colic)"} onPress={() => {
                this._handleDiseasePress("GI (Non-infectious / Colic)")
            }} title="GI (Non-infectious / Colic)"/>,
            <Menu.Item key={"Horse-GI (Parasitic)"} onPress={() => {
                this._handleDiseasePress("GI (Parasitic)")
            }} title="GI (Parasitic)"/>,
            <Menu.Item key={"Horse-Habronemiasis"} onPress={() => {
                this._handleDiseasePress("Habronemiasis")
            }} title="Habronemiasis"/>,
            <Menu.Item key={"Horse-Heat Stress"} onPress={() => {
                this._handleDiseasePress("Heat Stress")
            }} title="Heat Stress"/>,
            <Menu.Item key={"Horse-Lymphangitis (Epizootic)"} onPress={() => {
                this._handleDiseasePress("Lymphangitis (Epizootic)")
            }} title="Lymphangitis (Epizootic)"/>,
            <Menu.Item key={"Horse-Lymphangitis (Ulcerative)"} onPress={() => {
                this._handleDiseasePress("Lymphangitis (Ulcerative)")
            }} title="Lymphangitis (Ulcerative)"/>,
            <Menu.Item key={"Horse-Mange Mite"} onPress={() => {
                this._handleDiseasePress("Mange Mite")
            }} title="Mange Mite"/>,
            <Menu.Item key={"Horse-Rabies"} onPress={() => {
                this._handleDiseasePress("Rabies")
            }} title="Rabies"/>,
            <Menu.Item key={"Horse-Respiratory (Lower Bacterical)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Lower Bacterical)")
            }} title="Respiratory (Lower Bacterical)"/>,
            <Menu.Item key={"Horse-Respiratory (Upper Bacterical)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Upper Bacterical)")
            }} title="Respiratory (Upper Bacterical)"/>,
            <Menu.Item key={"Horse-Respiratory (Asthma / Lungworm)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Asthma / Lungworm)")
            }} title="Respiratory (Asthma / Lungworm)"/>,
            <Menu.Item key={"Horse-Respiratory (Viral)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Viral)")
            }} title="Respiratory (Viral)"/>,
            <Menu.Item key={"Horse-Strangles"} onPress={() => {
                this._handleDiseasePress("Strangles")
            }} title="Strangles"/>,
            <Menu.Item key={"Horse-Tetanus"} onPress={() => {
                this._handleDiseasePress("Tetanus")
            }} title="Tetanus"/>,
            <Menu.Item key={"Horse-Trypanosomosis"} onPress={() => {
                this._handleDiseasePress("Trypanosomosis")
            }} title="Trypanosomosis"/>,
            <Menu.Item key={"Horse-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ],
        Donkey: [
            <Menu.Item key={"Donkey-Unknown"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Donkey-Anthrax"} onPress={() => {
                this._handleDiseasePress("Anthrax")
            }} title="Anthrax"/>,
            <Menu.Item key={"Donkey-Ascaris (Foals only)"} onPress={() => {
                this._handleDiseasePress("Ascaris (Foals only)")
            }} title="Ascaris (Foals only)"/>,
            <Menu.Item key={"Donkey-Babesiosis"} onPress={() => {
                this._handleDiseasePress("Babesiosis")
            }} title="Babesiosis"/>,
            <Menu.Item key={"Donkey-GI (Non-infectious / Colic)"} onPress={() => {
                this._handleDiseasePress("GI (Non-infectious / Colic)")
            }} title="GI (Non-infectious / Colic)"/>,
            <Menu.Item key={"Donkey-GI (Parasitic)"} onPress={() => {
                this._handleDiseasePress("GI (Parasitic)")
            }} title="GI (Parasitic)"/>,
            <Menu.Item key={"Donkey-Habronemiasis"} onPress={() => {
                this._handleDiseasePress("Habronemiasis")
            }} title="Habronemiasis"/>,
            <Menu.Item key={"Donkey-Heat Stress"} onPress={() => {
                this._handleDiseasePress("Heat Stress")
            }} title="Heat Stress"/>,
            <Menu.Item key={"Donkey-Mange Mite"} onPress={() => {
                this._handleDiseasePress("Mange Mite")
            }} title="Mange Mite"/>,
            <Menu.Item key={"Donkey-Rabies"} onPress={() => {
                this._handleDiseasePress("Rabies")
            }} title="Rabies"/>,
            <Menu.Item key={"Donkey-Respiratory (Lower Bacterical)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Lower Bacterical)")
            }} title="Respiratory (Lower Bacterical)"/>,
            <Menu.Item key={"Donkey-Respiratory (Upper Bacterical)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Upper Bacterical)")
            }} title="Respiratory (Upper Bacterical)"/>,
            <Menu.Item key={"Donkey-Respiratory (Asthma / Lungworm)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Asthma / Lungworm)")
            }} title="Respiratory (Asthma / Lungworm)"/>,
            <Menu.Item key={"Donkey-Respiratory (Viral)"} onPress={() => {
                this._handleDiseasePress("Respiratory (Viral)")
            }} title="Respiratory (Viral)"/>,
            <Menu.Item key={"Donkey-Strangles"} onPress={() => {
                this._handleDiseasePress("Strangles")
            }} title="Strangles"/>,
            <Menu.Item key={"Donkey-Tetanus"} onPress={() => {
                this._handleDiseasePress("Tetanus")
            }} title="Tetanus"/>,
            <Menu.Item key={"Donkey-Trypanosomosis"} onPress={() => {
                this._handleDiseasePress("Trypanosomosis")
            }} title="Trypanosomosis"/>,
            <Menu.Item key={"Donkey-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ],
        Sheep: [
            <Menu.Item key={"Sheep-Unknown"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Sheep-Coenurosis"} onPress={() => {
                this._handleDiseasePress("Coenurosis")
            }} title="Coenurosis"/>,
            <Menu.Item key={"Sheep-Contagious Ecthyma (ORF)"} onPress={() => {
                this._handleDiseasePress("Contagious Ecthyma (ORF)")
            }} title="Contagious Ecthyma (ORF)"/>,
            <Menu.Item key={"Sheep-Cowdriosis"} onPress={() => {
                this._handleDiseasePress("Cowdriosis")
            }} title="Cowdriosis"/>,
            <Menu.Item key={"Sheep-Fasciolosis"} onPress={() => {
                this._handleDiseasePress("Fasciolosis")
            }} title="Fasciolosis"/>,
            <Menu.Item key={"Sheep-Haemonchosis"} onPress={() => {
                this._handleDiseasePress("Haemonchosis")
            }} title="Haemonchosis"/>,
            <Menu.Item key={"Sheep-Hypocalcemia / Pregnancy Tox"} onPress={() => {
                this._handleDiseasePress("Hypocalcemia / Pregnancy Tox")
            }} title="Hypocalcemia / Pregnancy Tox"/>,
            <Menu.Item key={"Sheep-Lungworm"} onPress={() => {
                this._handleDiseasePress("Lungworm")
            }} title="Lungworm"/>,
            <Menu.Item key={"Sheep-Mange Mite"} onPress={() => {
                this._handleDiseasePress("Mange Mite")
            }} title="Mange Mite"/>,
            <Menu.Item key={"Sheep-Nasal Bot"} onPress={() => {
                this._handleDiseasePress("Nasal Bot")
            }} title="Nasal Bot"/>,
            <Menu.Item key={"Sheep-Pasteurellosis"} onPress={() => {
                this._handleDiseasePress("Pasteurellosis")
            }} title="Pasteurellosis"/>,
            <Menu.Item key={"Sheep-Pox"} onPress={() => {
                this._handleDiseasePress("Pox")
            }} title="Pox"/>,
            <Menu.Item key={"Sheep-Peste des Petits Ruminants (PPR)"} onPress={() => {
                this._handleDiseasePress("Peste des Petits Ruminants (PPR)")
            }} title="Peste des Petits Ruminants (PPR)"/>,
            <Menu.Item key={"Sheep-Trichostrongiulosis"} onPress={() => {
                this._handleDiseasePress("Trichostrongiulosis")
            }} title="Trichostrongiulosis"/>,
            <Menu.Item key={"Sheep-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ],
        Camel: [
            <Menu.Item key={"Camel-Unknown"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Camel-Anthrax"} onPress={() => {
                this._handleDiseasePress("Anthrax")
            }} title="Anthrax"/>,
            <Menu.Item key={"Camel-Brucellosis"} onPress={() => {
                this._handleDiseasePress("Brucellosis")
            }} title="Brucellosis"/>,
            <Menu.Item key={"Camel-Camel Calf Diarrhoea"} onPress={() => {
                this._handleDiseasePress("Camel Calf Diarrhoea")
            }} title="Camel Calf Diarrhoea"/>,
            <Menu.Item key={"Camel-Contagious Ecthyma (ORF)"} onPress={() => {
                this._handleDiseasePress("Contagious Ecthyma (ORF)")
            }} title="Contagious Ecthyma (ORF)"/>,
            <Menu.Item key={"Camel-Hemorrhagic Septicemia"} onPress={() => {
                this._handleDiseasePress("Hemorrhagic Septicemia")
            }} title="Hemorrhagic Septicemia"/>,
            <Menu.Item key={"Camel-Hypocalcemia / Pregnancy Tox"} onPress={() => {
                this._handleDiseasePress("Hypocalcemia / Pregnancy Tox")
            }} title="Hypocalcemia / Pregnancy Tox"/>,
            <Menu.Item key={"Camel-Mange Mite"} onPress={() => {
                this._handleDiseasePress("Mange Mite")
            }} title="Mange Mite"/>,
            <Menu.Item key={"Camel-Mastitis"} onPress={() => {
                this._handleDiseasePress("Mastitis")
            }} title="Mastitis"/>,
            <Menu.Item key={"Camel-Pasteurellosis"} onPress={() => {
                this._handleDiseasePress("Pasteurellosis")
            }} title="Pasteurellosis"/>,
            <Menu.Item key={"Camel-Plant Poisoning"} onPress={() => {
                this._handleDiseasePress("Plant Poisoning")
            }} title="Plant Poisoning"/>,
            <Menu.Item key={"Camel-Pox"} onPress={() => {
                this._handleDiseasePress("Pox")
            }} title="Pox"/>,
            <Menu.Item key={"Camel-Pus / Abscess"} onPress={() => {
                this._handleDiseasePress("Pus / Abscess")
            }} title="Pus / Abscess"/>,
            <Menu.Item key={"Camel-Respiratory Infections"} onPress={() => {
                this._handleDiseasePress("Respiratory Infections")
            }} title="Respiratory Infections"/>,
            <Menu.Item key={"Camel-SDS / Unknown Camel Disease"} onPress={() => {
                this._handleDiseasePress("SDS / Unknown Camel Disease")
            }} title="SDS / Unknown Camel Disease"/>,
            <Menu.Item key={"Camel-Trypanosomosis"} onPress={() => {
                this._handleDiseasePress("Trypanosomosis")
            }} title="Trypanosomosis"/>,
            <Menu.Item key={"Camel-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ],
        Goat: [
            <Menu.Item key={"Goat-Babesiosis"} onPress={() => {
                this._handleDiseasePress("Unknown")
            }} title="Unknown"/>,
            <Menu.Item key={"Goat-Brucellosis"} onPress={() => {
                this._handleDiseasePress("Brucellosis")
            }} title="Brucellosis"/>,
            <Menu.Item key={"Goat-CBPP / CCPP"} onPress={() => {
                this._handleDiseasePress("CBPP / CCPP")
            }} title="CBPP / CCPP"/>,
            <Menu.Item key={"Goat-Contagious Ecthyma (ORF)"} onPress={() => {
                this._handleDiseasePress("Contagious Ecthyma (ORF)")
            }} title="Contagious Ecthyma (ORF)"/>,
            <Menu.Item key={"Goat-Cowdriosis"} onPress={() => {
                this._handleDiseasePress("Cowdriosis")
            }} title="Cowdriosis"/>,
            <Menu.Item key={"Goat-Hypocalcemia / Pregnancy Tox"} onPress={() => {
                this._handleDiseasePress("Hypocalcemia / Pregnancy Tox")
            }} title="Hypocalcemia / Pregnancy Tox"/>,
            <Menu.Item key={"Goat-Lungworm"} onPress={() => {
                this._handleDiseasePress("Lungworm")
            }} title="Lungworm"/>,
            <Menu.Item key={"Goat-Mange Mite"} onPress={() => {
                this._handleDiseasePress("Mange Mite")
            }} title="Mange Mite"/>,
            <Menu.Item key={"Goat-Mastitis"} onPress={() => {
                this._handleDiseasePress("Mastitis")
            }} title="Mastitis"/>,
            <Menu.Item key={"Goat-Pox"} onPress={() => {
                this._handleDiseasePress("Pox")
            }} title="Pox"/>,
            <Menu.Item key={"Goat-Pus / Abscess"} onPress={() => {
                this._handleDiseasePress("Pus / Abscess")
            }} title="Pus / Abscess"/>,
            <Menu.Item key={"Goat-Peste des Petits Ruminants (PPR)"} onPress={() => {
                this._handleDiseasePress("Peste des Petits Ruminants (PPR)")
            }} title="Peste des Petits Ruminants (PPR)"/>,
            <Menu.Item key={"Goat-Trichostrongiulosis"} onPress={() => {
                this._handleDiseasePress("Trichostrongiulosis")
            }} title="Trichostrongiulosis"/>,
            <Menu.Item key={"Goat-Other"} onPress={() => {
                this._handleDiseasePress("Other")
            }} title="Other"/>,
        ]
    };

    state = {
        name: null,
        dateSelected: null,
        location: null,
        species: null,
        age: null,
        breed: null,
        sex: null,
        diagnosis: null,
        defaultAnimal: null,
        images: null,
        uris: [],
        isUploaded: false,
        date: Date.now(),
        mode: 'date',
        show: false,
        diseases: [],
        saveLoading: false,
        uploadLoading: false,
        type: 0,
    };

    checkCase(curCase, alert) {
        console.log(curCase);
        let complete = true;
        Object.keys(curCase).forEach(k => {
            if (curCase[k] === null && !(this.state.type && k === "diagnosis"))
                complete = false;
        });
        if (!complete && alert) {
            new Alert.alert('Case Not Completed', 'You must fully complete the form before uploading the case.',);
            this.setState({
                uploadLoading: false
            });
        }
        return complete;
    }

    checkInternetAccess() {
        return NetInfo.fetch()
            .then(state => {
                if (state.isInternetReachable) {
                    if (this.state.wifi && state.type === NetInfoStateType.wifi || this.state.cell && state.type === NetInfoStateType.cellular) {
                        return true;
                    } else {
                        new Alert.alert("Cannot Upload", "You are currently connected to the internet via: " + state.type + "\nPlease connect to the internet using your preferred network type, specified in settings.");
                        return false;
                    }
                } else {
                    new Alert.alert("No Internet", "Please connect to the internet to upload your case.");
                    return false;
                }
            })
            .catch(error => {
                new Alert.alert("Error", "An error occurred fetching your network type.");
                console.log("Error fetching network state: " + error);
            })
    }

    uploadCase(curCase, feedback) {
        const body = new FormData();
        this.state.uris.forEach(img => {
            body.append("images[]", {
                uri: img.uri,
                name: img.name,
                type: "image/jpg"
            });
            curCase.sides.push(img.side);
        });
        body.append("case", JSON.stringify(curCase));
        body.append("feedback", feedback);
        fetch('https://devweb2019.cis.strath.ac.uk/~xsb16116/ADD/ImageCollector.php',
            {
                method: 'POST',
                body: body,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Request to server successful.");
                    console.log(response.status);
                    response.text()
                        .then(text => {
                            console.log(text);
                        });
                    this.setState({
                        isUploaded: true,
                        uploadLoading: false,
                    });
                    new Alert.alert(
                        'Uploaded',
                        'Your case information has been uploaded.',
                        [{text: 'OK', onPress: () => this.onSavePress()},],
                        {cancelable: false},
                    );
                } else {
                    console.log("Request to server unsuccessful.");
                    console.log(response.status);
                    response.text()
                        .then(text => {
                            console.log(text);
                        });
                    this.setState({
                        uploadLoading: false,
                    });
                    new Alert.alert(
                        'Upload Failed',
                        'Your case information failed to upload.',
                        [{text: 'OK', onPress: () => this.onSavePress()},],
                        {cancelable: false},
                    );
                }
            })
            .catch(error => {
                console.log("Error making request : " + error);
                this.setState({
                    uploadLoading: false,
                });
            });
    }

    onUploadPress() {
        this.setState({
            uploadLoading: true,
        });
        let curCase = {
            name: this.state.name,
            dateSelected: this.state.dateSelected,
            location: this.state.location,
            species: this.state.species,
            age: this.state.age,
            breed: this.state.breed,
            sex: this.state.sex,
            diagnosis: this.state.diagnosis ? this.state.diagnosis : "Healthy",
            type: this.state.type,
            sides: [],
        };
        if (!this.checkCase(curCase, true)) return;
        this.state.curCase = curCase;
        this.checkInternetAccess()
            .then(access => {
                if (!access) {
                    this.setState({
                        uploadLoading: false,
                    });
                    return;
                }
                this.setState({
                    feedbackPending: true
                });
            })
            .catch(error => {
                console.log("Error fetching network state [FROM CALL TO checkInternetAccess()]: " + error);
                this.setState({
                    uploadLoading: false,
                });
            });
    }

    //    ________
    //    |  o  o |
    //    | |___| |
    //    |_______|
    //     _|  _|
    onSavePress() {
        this.setState({
            saveLoading: true,
        });
        let caseName = this.props.navigation.getParam('caseName') === null || this.props.navigation.getParam('caseName') === undefined
            ? null : this.props.navigation.getParam('caseName');
        AsyncStorage.getItem("numCases")
            .then(value => {
                if (caseName === null)
                    caseName = "case" + value;
                let curCase = {
                    name: this.state.name,
                    dateSelected: this.state.dateSelected,
                    location: this.state.location,
                    species: this.state.species,
                    age: this.state.age,
                    breed: this.state.breed,
                    sex: this.state.sex,
                    diagnosis: this.state.diagnosis,
                    uris: this.state.uris,
                    isUploaded: this.state.isUploaded,
                    type: this.state.type
                };
                curCase.completed = this.checkCase(curCase, false);
                AsyncStorage.setItem(caseName, JSON.stringify(curCase))
                    .then(() => {
                        if (this.props.navigation.getParam('caseName') === null || this.props.navigation.getParam('caseName') === undefined) {
                            AsyncStorage.setItem('numCases', '' + (parseInt(value) + 1))
                                .then(() => {
                                    this.setState({
                                        saveLoading: false,
                                    });
                                    this.props.navigation.navigate('homeView');
                                    new Alert.alert(
                                        'Saved',
                                        'Your case has been saved.'
                                    );
                                })
                                .catch(error => {
                                    this.setState({
                                        saveLoading: false,
                                    });
                                    console.log('Error occurred when incrementing numCases: ' + error)
                                });
                        } else {
                            this.setState({
                                saveLoading: false,
                            });
                            this.props.navigation.navigate('homeView');
                            new Alert.alert(
                                'Saved',
                                'Your case has been saved.'
                            );
                        }
                    })
                    .catch(error => {
                        this.setState({
                            saveLoading: false,
                        });
                        console.log('Error occurred when saving classification: ' + error)
                    });
            })
    }

    constructor(props) {
        super(props);
        this.state.type = this.props.navigation.getParam('type') === "Disease" ? 0 : 1;
        this.state.images = this.props.navigation.getParam('images');
        this.state.images.assets.forEach(img => {
            this.state.uris.push({uri: img[0].uri, name: img[0].filename, side: img[1]});
        });
        if (this.props.navigation.getParam('case') !== null && this.props.navigation.getParam('case') !== undefined) {
            this.state = Object.assign({}, this.state, this.props.navigation.getParam('case'));
            this.state.speciesShown = this.state.species;
            this.state.locationShown = this.state.location;
            this.state.diagnosisShown = this.state.diagnosis;
            if (this.state.species !== null) {
                this.state.diseases = this.diseases[this.state.species];
            }
        }
        this.state = Object.assign({}, this.state, this.props.navigation.getParam('settings'));
        if (this.state.species) this.state.diseases = this.diseases[this.state.species]
    }

    showDatePicker() {
        this.setState({
            show: true
        });
    }

    setDate(event, date) {
        if (date !== undefined) {
            this.setState({
                dateSelected: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().slice(2, 4),
                date: date,
                show: false,
            });
        }
    }

    buildPreview = function (images) {
        let imgs = [];
        images.assets.forEach(function (img) {
            imgs.push(<Image style={styles.image}
                             key={img[0].filename}
                             source={img[0]}/>);
        });
        return imgs;
    };

    _handleSpeciesPress = (val) => {
        this.setState({
            speciesExpanded: !this.state.speciesExpanded,
            species: val ? val : this.state.species,
            speciesShown: this.state.speciesExpanded ? val ? val : this.state.species : this.state.species ? this.state.species : " ",
            diagnosis: null,
            diseases: this.diseases[val]
        });
    };

    _handleLocPress = (val) => {
        this.setState({
            locExpanded: !this.state.locExpanded,
            location: val ? val : this.state.location,
            locationShown: this.state.locExpanded ? val ? val : this.state.location : this.state.location ? this.state.location : " "
        });
    };

    _handleDiseasePress = (val) => {
        this.setState({
            diseaseExpanded: !this.state.diseaseExpanded,
            diagnosis: val ? val : this.state.diagnosis,

            diagnosisShown:
                this.state.diseaseExpanded ?
                    val ?
                        val :
                        this.state.diagnosis :
                    this.state.species ?
                        this.state.diagnosis ?
                            this.state.diagnosis :
                            " " :
                        "No species specified..."
        });
    };

    _handleFeedback = (val) => {
        this.setState({feedbackPending: false});
        this.uploadCase(this.state.curCase, val);
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
                {this.state.feedbackPending ?
                    <View style={styles.feedbackContainer}>
                        <View style={styles.feedbackScreen}>
                            <View style={styles.feedbackScreenMargin}>
                                <Text style={styles.feedbackTitle}>Feedback</Text>
                                <Text style={styles.feedbackText}>How was your experience capturing and uploading this
                                    case?</Text>
                                <View style={styles.feedbackImgWrapper}>
                                    <View style={styles.feedbackImgContainer}>
                                        <TouchableOpacity onPress={() => this._handleFeedback(1)}>
                                            <Image style={styles.feedbackImg}
                                                   source={require('../assets/img/sad.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedback(2)}>
                                            <Image style={styles.feedbackImg}
                                                   source={require('../assets/img/neutral.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleFeedback(3)}>
                                            <Image style={styles.feedbackImg}
                                                   source={require('../assets/img/happy.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.darken}>
                        </View>
                    </View>
                    : null}
                <View style={styles.container}>
                    <Text style={styles.title}>Annotate the Image(s)</Text>
                    <View style={styles.swipeWrapper}>
                        <Swiper
                            containerStyle={styles.swipeContainer}
                            activeDotColor={"#1565c0"}
                            loadMinimal={false}
                            loop={false}
                            width={Dimensions.get("window").width / 3}
                            height={"100%"}>
                            {this.buildPreview(this.state.images)}
                        </Swiper>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.formEmpty}/>
                        <View style={styles.scrollContainer}>
                            <ScrollView scrollIndicatorInsets={{right: -100}}>
                                <View style={styles.textEntryContainer}>
                                    <Image source={require('../assets/img/person-grey.png')} style={styles.optionImg}/>
                                    <TextInput
                                        label='Identifier'
                                        value={this.state.name}
                                        onChangeText={text => this.setState({name: text})}
                                        style={styles.textInput}
                                    />
                                </View>
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <View style={styles.textEntryContainer}>
                                    <Image source={require('../assets/img/calendar-grey.png')}
                                           style={styles.optionImg}/>
                                    <View style={styles.textInput}>
                                        <TouchableOpacity onPress={this.showDatePicker.bind(this)}>
                                            <TextInput
                                                label={this.state.dateSelected === null ? "Date (DD/MM/YY)" : "Date of Observation"}
                                                value={this.state.dateSelected}
                                                placeholder
                                                editable={false}
                                                underlineColor={this.state.show ? "#1565c0" : null}
                                                style={{
                                                    paddingRight: Dimensions.get("window").width / 10,
                                                    width: "100%"
                                                }}/>
                                        </TouchableOpacity>
                                        {this.state.show && <RNDateTimePicker value={this.state.date}
                                                                              mode={this.state.mode}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate.bind(this)}/>
                                        }
                                    </View>
                                </View>
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <View style={styles.textEntryContainer}>
                                    <Image source={require('../assets/img/pin.png')} style={styles.optionImg}/>
                                    <View style={styles.textInput}>
                                        <TouchableOpacity onPress={this._handleLocPress.bind(this, null)}>
                                            <TextInput
                                                label='Location'
                                                value={this.state.locationShown}
                                                editable={false}
                                                underlineColor={this.state.speciesExpanded ? "#1565c0" : null}
                                                style={{
                                                    paddingRight: Dimensions.get("window").width / 10,
                                                    width: "100%"
                                                }}/>
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
                                                y: Dimensions.get("window").height * 11.4 / 15
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
                                                this._handleLocPress("SNNPR")
                                            }} title="SNNPR"/>
                                            <Menu.Item onPress={() => {
                                                this._handleLocPress("Tigray Region")
                                            }} title="Tigray Region"/>
                                            {/*// TODO Have SNNPR be fully typed, but not cause scroll bug*/}
                                        </Menu>
                                    </View>
                                </View>
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <View style={styles.textEntryContainer}>
                                    <Image source={require('../assets/img/species-choice.png')}
                                           style={styles.optionImg}/>
                                    <View style={styles.textInput}>
                                        <TouchableOpacity onPress={this._handleSpeciesPress.bind(this, null)}>
                                            <TextInput
                                                label='Species'
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
                                                y: Dimensions.get("window").height * 11.4 / 15
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
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <Text style={styles.radioTitle}>Age of Animal:</Text>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="0 - 6 Months"
                                        status={this.state.age === 1 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({age: this.state.age === 1 ? 0 : 1});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({age: this.state.age === 1 ? 0 : 1});
                                    }}>
                                        <Text style={styles.radioText}>0 - 6 Months</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="7 - 12 Months"
                                        status={this.state.age === 2 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({age: this.state.age === 2 ? 0 : 2});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({age: this.state.age === 2 ? 0 : 2});
                                    }}>
                                        <Text style={styles.radioText}>7 - 12 Months</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="13 - 24 Months"
                                        status={this.state.age === 3 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({age: this.state.age === 3 ? 0 : 3});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({age: this.state.age === 3 ? 0 : 3});
                                    }}>
                                        <Text style={styles.radioText}>13 - 24 Months</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Over 24 Months"
                                        status={this.state.age === 4 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({age: this.state.age === 4 ? 0 : 4});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({age: this.state.age === 4 ? 0 : 4});
                                    }}>
                                        <Text style={styles.radioText}>Over 24 Months</Text>
                                    </TouchableOpacity>
                                </View>
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <Text style={styles.radioTitle}>Breed of Animal:</Text>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Local"
                                        status={this.state.breed === 1 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({breed: this.state.breed === 1 ? 0 : 1});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({breed: this.state.breed === 1 ? 0 : 1});
                                    }}>
                                        <Text style={styles.radioText}>Local</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Cross"
                                        status={this.state.breed === 2 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({breed: this.state.breed === 2 ? 0 : 2});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({breed: this.state.breed === 2 ? 0 : 2});
                                    }}>
                                        <Text style={styles.radioText}>Cross</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Exotic"
                                        status={this.state.breed === 3 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({breed: this.state.breed === 3 ? 0 : 3});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({breed: this.state.breed === 3 ? 0 : 3});
                                    }}>
                                        <Text style={styles.radioText}>Exotic</Text>
                                    </TouchableOpacity>
                                </View>
                                <Divider style={{
                                    height: 1,
                                    marginRight: Dimensions.get('window').width / 30,
                                    marginLeft: Dimensions.get('window').width / 30,
                                    marginBottom: Dimensions.get('window').width / 30
                                }}/>
                                <Text style={styles.radioTitle}>Sex of Animal:</Text>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Male"
                                        status={this.state.sex === 1 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({sex: this.state.sex === 1 ? 0 : 1});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({sex: this.state.sex === 1 ? 0 : 1});
                                    }}>
                                        <Text style={styles.radioText}>Male</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton
                                        value="Female"
                                        status={this.state.sex === 2 ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({sex: this.state.sex === 2 ? 0 : 2});
                                        }}
                                    />
                                    <TouchableOpacity style={styles.radioTouchable} onPress={() => {
                                        this.setState({sex: this.state.sex === 2 ? 0 : 2});
                                    }}>
                                        <Text style={styles.radioText}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.type === 0 ?
                                    <Divider style={{
                                        height: 1,
                                        marginRight: Dimensions.get('window').width / 30,
                                        marginLeft: Dimensions.get('window').width / 30,
                                        marginBottom: Dimensions.get('window').width / 30
                                    }}/>
                                    : null}
                                {this.state.type === 0 ?
                                    <View
                                        style={[styles.textEntryContainer, {marginBottom: Dimensions.get('window').width / 30}]}>
                                        <Image source={require('../assets/img/disease.png')}
                                               style={styles.optionImg}/>
                                        <View style={styles.textInput}>
                                            <TouchableOpacity onPress={this._handleDiseasePress.bind(this, null)}>
                                                <TextInput
                                                    label='Presumed Disease'
                                                    value={this.state.diagnosisShown}
                                                    editable={false}
                                                    underlineColor={this.state.diseaseExpanded ? "#1565c0" : null}
                                                />
                                                <Image source={require('../assets/img/down-arrow.png')}
                                                       style={styles.dropdownImg}/>
                                            </TouchableOpacity>
                                            <Menu
                                                visible={this.state.diseaseExpanded}
                                                onDismiss={this._handleDiseasePress.bind(this, null)}
                                                statusBarHeight={0}
                                                selectionColor={"#1565c0"}
                                                anchor={{
                                                    x: Dimensions.get("window").width * 14 / 15,
                                                    y: Dimensions.get("window").height * 11.4 / 15
                                                }}>
                                                {this.state.diseases}
                                            </Menu>
                                        </View>
                                    </View>
                                    : null}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} mode="contained" loading={this.state.uploadLoading}
                                    onPress={this.onUploadPress.bind(this)}>
                                Upload Case
                            </Button>
                            <Button style={styles.button} mode="contained" loading={this.state.saveLoading}
                                    onPress={this.onSavePress.bind(this)}>
                                Save
                            </Button>
                        </View>
                    </View>
                </View>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    feedbackContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 4,
        position: "absolute",
    },
    darken: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "black",
        opacity: 0.6,
        position: "absolute",
        zIndex: 4
    },
    feedbackScreen: {
        alignSelf: "center",
        width: Dimensions.get('window').width * 4 / 5,
        height: Dimensions.get('window').height / 5,
        // flex: 1,
        alignItems: 'center',
        zIndex: 5,
        position: 'absolute',
        transform: [{translateY: Dimensions.get('window').height / 4}],
        borderRadius: 3,
        backgroundColor: '#ffffff',
        //borderWidth: 1,
    },
    feedbackScreenMargin: {
        width: Dimensions.get('window').width * 4 / 5,
        height: Dimensions.get('window').height / 5,
        padding: Dimensions.get('window').width / 30,
    },
    feedbackTitle: {
        flex: 1.5,
        fontWeight: "bold",
        flexDirection: 'column',
        color: 'black',
        fontSize: 20,
        width: "100%",
    },
    feedbackText: {
        flex: 3,
        fontSize: 16,
        flexDirection: 'column',
        width: "100%",
    },
    feedbackImgWrapper: {
        flex: 1.5,
        flexDirection: 'column',
        width: "100%",
    },
    feedbackImgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: Dimensions.get('window').width / 30,
        paddingRight: Dimensions.get('window').width / 30,
    },
    feedbackImg: {
        width: Dimensions.get('window').width / 12,
        height: Dimensions.get('window').width / 12,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        color: '#646464',
        fontSize: 25,
        flex: 1.25,
        flexDirection: "column"
    },
    swipeWrapper: {
        flex: 6,
        flexDirection: "column",
    },
    swipeContainer: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#646464',
    },
    image: {
        width: Dimensions.get("window").width / 3,
        height: "100%"
    },
    formContainer: {
        flex: 11,
        flexDirection: "column",
        //justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: Dimensions.get('window').height / 15,
        flex: 1,
    },
    textInputText: {
        width: "80%"
    },
    textEntryContainer: {
        height: Dimensions.get('window').height / 14,
        margin: Dimensions.get('window').width / 40,
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
    radioTitle: {
        color: '#646464',
        fontSize: 18,
        marginBottom: Dimensions.get('window').width / 30,
        marginLeft: Dimensions.get('window').width / 30,
        marginRight: Dimensions.get('window').width / 30,
    },
    radioButtonContainer: {
        height: Dimensions.get('window').height / 30,
        marginLeft: Dimensions.get('window').width / 20,
        //marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        color: '#646464',
        fontSize: 18,
        marginLeft: Dimensions.get('window').width / 30,
        marginRight: Dimensions.get('window').width / 30,
    },
    radioTouchable: {
        flex: 1,
        flexDirection: "row",
        paddingTop: Dimensions.get('window').width / 60,
        paddingBottom: Dimensions.get('window').width / 60,
    },
    actionContainer: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        width: Dimensions.get("window").width / 2.5,
        marginRight: Dimensions.get("window").width / 25,
        marginLeft: Dimensions.get("window").width / 25
    },
    scrollContainer: {
        width: Dimensions.get("window").width * 9 / 10,
        flex: 25,
        flexDirection: "column",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#646464',

    },
    formEmpty: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "yellow"
    },


});

export default CategoriseView;

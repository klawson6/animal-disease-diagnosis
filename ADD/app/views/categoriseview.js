import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import {
    Button, DefaultTheme, Provider as PaperProvider,
} from "react-native-paper"
import FeedbackFormSmall from "../Components/FeedbackFormSmall";
import WrappedSwiper from "../Components/WrappedSwiper";
import MaterialTextField from "../Components/MaterialTextField";
import FormDivider from "../Components/FormDivider";
import MaterialDatePicker from "../Components/MaterialDatePicker";
import MaterialMultiChoice from "../Components/MaterialMultiChoice";
import FormRadios from "../Components/FormRadios";

class CategoriseView extends Component {

    diseases = {
        Cattle: [
            'Unknown',
            'Anthrax',
            'Babesiosis',
            'Blackleg',
            'CBPP / CCPP',
            'Colibacillosis',
            'Cowdriosis',
            'Fasciolosis',
            'Foot & Mouth Disease',
            'Pasteurellosis',
            'PGE / GIT Parasite',
            'Lumpy Skin Disease',
            'Lungworm',
            'Rabies',
            'Trypanosomiasis',
            'Tuberculosis',
            'Other'
        ],
        Horse: [
            'Unknown',
            'African Horse Sickness (AHS)',
            'Anthrax',
            'Ascaris (Foals only)',
            'Babesiosis',
            'GI (Non-infectious / Colic)',
            'GI (Parasitic)',
            'Habronemiasis',
            'Heat Stress',
            'Lymphangitis (Epizootic)',
            'Lymphangitis (Ulcerative)',
            'Mange Mite',
            'Rabies',
            'Respiratory (Lower Bacterical)',
            'Respiratory (Upper Bacterical)',
            'Respiratory (Asthma / Lungworm)',
            'Respiratory (Viral)',
            'Strangles',
            'Tetanus',
            'Trypanosomosis',
            'Other',
        ],
        Donkey: [
            'Unknown',
            'Anthrax',
            'Ascaris (Foals only)',
            'Babesiosis',
            'GI (Non-infectious / Colic)',
            'GI (Parasitic)',
            'Habronemiasis',
            'Heat Stress',
            'Mange Mite',
            'Rabies',
            'Respiratory (Lower Bacterical)',
            'Respiratory (Upper Bacterical)',
            'Respiratory (Asthma / Lungworm)',
            'Respiratory (Viral)',
            'Strangles',
            'Tetanus',
            'Trypanosomosis',
            'Other',
        ],
        Sheep: [
            'Unknown',
            'Coenurosis',
            'Contagious Ecthyma (ORF)',
            'Cowdriosis',
            'Fasciolosis',
            'Haemonchosis',
            'Hypocalcemia / Pregnancy Tox',
            'Lungworm',
            'Mange Mite',
            'Nasal Bot',
            'Pasteurellosis',
            'Pox',
            'Peste des Petits Ruminants (PPR)',
            'Trichostrongiulosis',
            'Other',
        ],
        Camel: [
            'Unknown',
            'Anthrax',
            'Brucellosis',
            'Camel Calf Diarrhoea',
            'Contagious Ecthyma (ORF)',
            'Hemorrhagic Septicemia',
            'Hypocalcemia / Pregnancy Tox',
            'Mange Mite',
            'Mastitis',
            'Pasteurellosis',
            'Plant Poisoning',
            'Pox',
            'Pus / Abscess',
            'Respiratory Infections',
            'SDS / Unknown Camel Disease',
            'Trypanosomosis',
            'Other',
        ],
        Goat: [
            'Unknown',
            'Brucellosis',
            'CBPP / CCPP',
            'Contagious Ecthyma (ORF)',
            'Cowdriosis',
            'Hypocalcemia / Pregnancy Tox',
            'Lungworm',
            'Mange Mite',
            'Mastitis',
            'Pox',
            'Pus / Abscess',
            'Peste des Petits Ruminants (PPR)',
            'Trichostrongiulosis',
            'Other',
        ]
    };
    species = ["Cattle", "Goat", "Sheep", "Camel", "Horse", "Donkey"];
    locations = ["Addis Ababa", "Afar Region", "Amhara Region", "Benishangul-Gumuz Region", "Dire Dawa", "Gamebela Region", "Harari Region", "Oromia Region", "Somali Region", "SNNPR", "Tigray Region"];
    model;

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
        case: null,
        date: Date.now(),
        mode: 'date',
        show: false,
        diseases: [],
        saveLoading: false,
        uploadLoading: false,
        locationShown: false,
        speciesShown: false,
        diagnosisShown: false,
        specExpanded: false,
        locExpanded: false,
        diseaseExpanded: false
    };

    constructor(props) {
        super(props);
        this.model = this.props.navigation.getParam('model');
        this.state = Object.assign({}, this.state, this.model.getCurrentCase());
        this.state.speciesShown = this.state.species;
        this.state.locationShown = this.state.location;
        this.state.diagnosisShown = this.state.diagnosis;
        if (this.state.species !== null) {
            this.state.diseases = this.diseases[this.state.species];
        }
    }

    uploadCase(feedback) {
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
        this.model.checkAndUploadCase(curCase, feedback)
            .then(result => {
                switch (result) {
                    case 0:
                        new Alert.alert('Error', 'An error occurred when saving the case, so it was not saved or uploaded.',);
                        break;
                    case 1:
                        new Alert.alert('Case Not Completed', 'You must fully complete the form before uploading the case.',);
                        break;
                    case 2:
                        // Alert delegated to checkInternetAccess in model
                        break;
                    case 3:
                        new Alert.alert(
                            'Upload Failed',
                            'The case was saved, but an error occurred when trying to upload the case.',
                            [{text: 'OK'}],
                            {cancelable: false},
                        );
                        break;
                    case 4:
                        new Alert.alert(
                            'Upload Failed',
                            'The case was saved, but the case information failed to upload. Something went wrong with the request to the server.',
                            [{text: 'OK'}],
                            {cancelable: false},
                        );
                        break;
                    case 5:
                        new Alert.alert(
                            'Uploaded',
                            'The case information has been uploaded and saved.',
                            [{text: 'OK'}],
                            {cancelable: false},
                        );
                        this.props.navigation.navigate("homeView");
                        break;
                    case 6:
                        new Alert.alert(
                            'Uploaded',
                            'The case information has been uploaded and saved, however an error occurred, the case will appear to be not uploaded',
                            [{text: 'OK'}],
                            {cancelable: false},
                        );
                        this.props.navigation.navigate("homeView");
                        break;
                    default:
                        console.log("Error, upload case not found");
                        break;
                }
                this.setState({
                    uploadLoading: false,
                });
            })
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
        let curCase = {
            name: this.state.name,
            dateSelected: this.state.dateSelected,
            location: this.state.location,
            species: this.state.species,
            age: this.state.age,
            breed: this.state.breed,
            sex: this.state.sex,
            diagnosis: this.state.diagnosis ? this.state.diagnosis : "Healthy",
            sides: [],
            isUploaded: false
        };
        this.model.saveCase(curCase)
            .then(result => {
                if (result) {
                    this.setState({
                        saveLoading: false,
                    });
                    this.props.navigation.navigate('homeView');
                    new Alert.alert(
                        'Saved',
                        'Your case has been saved.'
                    );
                } else {
                    this.setState({
                        saveLoading: false,
                    });
                    new Alert.alert(
                        'Error',
                        'An error occurred when trying to save your case. Your case could not be saved.'
                    );
                }
            });
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
        } else {
            this.setState({show: false});
        }
    }

    _handleSpeciesPress = (val) => {
        this.setState({
            speciesExpanded: !this.state.speciesExpanded,
            species: val ? val : this.state.species,
            speciesShown: this.state.speciesExpanded ? val ? val : this.state.species : this.state.species ? this.state.species : " ",
            diagnosis: null,
            diseases: this.diseases[val],
            diagnosisShown: null
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

    onUploadPress() {
        this.setState({
            uploadLoading: true,
            feedbackPending: true
        });
    }

    _handleFeedback = (val) => {
        this.setState({feedbackPending: false});
        this.uploadCase(val);
    };

    _handleRadio = (key, val) => {
        this.setState({[key]: this.state[key] === val ? 0 : val});
        setTimeout(() => {
            console.log(this.state[key]);
        }, 250)
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
                    <FeedbackFormSmall
                        message={"How was your experience capturing and uploading this case?"}
                        onPress={this._handleFeedback}/>
                    : null}
                <View style={styles.container}>
                    <Text style={styles.title}>Annotate the Image(s)</Text>
                    <WrappedSwiper images={this.state.assets}/>
                    <View style={styles.formContainer}>
                        <View style={styles.formEmpty}/>
                        <View style={styles.scrollContainer}>
                            <ScrollView>
                                <MaterialTextField icon={require('../assets/img/person-grey.png')}
                                                   name={this.state.name}
                                                   onChangeText={(val) => this.setState({name: val})}/>
                                <FormDivider/>
                                <MaterialDatePicker showPicker={this.showDatePicker.bind(this)}
                                                    show={this.state.show}
                                                    date={this.state.date}
                                                    dateSelected={this.state.dateSelected}
                                                    onChange={this.setDate.bind(this)}/>
                                <FormDivider/>
                                <MaterialMultiChoice icon={require('../assets/img/pin.png')}
                                                     onChoice={this._handleLocPress.bind(this)}
                                                     itemShown={this.state.locationShown}
                                                     expanded={this.state.locExpanded}
                                                     items={this.locations}
                                                     label={"Location"}/>
                                <FormDivider/>
                                <MaterialMultiChoice icon={require('../assets/img/species-choice.png')}
                                                     onChoice={this._handleSpeciesPress.bind(this)}
                                                     itemShown={this.state.speciesShown}
                                                     expanded={this.state.speciesExpanded}
                                                     items={this.species}
                                                     label={"Species"}/>
                                <FormDivider/>
                                <FormRadios title={"Age of Animal:"}
                                            value={this.state.age}
                                            identifier={"age"}
                                            onPress={this._handleRadio.bind(this)}
                                            options={["0 - 6 Months", "7 - 12 Months", "13 - 24 Months", "Over 24 Months"]}/>
                                <FormDivider/>
                                <FormRadios title={"Breed of Animal:"}
                                            value={this.state.breed}
                                            identifier={"breed"}
                                            onPress={this._handleRadio.bind(this)}
                                            options={["Local", "Cross", "Exotic"]}/>
                                <FormDivider/>
                                <FormRadios title={"Sex of Animal:"}
                                            value={this.state.sex}
                                            identifier={"sex"}
                                            onPress={this._handleRadio.bind(this)}
                                            options={["Male", "Female"]}/>
                                {this.state.type ?
                                    null :
                                    <FormDivider/>}
                                {this.state.type ?
                                    null :
                                    <MaterialMultiChoice icon={require('../assets/img/disease.png')}
                                                         onChoice={this._handleDiseasePress.bind(this)}
                                                         itemShown={this.state.diagnosisShown}
                                                         expanded={this.state.diseaseExpanded}
                                                         items={this.state.diseases}
                                                         label={"Predicted Disease"}/>
                                }
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
    formContainer: {
        flex: 11,
        flexDirection: "column",
        //justifyContent: 'center',
        alignItems: 'center',
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

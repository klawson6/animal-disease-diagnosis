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
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import Swiper from 'react-native-swiper'
import RNDateTimePicker from '@react-native-community/datetimepicker';

class CategoriseView extends Component {

    diseases = {
        Cattle: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'Anthrax', value: 'Anthrax', color: '#000000'},
            {label: 'Babesiosis', value: 'Babesiosis', color: '#000000'},
            {label: 'Blackleg', value: 'Blackleg', color: '#000000'},
            {label: 'CBPP / CCPP', value: 'CBPP / CCPP', color: '#000000'},
            {label: 'Colibacillosis', value: 'Colibacillosis', color: '#000000'},
            {label: 'Cowdriosis', value: 'Cowdriosis', color: '#000000'},
            {label: 'Fasciolosis', value: 'Fasciolosis', color: '#000000'},
            {label: 'Foot & Mouth Disease', value: 'Foot & Mouth Disease', color: '#000000'},
            {label: 'Pasteurellosis', value: 'Pasteurellosis', color: '#000000'},
            {label: 'PGE / GIT Parasite', value: 'PGE / GIT Parasite', color: '#000000'},
            {label: 'Lumpy Skin Disease', value: 'Lumpy Skin Disease', color: '#000000'},
            {label: 'Lungworm', value: 'Lungworm', color: '#000000'},
            {label: 'Rabies', value: 'Rabies', color: '#000000'},
            {label: 'Trypanosomiasis', value: 'Trypanosomiasis', color: '#000000'},
            {label: 'Tuberculosis', value: 'Tuberculosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ],
        Horse: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'African Horse Sickness (AHS)', value: 'African Horse Sickness (AHS)', color: '#000000'},
            {label: 'Anthrax', value: 'Anthrax', color: '#000000'},
            {label: 'Ascaris (Foals only)', value: 'Ascaris (Foals only)', color: '#000000'},
            {label: 'Babesiosis', value: 'Babesiosis', color: '#000000'},
            {label: 'GI (Non-infectious / Colic)', value: 'GI (Non-infectious / Colic)', color: '#000000'},
            {label: 'GI (Parasitic)', value: 'GI (Parasitic)', color: '#000000'},
            {label: 'Habronemiasis', value: 'Habronemiasis', color: '#000000'},
            {label: 'Heat Stress', value: 'Heat Stress', color: '#000000'},
            {label: 'Lymphangitis (Epizootic)', value: 'Lymphangitis (Epizootic)', color: '#000000'},
            {label: 'Lymphangitis (Ulcerative)', value: 'Lymphangitis (Ulcerative)', color: '#000000'},
            {label: 'Mange Mite', value: 'Mange Mite', color: '#000000'},
            {label: 'Rabies', value: 'rabies', color: '#000000'},
            {label: 'Respiratory (Lower Bacterical)', value: 'Respiratory (Lower Bacterical)', color: '#000000'},
            {label: 'Respiratory (Upper Bacterical)', value: 'Respiratory (Upper Bacterical)', color: '#000000'},
            {label: 'Respiratory (Asthma / Lungworm)', value: 'Respiratory (Asthma / Lungworm)', color: '#000000'},
            {label: 'Respiratory (Viral)', value: 'Respiratory (Viral)', color: '#000000'},
            {label: 'Strangles', value: 'Strangles', color: '#000000'},
            {label: 'Tetanus', value: 'Tetanus', color: '#000000'},
            {label: 'Trypanosomosis', value: 'Trypanosomosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ],
        Donkey: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'Anthrax', value: 'Anthrax', color: '#000000'},
            {label: 'Ascaris (Foals only)', value: 'Ascaris (Foals only)', color: '#000000'},
            {label: 'Babesiosis', value: 'Babesiosis', color: '#000000'},
            {label: 'GI (Non-infectious / Colic)', value: 'GI (Non-infectious / Colic)', color: '#000000'},
            {label: 'GI (Parasitic)', value: 'GI (Parasitic)', color: '#000000'},
            {label: 'Habronemiasis', value: 'Habronemiasis', color: '#000000'},
            {label: 'Heat Stress', value: 'Heat Stress', color: '#000000'},
            {label: 'Mange Mite', value: 'Mange Mite', color: '#000000'},
            {label: 'Rabies', value: 'Rabies', color: '#000000'},
            {label: 'Respiratory (Lower Bacterical)', value: 'Respiratory (Lower Bacterical)', color: '#000000'},
            {label: 'Respiratory (Upper Bacterical)', value: 'Respiratory (Upper Bacterical)', color: '#000000'},
            {label: 'Respiratory (Asthma / Lungworm)', value: 'Respiratory (Asthma / Lungworm)', color: '#000000'},
            {label: 'Respiratory (Viral)', value: 'Respiratory (Viral)', color: '#000000'},
            {label: 'Strangles', value: 'Strangles', color: '#000000'},
            {label: 'Tetanus', value: 'Tetanus', color: '#000000'},
            {label: 'Trypanosomosis', value: 'Trypanosomosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ],
        Sheep: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'Coenurosis', value: 'Coenurosis', color: '#000000'},
            {label: 'Contagious Ecthyma (ORF)', value: 'Contagious Ecthyma (ORF)', color: '#000000'},
            {label: 'Cowdriosis', value: 'Cowdriosis', color: '#000000'},
            {label: 'Fasciolosis', value: 'Fasciolosis', color: '#000000'},
            {label: 'Haemonchosis', value: 'Haemonchosis', color: '#000000'},
            {label: 'Hypocalcemia / Pregnancy Tox', value: 'Hypocalcemia / Pregnancy Tox', color: '#000000'},
            {label: 'Lungworm', value: 'Lungworm', color: '#000000'},
            {label: 'Mange Mite', value: 'Mange Mite', color: '#000000'},
            {label: 'Nasal Bot', value: 'Nasal Bot', color: '#000000'},
            {label: 'Pasteurellosis', value: 'Pasteurellosis)', color: '#000000'},
            {label: 'Pox', value: 'Pox', color: '#000000'},
            {label: 'Peste des Petits Ruminants (PPR)', value: 'Peste des Petits Ruminants (PPR)', color: '#000000'},
            {label: 'Trichostrongiulosis', value: 'Trichostrongiulosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ],
        Camel: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'Anthrax', value: 'Anthrax', color: '#000000'},
            {label: 'Brucellosis', value: 'Brucellosis', color: '#000000'},
            {label: 'Camel Calf Diarrhoea', value: 'Camel Calf Diarrhoea', color: '#000000'},
            {label: 'Contagious Ecthyma (ORF)', value: 'Contagious Ecthyma (ORF)', color: '#000000'},
            {label: 'Hemorrhagic Septicemia', value: 'Hemorrhagic Septicemia', color: '#000000'},
            {label: 'Hypocalcemia / Pregnancy Tox', value: 'Hypocalcemia / Pregnancy Tox', color: '#000000'},
            {label: 'Mange Mite', value: 'Mange Mite', color: '#000000'},
            {label: 'Mastitis', value: 'Mastitis', color: '#000000'},
            {label: 'Pasteurellosis', value: 'Pasteurellosis', color: '#000000'},
            {label: 'Plant Poisoning', value: 'Plant Poisoning)', color: '#000000'},
            {label: 'Pox', value: 'Pox', color: '#000000'},
            {label: 'Pus / Abscess', value: 'Pus / Abscess', color: '#000000'},
            {label: 'Respiratory Infections', value: 'Respiratory Infections', color: '#000000'},
            {label: 'SDS / Unknown Camel Disease', value: 'SDS / Unknown Camel Disease', color: '#000000'},
            {label: 'Trypanosomosis', value: 'Trypanosomosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ],
        Goat: [
            {label: 'Unknown', value: 'Unknown', color: '#000000'},
            {label: 'Brucellosis', value: 'Brucellosis', color: '#000000'},
            {label: 'CBPP / CCPP', value: 'CBPP / CCPP', color: '#000000'},
            {label: 'Contagious Ecthyma (ORF)', value: 'Contagious Ecthyma (ORF)', color: '#000000'},
            {label: 'Cowdriosis', value: 'Cowdriosis', color: '#000000'},
            {label: 'Hypocalcemia / Pregnancy Tox', value: 'Hypocalcemia / Pregnancy Tox', color: '#000000'},
            {label: 'Lungworm', value: 'Lungwormx', color: '#000000'},
            {label: 'Mange Mite', value: 'Mange Mite', color: '#000000'},
            {label: 'Mastitis', value: 'Mastitis', color: '#000000'},
            {label: 'Pox', value: 'Pox', color: '#000000'},
            {label: 'Pus / Abscess', value: 'Pus / Abscess', color: '#000000'},
            {label: 'Peste des Petits Ruminants (PPR)', value: 'Peste des Petits Ruminants (PPR)', color: '#000000'},
            {label: 'Trichostrongiulosis', value: 'Trichostrongiulosis', color: '#000000'},
            {label: 'Other', value: 'Other', color: '#000000'},
        ]
    };

    state = {
        name: null,
        dateSelected: 'DD/MM/YY',
        location: null,
        species: null,
        age: 0,
        breed: 0,
        sex: 0,
        diagnosis: null,
        defaultAnimal: null,
        images: null,
        uris: [],
        isUploaded: false,
        date: Date.now(),
        mode: 'date',
        show: false,
        diseases: [],
        loading: false,
        loadingText: "",
        type: 0
    };

    onUploadPress() {
        this.setState({
            loading: true,
            loadingText: "Uploading..."
        });
        const body = new FormData();
        let sides = [];
        this.state.uris.forEach(img => {
            body.append("images[]", {
                uri: img.uri,
                name: img.name,
                type: "image/jpg"
            });
            sides.push(img.side);
        });
        let curCase = {
            name: this.state.name,
            dateSelected: this.state.dateSelected,
            location: this.state.location,
            species: this.state.species,
            age: this.state.age,
            breed: this.state.breed,
            sex: this.state.sex,
            diagnosis: this.state.diagnosis,
            type: this.state.type,
            sides: sides,
        };
        body.append("case", JSON.stringify(curCase));
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
                        loading: false,
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
                        loading: false,
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
                    loading: true,
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
            loading: true,
            loadingText: "Saving..."
        });
        let caseName = this.props.navigation.getParam('caseName') === null || this.props.navigation.getParam('caseName') === undefined
            ? null : this.props.navigation.getParam('caseName');

        AsyncStorage.getItem("numCases")
            .then(value => {
                if (caseName === null)
                    caseName = "case" + value;
                AsyncStorage.setItem(caseName, JSON.stringify({
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
                }))
                    .then(() => {
                        if (this.props.navigation.getParam('caseName') === null || this.props.navigation.getParam('caseName') === undefined) {
                            AsyncStorage.setItem('numCases', '' + (parseInt(value) + 1))
                                .then(() => {
                                    this.setState({
                                        loading: false,
                                    });
                                    this.props.navigation.navigate('homeView');
                                    new Alert.alert(
                                        'Saved',
                                        'Your case has been saved.'
                                    );
                                })
                                .catch(error => {
                                    this.setState({
                                        loading: false,
                                    });
                                    console.log('Error occurred when incrementing numCases: ' + error)
                                });
                        } else {
                            this.setState({
                                loading: false,
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
                            loading: false,
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
            this.state.uris.push({uri: img[0].uri, name: img[0].filename, side:img[1]});
        });
        if (this.props.navigation.getParam('case') !== null && this.props.navigation.getParam('case') !== undefined) {
            this.state = Object.assign({}, this.state, this.props.navigation.getParam('case'));
            if (this.state.species !== null) {
                this.state.diseases = this.diseases[this.state.species];
            }
        }
        AsyncStorage.getItem("numCases");
        // .then(value => console.log(value))
        // .catch()
    }

    showDatePicker() {
        this.setState({
            show: true
        });
    }

    setDate(event, date) {
        if (date !== undefined) {
            this.setState({
                dateSelected: date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear().toString().slice(2, 4),
                date: date,
                show: false
            });
        }
    }

    buildPreview = function (images) {
        let imgs = [];
        images.assets.forEach(function (img) {
            imgs.push(<Image style={styles.image} key={img[0].filename} source={img[0]}/>);
        });
        return imgs;
    };

    render() {
        const {show, date, mode} = this.state;
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <View style={styles.loadingScreen}>
                        <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>
                        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
                    </View>
                    : null}
                <View pointerEvents={this.state.loading ? 'none' : 'auto'}
                      style={[styles.caseContainer, this.state.loading ? {opacity: 0.4} : {}]}>
                    <Text style={styles.title}>Annotate the Image(s)</Text>
                    <Swiper activeDotColor={"#73c4c4"} loadMinimal={false} loadMinimalSize={0}
                            containerStyle={styles.swiperContainer}>
                        {this.buildPreview(this.state.images)}
                    </Swiper>
                    <View style={styles.topContainer}>
                        <ScrollView scrollIndicatorInsets={{right: -20}} style={styles.scrollContainer}>
                            <View style={styles.textEntryContainer}>
                                <Text style={styles.nameText}>Full Name:</Text>
                                <TextInput
                                    onChangeText={text => {
                                        this.setState({name: text})
                                    }}
                                    style={styles.nameBox}
                                    defaultValue={this.state.name}/>
                            </View>
                            <View style={styles.textEntryContainer}>
                                <Text style={styles.dateText}>Date of Observation:</Text>
                                <TouchableOpacity style={styles.datePicker} onPress={this.showDatePicker.bind(this)}>
                                    <Text style={styles.dateChosen}>{this.state.dateSelected}</Text>
                                    {show && <RNDateTimePicker value={date}
                                                               mode={mode}
                                                               is24Hour={true}
                                                               display="default"
                                                               onChange={this.setDate.bind(this)}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.optionTitle}>Location:</Text>
                            <RNPickerSelect
                                onValueChange={value => {
                                    this.setState({location: value})
                                }}
                                value={this.state.location}
                                items={[
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
                            <Text style={styles.optionTitle}>Species:</Text>
                            <RNPickerSelect
                                onValueChange={value => {
                                    this.setState({
                                        species: value,
                                        diagnosis: null,
                                        diseases: this.diseases[value]
                                    })
                                }}
                                value={this.state.species}
                                items={[
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
                                value={this.state.diagnosis}
                                items={this.state.diseases}
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
                        <TouchableOpacity onPress={this.onUploadPress.bind(this)}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>Upload Case</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSavePress.bind(this)}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>Save</Text>
                            </View>
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
    caseContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 0,
        color: "#808080"
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
            : 'Avenir Light',
        fontSize: 20,
    },
    title: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
        fontSize: 30,
        marginTop: Dimensions.get('window').width / 40,
    },
    swiperContainer: {
        width: Dimensions.get('window').width * 3 / 5,
        height: Dimensions.get('window').width * 4 / 5,
        margin: Dimensions.get('window').width / 20,
        marginBottom: Dimensions.get('window').width / 40,
        borderRadius: 5,
        borderColor: '#808080',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    swiper: {
        width: Dimensions.get('window').width * 3 / 5,
        height: Dimensions.get('window').width * 4 / 5,
        overflow: 'hidden',
    },
    image: {
        width: Dimensions.get('window').width * 3 / 5,
        height: Dimensions.get('window').width * 4 / 5,
    },
    topContainer: {
        width: Dimensions.get('window').width * 4.5 / 5,
        flex: 1,
        margin: Dimensions.get('window').width / 20,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: 0,
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
            : 'Avenir Light',
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
        //color: '#808080',
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center'
    },
    dateText: {
        flex: 1.75,
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
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
        //color: '#808080',
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
        fontSize: 20,
    },
    optionTitle: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
        fontSize: 20,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
    },
    options: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-thin"
            : 'Avenir Light',
        fontSize: 20,
    },
    optionsContainer: {
        margin: Dimensions.get('window').width / 40,
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height / 10,
        overflow: 'hidden'
    },
    button: {
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 1,
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 27,
        marginLeft: Dimensions.get('window').width / 15,
        marginRight: Dimensions.get('window').width / 15,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir Light',
        fontSize: 20,
    }
});

export default CategoriseView;

import React, {Component} from 'react';
import {
    Platform,
    Dimensions, Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert, AsyncStorage
} from 'react-native';
import * as MediaLibrary from "expo-media-library";
import List from "react-list-select";

class GalleryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wifi: false,
            cell: false,
            defaultAnimal: null,
            cases: null,
            //allCases: this.props.navigation.getParam('allCases'),
        };
    }

    componentDidMount() {
        if (this.props.navigation.getParam('home'))
            this.loadAllCases();
        else
            this.loadCase();
    }

    openCase(c) {
        console.log(c);
        //this.loadCaseImages(c);
        this.loadAlbum(c);
        //this.props.navigation.navigate('categoriseView')
    }

    onSavePress() {
        this.props.navigation.navigate('homeView')
    }

    buildGallery = function (cases) {
        if (cases === null) return;
        if (this.props.navigation.getParam('home')) {
            let list = [];
            let rowElems = [];
            let rowCount = 0;
            Object.keys(cases).forEach(key => {
                if (key !== "numCases") {
                    rowElems.push(<Text key={key}
                                        style={styles.caseText}>{cases[key].dateSelected + " - " + cases[key].species + " - " + cases[key].diagnosis}</Text>);
                    list.push(
                        <TouchableOpacity key={key + "Touchable"} onPress={this.openCase.bind(this, key)}>
                            <View key={rowCount} style={styles.row}>
                                {rowElems}
                            </View>
                        </TouchableOpacity>
                    );
                    rowCount++;
                    rowElems = [];
                }
            });
            return list;
        } else {
            let rowCount = 0;
            let count = 0;
            let list = [];
            let rowElems = [];
            cases.assets.forEach(function (c) {
                count++;
                rowElems.push(<Image key={c.uri} style={styles.thumbnail} source={c}/>);
                if (count === 3) {
                    list.push(<View key={rowCount} style={styles.row}>{rowElems}</View>);
                    rowElems = [];
                    count = 0;
                    rowCount++;
                }
            });
            while (rowElems.length < 3) {
                rowElems.push(<View key={"fill" + rowElems.length} style={styles.thumbnail}/>)
            }
            list.push(<View key={rowCount} style={styles.row}>{rowElems}</View>);
            rowElems = [];
            return list;
        }
    };

    loadCase() {
        this.setState({
            cases: this.props.navigation.getParam('case'),
        });
    }

    loadAllCases() {
        let cases = {};
        AsyncStorage.getAllKeys()
            .then(keys => {
                AsyncStorage.multiGet(keys)
                    .then(results => {
                        results.forEach(item => {
                            //console.log("\n");

                            cases[item[0]] = JSON.parse(item[1]);

                            // console.log("item is : " + item);
                            // console.log("item[0] is : " + item[0]);
                            // console.log("item[1] is : "+ item[1]);
                            // console.log("JSON.parse(item[1]) is  : " + JSON.parse(item[1]));
                            // console.log("\n");
                        });
                        // console.log(cases);
                        // console.log("\n");

                        this.setState({
                            cases: cases
                        });
                        //console.log(this.state.cases);
                    });
            });
    }

    loadAlbum(c) {
        MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
            .then(album => {
                album !== null ? this.loadImages(album, c) : new Alert.alert('Empty', 'No cases have been made yet');
            })
            .catch(error => {
                console.log('No folder for Animal Disease Diagnosis.', error);
                return null;
            })
    }

    loadImages(album, c) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
            .then(assets => {
                while (assets.hasNextPage) {
                    console.log("Loading images...");
                    // TODO stop user interaction while it loads?
                }
                console.log('Estimated number of loaded images: ' + assets.totalCount);
                console.log('Actual number of loaded images: ' + assets.assets.length);
                let images = {assets: []};
                assets.assets.forEach(a =>{
                    //console.log("This case " + c + " is :\n" + JSON.stringify(this.state.cases[c]));
                    //console.log("\n this asset uri is : " + a.uri);
                    this.state.cases[c].urls.forEach(u => {
                        // console.log("\n");
                        // console.log(u.name);
                        // console.log(a.filename);
                        if (u.name === a.filename){
                            // console.log("We got here: \n" + a + "\n" + a.uri);
                            images.assets.push(a);
                        }
                    })
                });
                this.setState({
                    images: images,
                });
                //console.log(this.state.images);
                this.prepareToCategorise(c);
            })
            .catch(error => {
                console.log('Could not get assets from folder.', error);
                return null;
            });
    }

    prepareToCategorise(c){
        this.props.navigation.navigate('categoriseView',{
            images : this.state.images,
            case: this.state.cases[c],
            caseName: c
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.navigation.getParam('home') ? "Cases" : "Current Case"}</Text>
                <ScrollView style={styles.topContainer}>
                    {this.buildGallery(this.state.cases)}
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
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 30,
        margin: 15,
    },
    topContainer: {
        width: Dimensions.get('window').width * 4 / 5,
        borderRadius: 5,
        borderColor: '#808080',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
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
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    thumbnail: {
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 5,
        marginTop: Dimensions.get('window').height / 45,
        marginBottom: Dimensions.get('window').height / 45,
        borderRadius: 5,
    },
    caseText: {
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 20,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
        textAlign: "center"
    }
});

export default GalleryView;
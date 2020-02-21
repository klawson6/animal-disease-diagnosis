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
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";

class GalleryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            cases: null,
            loading: false,
            loadingText: ""
        };
    }


    componentDidMount() {
        if (this.props.navigation.getParam('home')) {
            this.setState({
                settings: this.props.navigation.getParam('settings')
            });
            this.loadAllCases();
        } else
            this.loadCase();
    }

    openCase(c) {
        console.log(c);
        this.loadAlbum(c);
    }

    checkInternetAccess() {
        console.log(this.state);
        return NetInfo.fetch()
            .then(state => {
                if (state.isInternetReachable) {
                    if (this.state.settings.wifi && state.type === NetInfoStateType.wifi || this.state.settings.cell && state.type === NetInfoStateType.cellular) {
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

    uploadAll() {
        this.setState({
            loading: true,
            loadingText: "Uploading cases..."
        });
        this.checkInternetAccess()
            .then(access => {
                if (!access) {
                    this.setState({
                        loading: false,
                    });
                    return;
                }
                let cases = this.state.cases;
                let fetches = [];
                for (let key in cases) {
                    if (cases.hasOwnProperty(key) && key !== "numCases" && key !== "settings" && !cases[key].isUploaded && cases[key].completed) {
                        fetches.push(this.uploadCase(cases[key], key));
                    }
                }
                Promise.all(fetches)
                    .then(responses => {
                        if (responses.length === 0) {
                            this.setState({
                                loading: false
                            });
                            new Alert.alert('Nothing to Upload', 'There are no cases to be uploaded.');
                            return;
                        }
                        let errors = false;
                        responses.forEach(key => {
                            if (key)
                                cases[key].isUploaded = true;
                            else
                                errors = true;
                        });
                        this.setState({
                            cases: cases,
                            loading: false
                        });
                        errors ?
                            new Alert.alert(
                                'Unsuccessful Upload',
                                'There have been 1 or more unsuccessful uploads. Upload status of successfully uploaded cases have been updated.'
                            ) :
                            new Alert.alert(
                                'Uploaded',
                                'Your cases have all been successfully uploaded.'
                            )
                    });
            })
            .catch(error => {
                console.log("Error fetching network state [FROM CALL TO checkInternetAccess()]: " + error);
                this.setState({
                    loading: false,
                });
            });
    }

    async uploadCase(c, key) {
        return new Promise(resolve => {
            const body = new FormData();
            let sides = [];
            c.uris.forEach(img => {
                body.append("images[]", {
                    uri: img.uri,
                    name: img.name,
                    type: "image/jpg"
                });
                sides.push(img.side);
            });
            c.sides = sides;
            body.append("case", JSON.stringify(c));
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
                        // response.text()
                        //     .then(text => {
                        //         console.log(text);
                        //     });
                        c.isUploaded = true;
                        AsyncStorage.setItem(key, JSON.stringify(c))
                            .then(() => {
                                resolve(key);
                            })
                            .catch(error => {
                                console.log('Error occurred when saving a case: ' + error);
                                resolve(false);
                            })
                    } else {
                        console.log("Request to server unsuccessful.");
                        console.log(response.status);
                        // response.text()
                        //     .then(text => {
                        //         console.log(text);
                        //     });
                        resolve(false);
                    }
                })
                .catch(error => {
                    console.log("Error making request : " + error);
                    resolve(false);
                });
        });

    }

    buildGallery = function (cases) {
        if (cases === null) return;
        if (this.props.navigation.getParam('home')) {
            let list = [];
            let rowElems = [];
            let rowCount = 0;
            Object.keys(cases).forEach(key => {
                if (key !== "numCases" && key !== "settings") {
                    rowElems.push(<Text key={key}
                                        style={styles.caseText}>{cases[key].dateSelected + " - " + cases[key].species + " - " + (cases[key].type ? "Healthy" : cases[key].diagnosis)}</Text>);
                    list.push(
                        <TouchableOpacity style={styles.rowTouchable} key={key + "Touchable"}
                                          onPress={this.openCase.bind(this, key)}>
                            <View key={rowCount} style={styles.caseTextWrapper}>
                                {rowElems}
                            </View>
                            <Image style={[styles.uploadIcon]}
                                   source={cases[key].completed ? require('../assets/img/filled-in.png') : require('../assets/img/not-filled-in.png')}/>
                            <Image style={[styles.uploadIcon]}
                                   source={cases[key].isUploaded ? require('../assets/img/cloudTick2.png') : require('../assets/img/cloudUp2.png')}/>
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
                rowElems.push(<Image key={c[0].uri} style={styles.thumbnail} source={c[0]}/>);
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
        this.setState({
            loading: true,
            loadingText: "Loading cases...",
        });
        let cases = {};
        AsyncStorage.getAllKeys()
            .then(keys => {
                AsyncStorage.multiGet(keys)
                    .then(results => {
                        results.forEach(item => {
                            cases[item[0]] = JSON.parse(item[1]);
                        });
                        this.setState({
                            cases: cases,
                            loading: false,
                        });
                        console.log(cases);
                    });
            });
    }

    loadAlbum(c) {
        this.setState({
            loading: true,
            loadingText: "Loading case..."
        });
        MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
            .then(album => {
                if (album !== null)
                    this.loadImages(album, c);
                else {
                    new Alert.alert('Empty', 'No cases have been made yet');
                    this.setState({loading: false});
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                console.log('No folder for Animal Disease Diagnosis.', error);
            })
    }

    loadImages(album, c) {
        MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"], first: 2147483647})
            .then(assets => {
                let images = {assets: []};
                assets.assets.forEach(a => {
                    this.state.cases[c].uris.forEach(u => {
                        if (u.name === a.filename) {
                            images.assets.push([a, u.side]);
                        }
                    })
                });
                this.setState({
                    images: images,
                    loading: false,
                });
                this.prepareToCategorise(c);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                console.log('Could not get assets from folder.', error);
            });
    }


    prepareToCategorise(c) {
        this.props.navigation.navigate('categoriseView', {
            images: this.state.images,
            case: this.state.cases[c],
            caseName: c,
            settings: {wifi: this.state.settings.wifi, cell: this.state.settings.cell}
        })
    }

    getUploadButton() {
        if (this.props.navigation.getParam("home")) {
            let button = [];
            button.push(
                <TouchableOpacity key="uploadall" onPress={this.uploadAll.bind(this)}>
                    <View key="uploadallview" style={[styles.button]}>
                        <Text key="uploadalltext" style={styles.buttonText}>Upload All</Text>
                    </View>
                </TouchableOpacity>);
            return button;
        } else {
            return [];
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    <View style={styles.loadContainer}>
                        <View style={styles.loadingScreen}>
                            <Image style={styles.loadingImg} source={require('../assets/img/loading.gif')}/>
                            <Text style={styles.loadingText}>{this.state.loadingText}</Text>
                        </View>
                        <View style={styles.darken}>
                        </View>
                    </View>
                    : null}
                <View pointerEvents={this.state.loading ? 'none' : 'auto'}
                      style={[styles.gContainer, this.state.loading ? {opacity: 0.4} : {}]}>
                    <Text
                        style={styles.title}>{this.props.navigation.getParam('home') ? "Cases" : "Current Case"}</Text>
                    <ScrollView style={styles.topContainer}>
                        {this.buildGallery(this.state.cases)}
                    </ScrollView>
                    <View style={styles.saveContainer}>
                        {this.getUploadButton()}
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
    gContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 0
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
    title: {
        color: '#73c4c4',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 30,
        margin: 15,
    },
    topContainer: {
        width: Dimensions.get('window').width * 9 / 10,
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
    rowTouchable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    caseTextWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    uploadIcon: {
        width: Dimensions.get('window').width / 12,
        height: Dimensions.get('window').width / 12,
        margin: Dimensions.get('window').width / 45,
    },
    thumbnail: {
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 5,
        marginTop: Dimensions.get('window').height / 45,
        marginBottom: Dimensions.get('window').height / 45,
        borderRadius: 5,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    caseText: {
        color: '#000000',
        fontFamily: Platform.OS === 'android'
            ? "sans-serif-light"
            : 'Avenir-Light',
        fontSize: 19,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
        marginLeft: Dimensions.get('window').width / 50,
        textAlign: "left",
    }
});

export default GalleryView;

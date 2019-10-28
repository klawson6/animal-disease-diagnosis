import React, {Component} from 'react';
import {
    Dimensions, Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ListView,
    TextInput,
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import thumbnail from "../assets/img/settings.png";

class GalleryView extends Component {

    state = {
        wifi: false,
        cell: false,
        defaultAnimal: null,
    };

    onSavePress() {
        this.props.navigation.navigate('homeView')
    }

    cases = [{key: "1", thumbnail : require("../assets/img/settings.png")}, {key: "2", thumbnail : require("../assets/img/settings.png")}, {key: "3", thumbnail : require("../assets/img/settings.png")}, {key: "4", thumbnail : require("../assets/img/settings.png")}, {key: "5", thumbnail : require("../assets/img/settings.png")}, {key: "6", thumbnail : require("../assets/img/settings.png")}, {key: "7", thumbnail : require("../assets/img/settings.png")}, {key: "8", thumbnail : require("../assets/img/settings.png")}, {key: "9", thumbnail : require("../assets/img/settings.png")}, {key: "10", thumbnail : require("../assets/img/settings.png")}, {key: "11", thumbnail : require("../assets/img/settings.png")}, {key: "12", thumbnail : require("../assets/img/settings.png")}, {key: "13", thumbnail : require("../assets/img/settings.png")}, {key: "14", thumbnail : require("../assets/img/settings.png")}, {key: "15", thumbnail : require("../assets/img/settings.png")}, {key: "16", thumbnail : require("../assets/img/settings.png")}, {key: "17", thumbnail : require("../assets/img/settings.png")}, {key: "18", thumbnail : require("../assets/img/settings.png")}, {key: "19", thumbnail : require("../assets/img/settings.png")}, {key: "20", thumbnail : require("../assets/img/settings.png")}, {key: "21", thumbnail : require("../assets/img/settings.png")}, {key: "22", thumbnail : require("../assets/img/settings.png")}, {key: "23", thumbnail : require("../assets/img/settings.png")}, {key: "24", thumbnail : require("../assets/img/settings.png")}, {key: "25", thumbnail : require("../assets/img/settings.png")}, {key: "26", thumbnail : require("../assets/img/settings.png")}, {key: "27", thumbnail : require("../assets/img/settings.png")}, {key: "28", thumbnail : require("../assets/img/settings.png")}, {key: "29", thumbnail : require("../assets/img/settings.png")}, {key: "30", thumbnail : require("../assets/img/settings.png")}, {key: "31", thumbnail : require("../assets/img/settings.png")}, {key: "32", thumbnail : require("../assets/img/settings.png")}, {key: "33", thumbnail : require("../assets/img/settings.png")}, {key: "34", thumbnail : require("../assets/img/settings.png")}, {key: "35", thumbnail : require("../assets/img/settings.png")}, ];

    buildGallery = function (cases) {
        let rowCount = 0;
        let count = 0;
        let list = [];
        let rowElems = [];
        //let row = <View style={styles.row}>{rowElems}</View>;
        cases.forEach(function (c) {
            count++;
            rowElems.push(<Image key={c.key} style={styles.thumbnail} source={c.thumbnail}/>);
            if (count === 3) {
                list.push(<View key={rowCount} style={styles.row}>{rowElems}</View>);
                rowElems = [];
                count = 0;
                rowCount++;
            }
        });
        while (rowElems.length < 3){
            rowElems.push(<View key={"fill" + rowElems.length} style={styles.thumbnail}/>)
        }
        list.push(<View key={rowCount} style={styles.row}>{rowElems}</View>);
        rowElems = [];
        return list;
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pending Cases</Text>
                <ScrollView style={styles.topContainer}>
                    {this.buildGallery(this.cases)}
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
//        flex: 1,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 30,
        margin: 15,
    },
    topContainer: {
        width: Dimensions.get('window').width * 4 / 5,

        //height: Dimensions.get('window').width * 4 / 3,
        //flex: 1,
        //flexDirection: 'row',
        //lexWrap: 'wrap',
        // contentContainerStyle:{
        //alignItems: 'flex-start'
        //   }
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    thumbnailContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#000000'
    },
    thumbnail: {
        //flex: 1
        width: Dimensions.get('window').width * 4 / 20,
        height: Dimensions.get('window').width * 4 / 20,
        //backgroundColor: '#000000',
    },
    uploadTitle: {
        //flex: 1,
        color: '#73c4c4',
        fontFamily: "sans-serif-light",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height / 10,
        //backgroundColor:"#3cfdff",
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
    },
    navContainer: {
        // flexDirection: "row",
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        //backgroundColor: '#ecff1f',
        // justifyContent: "space-between",
    },
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    image: {
        // borderRadius: 5,
        // backgroundColor: '#1A936F',
        // borderColor: 'black',
        // borderWidth: 1,
        width: 65,
        height: 65,
        // width: Dimensions.get('window').width/6,
        // height: Dimensions.get('window').width * 4 / 24,
    },
    settingsImg: {
        width: 65,
        height: 65,
    },
    galleryImg: {
        width: 65,
        height: 65,
    },
    settingsTouchable: {
        transform: [{
            translateX: 65,
        }],
    },
    galleryTouchable: {
        transform: [{
            translateX: -65,
        }],
    }
});

export default GalleryView;
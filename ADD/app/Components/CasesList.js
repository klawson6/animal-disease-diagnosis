import React, {Component} from "react";
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";

export default class CasesList extends Component {

    buildGallery(cases, callback) {
        if (cases === null) return;
        let list = [];
        let row = [];
        let rowCount = 0;
        Object.keys(cases).forEach(key => {
            row.push(<Text key={key} style={styles.caseText}>
                {(cases[key].dateSelected ? cases[key].dateSelected : "No Date")
                + " - " + (cases[key].species ? cases[key].species : "No Species")
                + " - " + (cases[key].type ? "Healthy" : cases[key].diagnosis ? cases[key].diagnosis : "No Diagnosis")}</Text>);
            list.push(
                <TouchableOpacity style={styles.rowTouchable} key={key + "Touchable"}
                                  onPress={() => {
                                      callback(cases[key]);
                                  }}>
                    <View key={rowCount} style={styles.caseTextWrapper}>
                        {row}
                    </View>
                    <Image style={[styles.uploadIcon]}
                           source={cases[key].completed ? require('../assets/img/filled-in.png') : require('../assets/img/not-filled-in.png')}/>
                    <Image style={[styles.uploadIcon]}
                           source={cases[key].isUploaded ? require('../assets/img/cloudTick2.png') : require('../assets/img/cloudUp2.png')}/>
                </TouchableOpacity>
            );
            rowCount++;
            row = [];
        });
        return list;
    }

    render() {
        return (
            <ScrollView style={styles.caseContainer}>
                {this.buildGallery(this.props.items, this.props.onPress)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    caseContainer: {
        fontSize: 18,
        height: "85%",
        flexDirection: "column",
        width: Dimensions.get("window").width * 9 / 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#646464',
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
    caseText: {
        color: '#646464',
        fontSize: 18,
        marginTop: Dimensions.get('window').width / 40,
        marginBottom: Dimensions.get('window').width / 40,
        marginLeft: Dimensions.get('window').width / 50,
        textAlign: "left",
    }
});

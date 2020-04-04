import {Image, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {TextInput} from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, {Component} from "react";

export default class MaterialDatePicker extends Component {

    render() {
        return (
            <View style={styles.textEntryContainer}>
                <Image source={require('../assets/img/calendar-grey.png')}
                       style={styles.optionImg}/>
                <View style={styles.textInput}>
                    <TouchableOpacity style={styles.textInput} onPress={() => this.props.showPicker()}>
                        <TextInput
                            label={this.props.dateSelected === null ? "Date (DD/MM/YY)" : "Date of Observation"}
                            value={this.props.dateSelected}
                            placeholder
                            editable={false}
                            underlineColor={this.props.show ? "#1565c0" : null}
                            style={styles.textInput}/>
                    </TouchableOpacity>
                    {this.props.show && <RNDateTimePicker value={this.props.date}
                                                          mode={'date'}
                                                          is24Hour={true}
                                                          display="default"
                                                          onChange={(event, date) => {
                                                             this.props.onChange(event, date);
                                                          }}/>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textEntryContainer: {
        height: Dimensions.get('window').height / 14,
        margin: Dimensions.get('window').width / 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        height: Dimensions.get('window').height / 15,
        flex: 1,
    },
    optionImg: {
        height: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').height / 30,
        marginRight: Dimensions.get('window').height / 60,
    },
});

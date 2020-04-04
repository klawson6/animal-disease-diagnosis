import React, {Component} from "react";
import {Dimensions, Image, TouchableOpacity, View, StyleSheet} from "react-native";
import {Menu, TextInput} from "react-native-paper";

export default class MaterialMultiChoice extends Component {

    buildItems(callback, items) {
        if(!items) return null;
        let list = [];
        items.forEach(i => {
            list.push(<Menu.Item
                onPress={() => {
                    callback(i)
                }}
                title={i}
                key={i}
            />)
        });
        return list;
    }

    render() {
        return (
            <View style={styles.textEntryContainer}>
                <Image source={this.props.icon} style={styles.optionImg}/>
                <View style={styles.textInput}>
                    <TouchableOpacity style={styles.textInput}
                                      onPress={() => this.props.onChoice(null)}>
                        <TextInput
                            label={this.props.label}
                            value={this.props.itemShown}
                            editable={false}
                            underlineColor={this.props.expanded ? "#1565c0" : null}
                            style={styles.textInput}/>
                        <Image source={require('../assets/img/down-arrow.png')}
                               style={styles.dropdownImg}/>
                    </TouchableOpacity>
                    <Menu
                        visible={this.props.expanded}
                        onDismiss={() => this.props.onChoice(null)}
                        statusBarHeight={0}
                        selectionColor={"#1565c0"}
                        anchor={{
                            x: Dimensions.get("window").width * 14 / 15,
                            y: Dimensions.get("window").height * 11.4 / 15
                        }}>
                        {this.buildItems(this.props.onChoice, this.props.items)}
                        {/*// TODO Have SNNPR be fully typed, but not cause scroll bug*/}
                    </Menu>
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
    dropdownImg: {
        height: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').height / 30,
        zIndex: 1,
        position: "absolute",
        alignSelf: "flex-end",
        transform: [{translateY: Dimensions.get('window').height / 45}, {translateX: -Dimensions.get('window').height / 60}],
    },
});

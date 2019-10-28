import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class CategoriseView extends Component {

    onPressButton() {
        this.props.navigation.navigate('homeView')
    }

    render() {
        return (
            <View style={styles.container}>
                {/*Binding this, means the scope of onPressButton is kept to the component, so this refers to this and not the function*/}
                <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Categorising happens here</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        borderRadius: 30,
        width: 260,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#82e9f3',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    camera: {
        height: 440,
        width: 330,
    },
    capture: {
        borderRadius: 20,
        width: 100,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#82e9f3',
        justifyContent: 'space-evenly',
    }
});

export default CategoriseView;
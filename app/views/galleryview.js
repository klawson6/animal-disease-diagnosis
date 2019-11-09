import React, {Component} from 'react';
import {
    Dimensions, Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

class GalleryView extends Component {

    state = {
        wifi: false,
        cell: false,
        defaultAnimal: null,
        cases: {assets: null},
    };

    componentDidMount() {
        this.loadImages();
        this.render();
    }

    loadImages(){
        let prevState = this.props.navigation.getParam('cases');
        console.log('HomeView state passed to GalleryView.');
        if (prevState !== null){
            console.log('Images found in HomeView state.');
            this.setState({
                cases: prevState,
            })
        }
    }

    onSavePress() {
        this.props.navigation.navigate('homeView')
    }


    buildGallery = function (cases) {
        if (cases === null) return;
        let rowCount = 0;
        let count = 0;
        let list = [];
        let rowElems = [];
        cases.forEach(function (c) {
            count++;
            rowElems.push(<Image key={c.uri} style={styles.thumbnail} source={c}/>);
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
                    {this.buildGallery(this.state.cases.assets)}
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
        fontFamily: "sans-serif-light",
        fontSize: 30,
        margin: 15,
    },
    topContainer: {
        width: Dimensions.get('window').width * 4 / 5,
    },
    saveContainer: {
        flexDirection: 'row',
        alignItems: "center",
        height: Dimensions.get('window').height / 10,
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
    row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    thumbnail: {
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 5,
        marginBottom: Dimensions.get('window').height / 45,
    }
});

export default GalleryView;
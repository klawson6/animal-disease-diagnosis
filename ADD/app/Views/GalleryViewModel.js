import React, {Component} from 'react';
import {
    Dimensions, Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

class GalleryViewModel extends Component {

    model;

    constructor(props) {
        super(props);
        this.state = {
            cases: null,
        };
        this.model = this.props.navigation.getParam("model");
    }

    componentDidMount() {
        this.loadCase();
    }

    buildGallery = function (cases) {
        if (cases === null) return;
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
    };

    loadCase() {
        this.setState({
            cases: this.model.getCurrentCase(),
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>Current Case</Text>
                <View style={styles.caseContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        {this.buildGallery(this.state.cases)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        color: '#646464',
        fontSize: 25,
        flex: 1,
        flexDirection: "column",},
    caseContainer: {
        fontSize: 18,
        //height: "85%",
        flex: 12,
        flexDirection: "column",
        width: Dimensions.get("window").width * 9 / 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#646464',
        marginBottom: Dimensions.get("window").height/ 20,
    },
    scrollContainer:{
        width: "100%",
        height: "100%"
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
});

export default GalleryViewModel;

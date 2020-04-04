import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import {
    Button, DefaultTheme, Provider as PaperProvider,
} from "react-native-paper";
import FeedbackFormSmall from "../Components/FeedbackFormSmall";
import CasesList from "../Components/CasesList";

class CasesViewModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cases: null,
            loading: true,
            buttonText: "Loading Cases...",
        };
        this.model = this.props.navigation.getParam("model");
    }

    componentDidMount() {
        this.model.getCases()
            .then(cases => {
                this.setState({
                    cases: cases,
                    loading: false,
                    buttonText: "Upload All"
                })
            });
    }

    openCase(c) {
        console.log(c);
        console.log(this.model);
        this.model.setCurrentCase(c);
        this.props.navigation.navigate('categoriseView', {
            model: this.props.navigation.getParam("model")
        });
    }

    onUploadPress() {
        this.setState({
            loading: true,
            buttonText: "Uploading...",
            feedbackPending: true
        });
    }

    _handleFeedback = (val) => {
        this.setState({feedbackPending: false});
        this.model.uploadAll(val)
            .then(results => {
                if (results.includes(1) || results.includes(2) || results.includes(4)) {
                    new Alert.alert("Error", "An error occurred when uploading all cases. [Error codes: " + results + "]")
                } else if (results[0] === 5) {
                    new Alert.alert("Nothing to Upload", "There are no complete cases to be uploaded. Please check that the cases have been fully annotated.")
                } else if (!results.includes(0)) {
                    new Alert.alert("Uploaded", "All of the completed cases were successfully uploaded.")
                }
                this.model.getCases()
                    .then(cases => {
                        this.setState({
                            cases: cases,
                            loading: false,
                            buttonText: "Upload All",
                        })
                    });
            });
    };

    render() {
        const theme = {
            ...DefaultTheme,
            roundness: 5,
            colors: {
                ...DefaultTheme.colors,
                primary: '#1565c0',
                accent: '#5e92f3',
            },
        };

        return (
            <PaperProvider theme={theme}>
                {this.state.feedbackPending ?
                    <FeedbackFormSmall
                        message={"How was your experience capturing and uploading these cases?"}
                        onPress={this._handleFeedback}/>
                    : null}
                <View pointerEvents={this.state.loading ? 'none' : 'auto'} style={styles.container}>
                    <Text
                        style={styles.title}>Cases</Text>
                    <CasesList items={this.state.cases} onPress={this.openCase.bind(this)}/>
                    <View style={styles.saveContainer}>
                        <Button style={styles.button} mode="contained" loading={this.state.loading}
                                onPress={() => this.onUploadPress()} key={"UploadAll"}>
                            {this.state.buttonText}
                        </Button>
                    </View>
                </View>
            </PaperProvider>
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
        height: "5%",
        flexDirection: "column",
    },
    saveContainer: {
        fontSize: 18,
        height: "10%",
        flexDirection: "column",
        justifyContent: "center"
    },
    button: {
        width: Dimensions.get("window").width / 2.5,
        marginRight: Dimensions.get("window").width / 25,
        marginLeft: Dimensions.get("window").width / 25
    },
});

export default CasesViewModel;

import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import {
    Divider
} from "react-native-paper";
import { Linking } from 'expo';

class HelpViewModel extends Component {


    _handleEmail = () => {
        Linking.openURL("mailto:kyle.lawson.2016@uni.strath.ac.uk");
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>What is this application?</Text>
                    <Image style={styles.thumbnail} source={require("../assets/img/kyle-app.png")}/>
                    <Text style={styles.link} onPress={this._handleEmail}>
                        kyle.lawson.2016@uni.strath.ac.uk
                    </Text>
                    <Text style={styles.sentence}>
                        This application has been designed by myself, Kyle Lawson.
                    </Text>
                    <Text style={styles.sentence}>
                        I am a 4th year Computer Science
                        student at the University of Strathclyde, Glasgow, United Kingdom and have been building this
                        application as part of my final year project.
                    </Text>
                    <Text style={styles.sentence}>
                        I am aiming to help build an image analysis tool that
                        can identify diseases that affect livestock in Ethiopia.
                    </Text>
                    <Text style={styles.sentence}>
                        This application will be used to collect reference
                        images of healthy animals, and common diseases to train an image analysis tool.
                    </Text>
                    <Divider style={{
                        height: 1,
                        marginTop: Dimensions.get('window').width / 20,
                        marginBottom: Dimensions.get('window').width / 20
                    }}/>
                    <Text style={styles.title}>Who is this application for?</Text>
                    <Text style={styles.sentence}>
                        As part of my project, I am asking students, veterinarians, farmers, and others, who work with livestock
                        regularly, to test this application and provide feedback regarding:
                    </Text>
                    <Text style={styles.sentence}>
                        • How easy it is to use
                    </Text>
                    <Text style={styles.sentence}>
                        • What features could be added
                    </Text>
                    <Text style={styles.sentence}>
                        • What bugs/issues were seen
                    </Text>
                    <Text style={styles.sentence}>
                        • General impressions
                    </Text>
                    <Text style={styles.sentence}>
                        Please feel free to share this application with peers who would be interested in testing it. All
                        help and feedback is appreciated.
                    </Text>
                    <Divider style={{
                        height: 1,
                        marginTop: Dimensions.get('window').width / 20,
                        marginBottom: Dimensions.get('window').width / 20
                    }}/>
                    <Text style={styles.title}>How to Use:</Text>
                    <Text style={styles.sentence}>
                        This application should be used to used to create 'Cases', which consist of images of either a
                        Healthy animal, or a Disease.{'\n'}Each case should be annotated with relevant information
                        including species, gender, breed and so on.{'\n'}These cases are then uploaded to a database for
                        storage.{'\n'}Uploading will require internet access and as such should be done using a reliable
                        connection. (e.g. Wi-Fi Café)
                    </Text>
                    <Text style={styles.subheading}>
                        Healthy Case
                    </Text>
                    <Text style={styles.paragraph}>
                        Healthy cases are started by clicking the top-left button on the home page.{'\n'}This will
                        navigate you to a camera page.{'\n'}Healthy cases require 4 and only 4, images, each from
                        different angles:
                    </Text>
                    <Text style={styles.sentence}>
                        • Front (head/face)
                    </Text>
                    <Text style={styles.sentence}>
                        • Right-hand side
                    </Text>
                    <Text style={styles.sentence}>
                        • Left-hand side
                    </Text>
                    <Text style={styles.sentence}>
                        • Rear
                    </Text>
                    <Text style={styles.sentence}>
                        The type of image required is prompted by a stencil overlaying the viewfinder.{'\n'}Once all
                        required images have been captured, you will be automatically taken to the annotation
                        form.{'\n'}From here, the case can be annotated using the given form, saved and completed later
                        or uploaded immediately.
                    </Text>
                    <Text style={styles.subheading}>
                        Disease Case
                    </Text>
                    <Text style={styles.paragraph}>
                        Disease cases are started by clicking the top-right button on the home page.{'\n'}This will
                        navigate you to a camera page.{'\n'}Disease cases require only 1 photo, but you are advised to
                        take as many as you see fit, of every sign the animal shows, such as, but not limited to:
                    </Text>
                    <Text style={styles.sentence}>
                        • Emaciation
                    </Text>
                    <Text style={styles.sentence}>
                        • Enlarged lymph nodes
                    </Text>
                    <Text style={styles.sentence}>
                        • Wounds
                    </Text>
                    <Text style={styles.sentence}>
                        • Discharge
                    </Text>
                    <Text style={styles.sentence}>
                        Once you have finished taking pictures, you can navigate to the form by pressing the arrow
                        button.
                    </Text>
                    <Text style={styles.subheading}>
                        Case Gallery
                    </Text>
                    <Text style={styles.paragraph}>
                        Your collection of cases that have been recorded can be viewed by clicking the 'Saved cases'
                        button on the middle left of the home page.{'\n'}This page allows you to view you past cases by
                        selecting them from the list.{'\n'}Icons next to the cases provide helpful information on the
                        status of the cases:
                    </Text>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require("../assets/img/not-filled-in.png")}/>
                        <Text style={styles.sentence}>Not fully annotated</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require("../assets/img/filled-in.png")}/>
                        <Text style={styles.sentence}>Fully annotated</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require("../assets/img/cloudUp2.png")}/>
                        <Text style={styles.sentence}>Not yet uploaded</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require("../assets/img/cloudTick2.png")}/>
                        <Text style={styles.sentence}>Uploaded</Text>
                    </View>
                    <Text style={styles.sentence}>
                        Cases can only be uploaded if they are fully annotated.{'\n'}They can be uploaded individually
                        by selecting them, or all completed cases can be uploaded at once by clicking the "Upload All"
                        button.
                    </Text>
                    <Text style={styles.subheading}>
                        User Preferences
                    </Text>
                    <Text style={styles.paragraph}>
                        You can set default information that will be auto-filled in the annotation of cases by filling
                        out user preferences, navigated to via the "Settings" button on the bottom right of the
                        home page.{'\n'}You can also set your upload preferences, limiting uploads to only be permitted
                        via Wi-Fi and/or cellular data.
                    </Text>
                    <Text style={styles.subheading}>
                        Feedback
                    </Text>
                    <Text style={styles.paragraph}>
                        There are 3 ways you can provide feedback regarding the usability, user interface, functionality
                        and issues encountered in this application:{'\n'}
                    </Text>
                    <Text style={styles.sentence}>
                        • When uploading a single case, you will be asked how your experience was capturing, annotating and uploading the case.
                    </Text>
                    <Text style={styles.sentence}>
                        • There is a feedback form, accessible from the home screen, which can be filled in and uploaded when you have your preferred internet connectivity.
                    </Text>
                    <Text style={styles.sentence}>
                        • You can email me (email address above) any time with questions or feedback regarding this application or what it sets out to do. I'm happy to talk about how it works, how the information gathered will be used and why I have asked you to take part in this trial.
                    </Text>
                    <Divider style={{
                        height: 1,
                        marginTop: Dimensions.get('window').width / 20,
                        marginBottom: Dimensions.get('window').width / 20
                    }}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        marginTop: Dimensions.get("window").height / 40,
        marginRight: Dimensions.get("window").width / 15,
        marginLeft: Dimensions.get("window").width / 15,
    },
    title: {
        color: '#1565c0',
        fontSize: 24,
        marginBottom: Dimensions.get('window').width / 20,
        alignSelf: "center"
    },
    paragraph: {
        fontSize: 18,
        alignSelf: "center"
    },
    subheading: {
        color: '#1565c0',
        fontSize: 20,
        marginBottom: Dimensions.get('window').width / 30,
        alignSelf: "flex-start"
    },
    link: {
        fontSize: 18,
        alignSelf: "center",
        marginBottom: Dimensions.get('window').width / 40,
        color: '#1565c0',
        textDecorationLine: "underline"
    },
    sentence: {
        fontSize: 18,
        alignSelf: "flex-start",
        marginBottom: Dimensions.get('window').width / 40,
    },
    thumbnail: {
        width: Dimensions.get("window").width / 3,
        height: Dimensions.get("window").width / 3,
        alignSelf: "center",
        marginBottom: Dimensions.get('window').width / 20,
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        overflow: "visible",
        height: Dimensions.get("window").height,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: Dimensions.get('window').width / 40,
        marginTop: Dimensions.get('window').width / 40,
    },
    icon: {
        width: Dimensions.get("window").width / 10,
        height: Dimensions.get("window").width / 10,
    },
    iconText: {}
});

export default HelpViewModel;

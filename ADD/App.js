import React from 'react';
import {
    Dimensions
} from "react-native";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeView from "./app/views/homeView";
import CameraView from "./app/views/cameraview";
import SettingsView from "./app/views/settingsview";
import GalleryView from "./app/views/galleryview";
import CategoriseView from "./app/views/categoriseview";

const RootStack = createStackNavigator(
    {
        homeView: HomeView,
        cameraView: CameraView,
        settingsView: SettingsView,
        galleryView: GalleryView,
        categoriseView: CategoriseView,
    },
    {
        initialRouteName: 'homeView',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#73c4c4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                //fontFamily: "sans-serif-thin"
                width : Dimensions.get('window').width,
                textAlign: 'center'
            },
            title: "Image Collection Tool",
            headerTitleAlign: 'center',
        },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

    render() {
        return <AppContainer/>;
    }
}

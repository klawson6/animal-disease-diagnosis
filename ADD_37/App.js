import React from 'react';
import {
    Dimensions
} from "react-native";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeViewModel from "./app/Views/HomeViewModel";
import CameraViewModel from "./app/Views/CameraViewModel";
import SettingsViewModel from "./app/Views/SettingsViewModel";
import GalleryViewModel from "./app/Views/GalleryViewModel";
import CasesViewModel from "./app/Views/CasesViewModel"
import CaseViewModel from "./app/Views/CaseViewModel";
import HelpViewModel from "./app/Views/HelpViewModel"
import ADDModel from "./app/Models/ADDModel";

const model = new ADDModel();

const RootStack = createStackNavigator(
    {
        homeView: {
            screen: HomeViewModel,
            navigationOptions: {
                headerShown: false
            },
            params:{
                model: model
            }
        },
        cameraView: CameraViewModel,
        settingsView: SettingsViewModel,
        galleryView: GalleryViewModel,
        casesView: CasesViewModel,
        categoriseView: CaseViewModel,
        helpView: HelpViewModel
    },
    {
        initialRouteName: 'homeView',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5e92f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                width: Dimensions.get('window').width * 4 / 5,
                textAlign: 'center'
            },
            title: "Image Collection Tool",
            headerTitleAlign: 'center',
        },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        model.initialise();
    }

    render() {
        return <AppContainer/>;
    }
}

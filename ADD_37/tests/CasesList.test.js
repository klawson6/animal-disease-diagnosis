import React from 'react';
import {View} from "react-native";
import CasesList from '../app/Components/CasesList';
import Rerenderer from 'react-test-renderer'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test("Validate buildGallery(Object, Function): Validates that the View built and returned, contains 3 images given, in the correct structure according to the method specification.", () => {
    let caseslist = new CasesList({});
    let testCases = {
        case1: {
            species: "TestSpecies1",
            dateSelected: "TestDate1",
            diagnosis: "TestDiagnosis1",
            type: 0,
            completed: 0,
            uploaded: 0
        },
        case2: {
            species: "TestSpecies2",
            dateSelected: "TestDate2",
            diagnosis: "TestDiagnosis2",
            type: 0,
            completed: 1,
            uploaded: 0
        },
        case3: {species: "TestSpecies3", dateSelected: "TestDate3", type: 1, completed: 1, uploaded: 1},
    };
    let func = (param) => {
        return param;
    };
    let galleryBuilt = caseslist.buildGallery(testCases, func);
    const view = Rerenderer.create(<View>{galleryBuilt}</View>).toJSON();
    expect(view.children.length).toEqual(3);
    expect(view.children[0].children.length).toEqual(3);
    expect(view.children[0].children[0].type).toEqual("View");
    expect(view.children[0].children[1].type).toEqual("Image");
    expect(view.children[0].children[2].type).toEqual("Image");
    expect(view.children[1].children.length).toEqual(3);
    expect(view.children[1].children[0].type).toEqual("View");
    expect(view.children[1].children[1].type).toEqual("Image");
    expect(view.children[1].children[2].type).toEqual("Image");
    expect(view.children[2].children.length).toEqual(3);
    expect(view.children[2].children[0].type).toEqual("View");
    expect(view.children[2].children[1].type).toEqual("Image");
    expect(view.children[2].children[2].type).toEqual("Image");
});

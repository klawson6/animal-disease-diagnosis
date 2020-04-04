import React from 'react';
import {View} from "react-native";
import GalleryViewModel from '../app/Views/GalleryViewModel';
import Model from '../app/Models/ADDModel'
import Rerenderer from 'react-test-renderer'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test("Validate buildGallery(Object): Validates that the View built and returned, contains the 4 images given, in the correct structure according to the method specification.", () => {
    let model = new Model();
    model.case.type = 1;
    let navigation = {
        getParam: (param) => {
            const vals = {
                model: model
            };
            return vals[param];
        }
    };
    let galleryvm = new GalleryViewModel({navigation: navigation});
    let testCases = {
        assets: [[{uri: "ADD/app/assets/img/disease1.png"}], [{uri: "ADD/app/assets/img/disease2.png"}], [{uri: "ADD/app/assets/img/disease3.png"}], [{uri: "ADD/app/assets/img/disease4.png"}]]
    };
    let galleryBuilt = galleryvm.buildGallery(testCases);
    const tree = Rerenderer.create(<View>{galleryBuilt}</View>).toJSON();
    expect(tree.children.length).toEqual(2);
    expect(tree.children[0].children.length).toEqual(3);
    expect(tree.children[0].children[0].type).toEqual("Image");
    expect(tree.children[0].children[1].type).toEqual("Image");
    expect(tree.children[0].children[2].type).toEqual("Image");
    expect(tree.children[1].children.length).toEqual(3);
    expect(tree.children[1].children[0].type).toEqual("Image");
    expect(tree.children[1].children[1].type).toEqual("View");
    expect(tree.children[1].children[2].type).toEqual("View");
});

// test("Validate getCurrentCase(): Set the current case field in the Model manually, and check equality of the value returned from function.", () => {
//     let model = new Model();
//     expect(model.getCurrentCase()).toEqual({});
//     model.case = {
//         identifier: "test1",
//         type: "test2",
//         location: "test3"
//     };
//     expect(model.getCurrentCase()).toEqual({
//         identifier: "test1",
//         type: "test2",
//         location: "test3"
//     });
// });

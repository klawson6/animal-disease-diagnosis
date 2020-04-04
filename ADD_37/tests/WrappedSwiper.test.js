import React from 'react';
import {View} from "react-native";
import WrappedSwiper from '../app/Components/WrappedSwiper';
import Rerenderer from 'react-test-renderer'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test("Validate buildPreview(Array): Validates that the View built and returned, consists of the 4 images in the Slider structure", () => {
    let swiper = new WrappedSwiper({});
    let testImgs = [
        [{filename: "TestName1", uri: "TestURI1"}],
        [{filename: "TestName2", uri: "TestURI2"}],
        [{filename: "TestName3", uri: "TestURI3"}],
        [{filename: "TestName4", uri: "TestURI4"}],
    ];
    let preview = swiper.buildPreview(testImgs);
    const tree = Rerenderer.create(<View>{preview}</View>).toJSON();
    expect(tree.children.length).toEqual(4);
    expect(tree.children[0].type).toEqual("Image");
    expect(tree.children[1].type).toEqual("Image");
    expect(tree.children[2].type).toEqual("Image");
    expect(tree.children[3].type).toEqual("Image");
});

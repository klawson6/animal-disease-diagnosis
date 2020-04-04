import React from 'react';
import Model from '../app/Models/ADDModel';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test("Validate Initial State of Model: Checks that the initial case object in a fresh instantiation of Model is empty of all fields.", () => {
    let model = new Model();
    expect(model.getCurrentCase()).toEqual({});
});

test("Validate getCurrentCase(): Set the current case field in the Model manually, and check equality of the value returned from function.", () => {
    let model = new Model();
    expect(model.getCurrentCase()).toEqual({});
    model.case = {
        identifier: "test1",
        type: "test2",
        location: "test3"
    };
    expect(model.getCurrentCase()).toEqual({
        identifier: "test1",
        type: "test2",
        location: "test3"
    });
});

test("Validate setCurrentCase(Object): Invoke function with test Object, and check equality of manually accessed case field with test Object.", () => {
    let model = new Model();
    let testCase = {
        identifier: "test1",
        type: "test2",
        location: "test3"
    };
    model.setCurrentCase(testCase);
    expect(model.case).toEqual({
        identifier: "test1",
        type: "test2",
        location: "test3"
    });
});

test("Validate getCaseType(): Validate the method specification.\nConfirm equality of returned value when case type is not set with null.\nConfirm equality of returned value when case type is set, with manually set value.", () => {
    let model = new Model();
    let testCase = {
        identifier: "test1",
        type: "test2",
        location: "test3"
    };
    expect(model.getCaseType()).toBe(null);
    model.setCurrentCase(testCase);
    expect(model.getCaseType()).toBe("test2");
});

test("Validate checkCase(): Validate the method specification.\n" +
    "Manually set the current case to Disease, and set all fields to not be null. Check equality of returned value with True\n" +
    "Manually set the current case to Disease, and set some fields to be null. Check equality of returned value with False\n" +
    "Manually set the current case to Healthy, and set all fields to not be null, except diagnosis. Check equality of returned value with True\n" +
    "Manually set the current case to Healthy, and set some fields to be null. Check equality of returned value with False", () => {
    let model = new Model();
    let testCase = {
        identifer: "TestIdentifier",
        dateSelected: "TestDate",
        location: "TestLocation",
        species: "TestSpecies",
        age: 1,
        breed: 2,
        sex: 2,
        diagnosis: "TestDiagnosis",
        type: 0
    };
    model.case = Object.assign({}, testCase);
    expect(model.checkCase()).toEqual(true);
    model.case.location = null;
    expect(model.checkCase()).toEqual(false);
    model.case = {
        location: "TestLocation",
        type: 1,
        diagnosis: null
    };
    expect(model.checkCase()).toEqual(true);
    model.case.identifier = null;
    expect(model.checkCase()).toEqual(false);
});

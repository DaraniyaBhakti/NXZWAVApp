import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AddCategories from "../../src/AddCategories"
import { View } from "react-native"
const navigation = require("react-navigation")
const addCategories = jest.fn();
const screenProps = {

    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () => addCategories,
    },
    id: "AddCategories"
}

const feature = loadFeature('./__tests__/features/AddCategories-scenario.feature');

defineFeature(feature, (test) => {

    const categoriesResponse = {
        "data": [
            {
                "id": "5",
                "type": "profile_account_category",
                "attributes": {
                    "id": 5,
                    "name": "Artist"
                }
            },
            {
                "id": "6",
                "type": "profile_account_category",
                "attributes": {
                    "id": 6,
                    "name": "A&R"
                }
            },
            {
                "id": "14",
                "type": "profile_account_category",
                "attributes": {
                    "id": 7,
                    "name": "Booking Agent"
                }
            },]
    }

    const selectedCategories = [
        { id: 1, name: "Car", isSelected: true },
        { id: 2, name: "Producer", isSelected: true },
        { id: 14, name: "Pen", isSelected: true },
    ];

    const categories = [
        { id: 11, name: "Car", isSelected: false },
        { id: 2, name: "Producer", isSelected: false },
        { id: 14, name: "Pen", isSelected: true },
    ];
    let categoryItem = {
        item: {
            id: 14,
            name: "Producer"
        },
        index: 14
    }
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AddCategories', ({ given, when, then }) => {
        let addCategoriesBlock: ShallowWrapper;
        let instance: AddCategories;

        given('I am a User loading AddCategories', () => {
            addCategoriesBlock = shallow(<AddCategories {...screenProps} />);
        });

        when('I navigate to the AddCategories', () => {
            instance = addCategoriesBlock.instance() as AddCategories
        });

        then('AddCategories will load with out errors', () => {
            instance.doButtonPressed();
            instance.setInputValue('text');
            instance.setEnableField()
            instance.setState({ categories, selectedCategories })
            expect(addCategoriesBlock).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = addCategoriesBlock.findWhere((node) => node.prop('testID') === 'textInputSearchCategories');
            textInputComponent.simulate('changeText', 'Car');
            expect(textInputComponent).toHaveLength(1);
        });

        then('I can select the button with with out errors', () => {
            let btnBackButton = addCategoriesBlock.findWhere(
                (node) => node.prop("testID") === "btnBackButton",
            );
            btnBackButton.simulate("press");
            expect(btnBackButton).toHaveLength(1);

            let btnSaveButton = addCategoriesBlock.findWhere(
                (node) => node.prop("testID") === "btnSaveButton",
            );
            btnSaveButton.simulate("press");
            expect(btnSaveButton).toHaveLength(1);

            let selectedCategories = addCategoriesBlock.findWhere(
                (node) => node.prop("testID") === "selectedCategories-" + 1,
            );
            selectedCategories.simulate("press");
            expect(selectedCategories).toHaveLength(1);

        });

        then("I can select the flat list with with out errors", () => {

            let flatList = addCategoriesBlock.findWhere(
                (node) => node.prop("testID") === "flatListAddCategories",
            );
            flatList.renderProp("renderItem")(categoryItem);
            flatList.props().keyExtractor({ id: "14" });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

            // let itemWrapper = shallow(<View>{instance.renderCategories(categoryItem)}</View>);
            // let categoriesSelectComponent = itemWrapper.findWhere((node) => node.prop("testID") === "checkBoxCategories-" + categoryItem.index);
            // categoriesSelectComponent.simulate("valueChange");
            // expect(categoriesSelectComponent).toHaveLength(1);
            instance.checkBoxOnPress(14)

        });

        then("Categories List API load with out errors", () => {
            const apiGetProfileCategories: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetProfileCategories.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetProfileCategories.messageId,
            );
            apiGetProfileCategories.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(categoriesResponse)),
            );
            apiGetProfileCategories.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                "Error",
            );
            instance.apiGetProfileCategories = apiGetProfileCategories.messageId;
            runEngine.sendMessage("Unit Test", apiGetProfileCategories);
            expect(addCategoriesBlock).toBeTruthy();
        });
        then('I can leave the screen with out errors', () => {

            instance.componentWillUnmount()
            expect(addCategoriesBlock).toBeTruthy();
        });
    });


});
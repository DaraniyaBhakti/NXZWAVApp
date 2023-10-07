import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Hashtags from "../../src/Hashtags"
import { View } from "react-native"
const navigation = require("react-navigation")
const addTags = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () => addTags,
    },
    id: "Hashtags"
}

const feature = loadFeature('./__tests__/features/Hashtags-scenario.feature');

defineFeature(feature, (test) => {
    const tagItem = {
        "index": 3,
        "item": {
            "attributes":
                { "id": 3, "name": "rup. producer", "taggings_count": 1 }
            , "id": "3", "type": "tag"
        }
    }

    const tagListResponse = { "data": [{ "attributes": [Object], "id": "4", "type": "tag" }, { "attributes": [Object], "id": "2", "type": "tag" }, { "attributes": [Object], "id": "1", "type": "tag" }, { "attributes": [Object], "id": "3", "type": "tag" }] }

    const selectedTags = [
        {
            attributes: {
                name: "dsfd",
                taggings_count: 0
            }
        },
        {
            attributes: {
                name: "car",
                taggings_count: 0
            }
        }
    ];

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Hashtags', ({ given, when, then }) => {
        let hashtagsBlockWrapper: ShallowWrapper;
        let instance: Hashtags;

        given('I am a User loading Hashtags', () => {
            hashtagsBlockWrapper = shallow(<Hashtags {...screenProps} />);
        });

        when('I navigate to the Hashtags', () => {
            instance = hashtagsBlockWrapper.instance() as Hashtags
        });

        then('Hashtags will load with out errors', () => {
            instance.setState({ selectedTags });
            instance.doButtonPressed();
            instance.setEnableField();
            expect(hashtagsBlockWrapper).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = hashtagsBlockWrapper.findWhere((node) => node.prop('testID') === 'textInputSearchTag');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let btnBackButton = hashtagsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackButton",
            );
            btnBackButton.simulate("press");
            expect(btnBackButton).toHaveLength(1);

            let btnSaveButton = hashtagsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSaveButton",
            );
            btnSaveButton.simulate("press");
            expect(btnSaveButton).toHaveLength(1);
        });

        then("I can select the flat list with with out errors", () => {
            let flatList = hashtagsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "flatListTags",
            );
            flatList.renderProp("renderItem")(tagItem);
            flatList.props().keyExtractor({ id: 3 });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

            let itemWrapper = shallow(<View>{instance.renderTags(tagItem)}</View>);
            let tagSelectComponent = itemWrapper.findWhere(
                (node) =>
                    node.prop("testID") === "selectedTag-" + tagItem.index,
            );
            tagSelectComponent.simulate("press");
            expect(tagSelectComponent).toHaveLength(1);
            instance.handleRemoveTags(1)
        });

        then("Tags List API load with out errors", () => {
            const apiGetTop40Tags: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetTop40Tags.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetTop40Tags.messageId,
            );
            apiGetTop40Tags.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(tagListResponse)),
            );
            instance.apiGetTop40Tags = apiGetTop40Tags.messageId;
            runEngine.sendMessage("Unit Test", apiGetTop40Tags);
            expect(hashtagsBlockWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(hashtagsBlockWrapper).toBeTruthy();
        });
    });


});

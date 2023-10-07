import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EditWavPostCreation from "../../src/EditWavPostCreation"
const navigation = require("react-navigation")
global.FormData = require("react-native/Libraries/Network/FormData");
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: { params: { selectedPhoto: {} } },
    },
    id: "EditWav",
}

const feature = loadFeature('./__tests__/features/EditWavPostCreation-scenario.feature');

defineFeature(feature, (test) => {


    const postCreationResponse = {
        "data": {
            "id": "10",
            "type": "user_post",
            "attributes": {
                "id": 10,
                "name": "tset post",
                "description": "post 2",
                "user_profile_info_id": {
                    "id": 27,
                    "user_name": "test000_user",
                    "role": "Booking Agent",
                    "level": null,
                    "points": 20
                },
                "created_at": "less than a minute ago",
                "locked": false,
                "points": 5,
                "updated_at": "2023-04-24T10:28:53.786Z",
                "promote": true,
                "tag_list": [
                    "aman",
                    "actor"
                ],
                "images": [
                    "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--84607e07d8bf28e038713e1b172c575780e9734c/Ruby-class.jpg"
                ],
                "categories": [
                    null,
                    null
                ]
            }
        }
    }
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to EditWav', ({ given, when, then }) => {
        let editWavBlock: ShallowWrapper;
        let instance: EditWavPostCreation;

        given('I am a User loading EditWav', () => {
            editWavBlock = shallow(<EditWavPostCreation {...screenProps} />);
        });

        when('I navigate to the EditWav', () => {
            instance = editWavBlock.instance() as EditWavPostCreation
        });

        then('EditWav will load with out errors', () => {
            instance.doButtonPressed();
            instance.setInputValue('text');
            instance.setEnableField()
            expect(editWavBlock).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = editWavBlock.findWhere((node) => node.prop('testID') === 'textInputCaption');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let btnBackButton = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnBackButton",
            );
            btnBackButton.simulate("press");
            expect(btnBackButton).toHaveLength(1);

            let btnPublicOption = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnPublicOption",
            );
            btnPublicOption.simulate("press");
            expect(btnPublicOption).toHaveLength(1);

            let btnLockedOption = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnLockedOption",
            );
            btnLockedOption.simulate("press");
            expect(btnLockedOption).toHaveLength(1);

            let btnCategoryItem = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnCategoryItem",
            );
            btnCategoryItem.simulate("press");
            expect(btnCategoryItem).toHaveLength(1);
            instance.addCategoriesDataMethod('11,14')
            let btnTagsItem = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnTagsItem",
            );
            btnTagsItem.simulate("press");
            expect(btnTagsItem).toHaveLength(1);
            instance.addTagDataMethod("Car,Producer")
            let btnUnlockAmountItem = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnUnlockAmountItem",
            );
            btnUnlockAmountItem.simulate("press");
            expect(btnUnlockAmountItem).toHaveLength(1);
            instance.setUnlockAmountDataMethod(500)
            let btnUploadPost = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnUploadPost",
            );
            btnUploadPost.simulate("press");
            expect(btnUploadPost).toHaveLength(1);

            let btnCancelPost = editWavBlock.findWhere(
                (node) => node.prop("testID") === "btnCancelPost",
            );
            btnCancelPost.simulate("press");
            expect(btnCancelPost).toHaveLength(1);

            let switchPromotePost = editWavBlock.findWhere(
                (node) => node.prop("testID") === "switchPromotePost",
            );
            switchPromotePost.simulate("valueChange");
            expect(switchPromotePost).toHaveLength(1);
        });

        then("Post creation API load with out errors", () => {
            const apiPostCreation: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiPostCreation.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiPostCreation.messageId,
            );
            apiPostCreation.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(postCreationResponse)),
            );
            apiPostCreation.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                "Error",
            );
            instance.apiPostCreation = apiPostCreation.messageId;
            runEngine.sendMessage("Unit Test", apiPostCreation);
            expect(editWavBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(editWavBlock).toBeTruthy();
        });
    });


});

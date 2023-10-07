import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import WalletSend from "../../src/WalletSend"
const navigation = require("react-navigation")
const setUserData = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () => setUserData,
        goBack: jest.fn()
    },
    id: "WalletSend"
}

const feature = loadFeature('./__tests__/features/WalletSend-scenario.feature');

defineFeature(feature, (test) => {



    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to WalletSend', ({ given, when, then }) => {
        let sendBlockWrapper: ShallowWrapper;
        let instance: WalletSend;

        given('I am a User loading WalletSend', () => {
            sendBlockWrapper = shallow(<WalletSend {...screenProps} />);
        });

        when('I navigate to the WalletSend', () => {
            instance = sendBlockWrapper.instance() as WalletSend
        });

        then('WalletSend will load with out errors', () => {
            instance.setUserData({
                "id": "1",
                "type": "user_profile_info",
                "attributes": {
                    "user_name": "David",
                    "unlock_amount": "5K",
                    "apple_account_id": 10,
                    "level_name": "Level 10",
                    "points": 6756,
                    "rank": 6,
                    "profile_account_categories_id": {
                        "id": 5,
                        "name": "Developer"
                    },
                    "profile_pic": null,
                    "cover_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                }
            })
            instance.setUserData({
                "id": "1",
                "type": "user_profile_info",
                "attributes": {
                    "user_name": "David_Al",
                    "unlock_amount": "500",
                    "apple_account_id": 10,
                    "level_name": "Level 10",
                    "points": 4564,
                    "rank": 2,
                    "profile_account_categories_id": {
                        "id": 5,
                        "name": "Artist"
                    },
                    "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                    "cover_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                }
            })
            expect(sendBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            instance.setImage("Clout")
            instance.setImage("Pin")
            instance.setImage("Push")
            instance.setImage("Blast")
            let typeDropDown = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "typeDropDown",
            );
            typeDropDown.simulate("changeText");
            expect(typeDropDown).toHaveLength(1);

            let searchUserBtn = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "searchUserBtn",
            );
            searchUserBtn.simulate("press");
            expect(searchUserBtn).toHaveLength(1);

            let btnNumber1 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber1",
            );
            btnNumber1.simulate("press");
            expect(btnNumber1).toHaveLength(1);

            let btnNumber2 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber2",
            );
            btnNumber2.simulate("press");
            expect(btnNumber2).toHaveLength(1);

            let btnNumber3 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber3",
            );
            btnNumber3.simulate("press");
            expect(btnNumber3).toHaveLength(1);

            let btnNumber4 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber4",
            );
            btnNumber4.simulate("press");
            expect(btnNumber4).toHaveLength(1);

            let btnNumber5 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber5",
            );
            btnNumber5.simulate("press");
            expect(btnNumber5).toHaveLength(1);

            let btnNumber6 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber6",
            );
            btnNumber6.simulate("press");
            expect(btnNumber6).toHaveLength(1);

            let btnNumber7 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber7",
            );
            btnNumber7.simulate("press");
            expect(btnNumber7).toHaveLength(1);

            let btnNumber8 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber8",
            );
            btnNumber8.simulate("press");
            expect(btnNumber8).toHaveLength(1);

            let btnNumber9 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber9",
            );
            btnNumber9.simulate("press");
            expect(btnNumber9).toHaveLength(1);

            let btnNumberDot = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumberDot",
            );
            btnNumberDot.simulate("press");
            expect(btnNumberDot).toHaveLength(1);

            let btnNumber0 = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnNumber0",
            );
            btnNumber0.simulate("press");
            expect(btnNumber0).toHaveLength(1);

            let btnBackSpace = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackSpace",
            );
            btnBackSpace.simulate("press");
            expect(btnBackSpace).toHaveLength(1);

            let btnCancel = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnCancel",
            );
            btnCancel.simulate("press");
            expect(btnCancel).toHaveLength(1);

            let btnSwitch = sendBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSend",
            );
            btnSwitch.simulate("press");
            expect(btnSwitch).toHaveLength(1);

        });

        then("Wallet Switch API load with out errors", () => {
            const apiSendPoints: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiSendPoints.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiSendPoints.messageId,
            );
            apiSendPoints.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({}
                ))
            );
            instance.apiSendPoints = apiSendPoints.messageId;
            runEngine.sendMessage("Unit Test", apiSendPoints);
            expect(sendBlockWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(sendBlockWrapper).toBeTruthy();
        });
    });


});

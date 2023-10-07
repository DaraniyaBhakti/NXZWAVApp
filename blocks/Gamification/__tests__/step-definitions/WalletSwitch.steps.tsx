import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import WalletSwitch from "../../src/WalletSwitch"
const navigation = require("react-navigation")
const callback = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () => callback,
    },
    id: "WalletSwitch"
}

const feature = loadFeature('./__tests__/features/WalletSwitch-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to WalletSwitch', ({ given, when, then }) => {
        let switchBlockWrapper: ShallowWrapper;
        let instance: WalletSwitch;

        given('I am a User loading WalletSwitch', () => {
            switchBlockWrapper = shallow(<WalletSwitch {...screenProps} />);
        });

        when('I navigate to the WalletSwitch', () => {
            instance = switchBlockWrapper.instance() as WalletSwitch
        });

        then('WalletSwitch will load with out errors', () => {

            let payAmount = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "payAmount",
            );
            payAmount.simulate("press");
            expect(payAmount).toHaveLength(1);
            instance.setState({ isPayAmountSelected: true })
            let btnDigit2 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit2",
            );
            btnDigit2.simulate("press");

            expect(btnDigit2).toHaveLength(1);
            let btnDigitDot = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigitDot",
            );
            btnDigitDot.simulate("press");
            expect(btnDigitDot).toHaveLength(1);

            let btnBackSpace = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackSpace",
            );
            btnBackSpace.simulate("press");
            expect(btnBackSpace).toHaveLength(1);
            expect(switchBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let payTypeDropDown = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "payTypeDropDown",
            );
            payTypeDropDown.simulate("changeText");
            expect(payTypeDropDown).toHaveLength(1);

            instance.setState({ isPayAmountSelected: false,receivedAmount:"88" })
            let receiveAmount = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "receiveAmount",
            );
            receiveAmount.simulate("press");
            expect(receiveAmount).toHaveLength(1);
            let receiveTypeDropDown = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "receiveTypeDropDown",
            );
            receiveTypeDropDown.simulate("changeText");
            expect(receiveTypeDropDown).toHaveLength(1);

            let btnDigit1 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit1",
            );
            btnDigit1.simulate("press");
            expect(btnDigit1).toHaveLength(1);

            let btnDigit2 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit2",
            );
            btnDigit2.simulate("press");
            expect(btnDigit2).toHaveLength(1);

            let btnDigit3 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit3",
            );
            btnDigit3.simulate("press");
            expect(btnDigit3).toHaveLength(1);

            let btnDigit4 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit4",
            );
            btnDigit4.simulate("press");
            expect(btnDigit4).toHaveLength(1);

            let btnDigit5 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit5",
            );
            btnDigit5.simulate("press");
            expect(btnDigit5).toHaveLength(1);

            let btnDigit6 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit6",
            );
            btnDigit6.simulate("press");
            expect(btnDigit6).toHaveLength(1);

            let btnDigit7 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit7",
            );
            btnDigit7.simulate("press");
            expect(btnDigit7).toHaveLength(1);

            let btnDigit8 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit8",
            );
            btnDigit8.simulate("press");
            expect(btnDigit8).toHaveLength(1);

            let btnDigit9 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit9",
            );
            btnDigit9.simulate("press");
            expect(btnDigit9).toHaveLength(1);

            let btnDigitDot = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigitDot",
            );
            btnDigitDot.simulate("press");
            expect(btnDigitDot).toHaveLength(1);

            let btnDigit0 = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit0",
            );
            btnDigit0.simulate("press");
            expect(btnDigit0).toHaveLength(1);

            let btnBackSpace = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackSpace",
            );
            btnBackSpace.simulate("press");
            expect(btnBackSpace).toHaveLength(1);

            let btnCancel = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnCancel",
            );
            btnCancel.simulate("press");
            expect(btnCancel).toHaveLength(1);

            let btnSwitch = switchBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSwitch",
            );
            btnSwitch.simulate("press");
            expect(btnSwitch).toHaveLength(1);

            instance.setImage("Clout")
            instance.setImage("Pin")
            instance.setImage("Push")
            instance.setImage("Blast")

        });

        then("Wallet Switch API load with out errors", () => {
            const apiSwitchWalletPoints: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiSwitchWalletPoints.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiSwitchWalletPoints.messageId,
            );
            apiSwitchWalletPoints.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({message:"Points switched"}))
            );
            instance.apiSwitchWalletPoints = apiSwitchWalletPoints.messageId;
            runEngine.sendMessage("Unit Test", apiSwitchWalletPoints);
            expect(switchBlockWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(switchBlockWrapper).toBeTruthy();
        });
    });


});

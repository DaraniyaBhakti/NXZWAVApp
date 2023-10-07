import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Gamification from "../../src/Gamification"
const navigation = require("react-navigation")
const callback = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () =>callback,
    },
    id: "Gamification"
}

const feature = loadFeature('./__tests__/features/Gamification-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Gamification', ({ given, when, then }) => {
        let gamificationBlockWrapper: ShallowWrapper;
        let instance: Gamification;

        given('I am a User loading Gamification', () => {
            gamificationBlockWrapper = shallow(<Gamification {...screenProps} />);
        });

        when('I navigate to the Gamification', () => {
            instance = gamificationBlockWrapper.instance() as Gamification
        });

        then('Gamification will load with out errors', () => {
            instance.doButtonPressed();
            instance.setEnableField()
            expect(gamificationBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let btnOption50 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption50",
            );
            btnOption50.simulate("press");
            expect(btnOption50).toHaveLength(1);

            let btnOption100 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption100",
            );
            btnOption100.simulate("press");
            expect(btnOption100).toHaveLength(1);

            let btnOption250 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption250",
            );
            btnOption250.simulate("press");
            expect(btnOption250).toHaveLength(1);

            let btnDigit1 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit1",
            );
            btnDigit1.simulate("press");
            expect(btnDigit1).toHaveLength(1);

            let btnDigit2 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit2",
            );
            btnDigit2.simulate("press");
            expect(btnDigit2).toHaveLength(1);

            let btnDigit3 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit3",
            );
            btnDigit3.simulate("press");
            expect(btnDigit3).toHaveLength(1);

            let btnDigit4 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit4",
            );
            btnDigit4.simulate("press");
            expect(btnDigit4).toHaveLength(1);

            let btnDigit5 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit5",
            );
            btnDigit5.simulate("press");
            expect(btnDigit5).toHaveLength(1);

            let btnDigit6 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit6",
            );
            btnDigit6.simulate("press");
            expect(btnDigit6).toHaveLength(1);

            let btnDigit7 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit7",
            );
            btnDigit7.simulate("press");
            expect(btnDigit7).toHaveLength(1);

            let btnDigit8 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit8",
            );
            btnDigit8.simulate("press");
            expect(btnDigit8).toHaveLength(1);

            let btnDigit9 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit9",
            );
            btnDigit9.simulate("press");
            expect(btnDigit9).toHaveLength(1);

            let btnDigitDot = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigitDot",
            );
            btnDigitDot.simulate("press");
            expect(btnDigitDot).toHaveLength(1);

            let btnDigit0 = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnDigit0",
            );
            btnDigit0.simulate("press");
            expect(btnDigit0).toHaveLength(1);

            let btnBackSpace = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackSpace",
            );
            btnBackSpace.simulate("press");
            expect(btnBackSpace).toHaveLength(1);

            let btnBack = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBack",
            );
            btnBack.simulate("press");
            expect(btnBack).toHaveLength(1);

            let btnSetAmount = gamificationBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSetAmount",
            );
            btnSetAmount.simulate("press");
            
            expect(btnSetAmount).toHaveLength(1);

            

        

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(gamificationBlockWrapper).toBeTruthy();
        });
    });


});

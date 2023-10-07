import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import BuyPoints from "../../src/BuyPoints"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        state: { params: { screenType: "" } },
        goBack: jest.fn(),
    },
    id: "BuyPoints"
}

const feature = loadFeature('./__tests__/features/BuyPoints-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to BuyPoints', ({ given, when, then }) => {
        let buyPointsBlockWrapper: ShallowWrapper;
        let instance: BuyPoints;

        given('I am a User loading BuyPoints', () => {
            buyPointsBlockWrapper = shallow(<BuyPoints {...screenProps} />);
        });

        when('I navigate to the BuyPoints', () => {
            instance = buyPointsBlockWrapper.instance() as BuyPoints
        });

        then('BuyPoints will load with out errors', () => {
            expect(buyPointsBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let btnBack = buyPointsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBack",
            );
            btnBack.simulate("press");
            expect(btnBack).toHaveLength(1);

            let btnOption100 = buyPointsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption100",
            );
            btnOption100.simulate("press");
            expect(btnOption100).toHaveLength(1);

            let btnOption1k = buyPointsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption1k",
            );
            btnOption1k.simulate("press");
            expect(btnOption1k).toHaveLength(1);

            let btnOption5k = buyPointsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnOption5k",
            );
            btnOption5k.simulate("press");
            expect(btnOption5k).toHaveLength(1);

            let btnPay = buyPointsBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnPay",
            );
            btnPay.simulate("press");
            expect(btnPay).toHaveLength(1);

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(buyPointsBlockWrapper).toBeTruthy();
        });
    });

});

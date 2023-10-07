import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import WalletSentMessage from "../../src/WalletSentMessage"
const navigation = require("react-navigation")
const callback = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        state: { params: { userName: "", userImage:"", pointType:"", pointImage:"",amount:"" } },
    },
    id: "WalletSentMessage"
}

const feature = loadFeature('./__tests__/features/WalletSentMessage-scenario.feature');

defineFeature(feature, (test) => {



    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to WalletSentMessage', ({ given, when, then }) => {
        let sentMessageBlockWrapper: ShallowWrapper;
        let instance: WalletSentMessage;

        given('I am a User loading WalletSentMessage', () => {
            sentMessageBlockWrapper = shallow(<WalletSentMessage {...screenProps} />);
        });

        when('I navigate to the WalletSentMessage', () => {
            instance = sentMessageBlockWrapper.instance() as WalletSentMessage
        });

        then('WalletSentMessage will load with out errors', () => {
            expect(sentMessageBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            instance.setImage("Clout")
            instance.setImage("Pin")
            instance.setImage("Push")
            instance.setImage("Blast")
            let btnBack = sentMessageBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBack",
            );
            btnBack.simulate("press");
            expect(btnBack).toHaveLength(1);
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(sentMessageBlockWrapper).toBeTruthy();
        });
    });


});

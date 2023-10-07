import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SearchUser from "../../src/SearchUser"
import { View } from "react-native"
const setUserData = jest.fn();
const screenProps = {

    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: () => setUserData,
    },
    id: "SearchUser"
}

const feature = loadFeature('./__tests__/features/SearchUser-scenario.feature');

defineFeature(feature, (test) => {

    const userResponse = {
        "data": [
            {
                "id": "1",
                "type": "user_profile_info",
                "attributes": {
                    "user_name": "David_Alvarado",
                    "unlock_amount": "5K",
                    "apple_account_id": 10,
                    "level_name": "Level 1",
                    "points": 550,
                    "rank": 2,
                    "profile_account_categories_id": {
                        "id": 1,
                        "name": "Artist"
                    },
                    "profile_pic": null,
                    "cover_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                    "link": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe"
                }
            },
            {
                "id": "12",
                "type": "user_profile_info",
                "attributes": {
                    "user_name": "David",
                    "unlock_amount": "5K",
                    "apple_account_id": 10,
                    "level_name": "Level 3",
                    "points": 550,
                    "rank": 2,
                    "profile_account_categories_id": null,
                    "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                    "cover_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                    "link": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe"
                }
            },
        ]
    }

    let userItem = {
        item: {
            "id": "1",
            "type": "user_profile_info",
            "attributes": {
                "user_name": "David_Alvarado",
                "unlock_amount": "5K",
                "apple_account_id": 10,
                "level_name": "Level 1",
                "points": 550,
                "rank": 2,
                "profile_account_categories_id": {
                    "id": 1,
                    "name": "Artist"
                },
                "profile_pic": null,
                "cover_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/aekm5fc1mw2ocyamii1ui0aj9w78",
                "link": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe"
            }
        },
        index: 1
    }

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SearchUser', ({ given, when, then }) => {
        let searchUserBlock: ShallowWrapper;
        let instance: SearchUser;

        given('I am a User loading SearchUser', () => {
            searchUserBlock = shallow(<SearchUser {...screenProps} />);
        });

        when('I navigate to the SearchUser', () => {
            instance = searchUserBlock.instance() as SearchUser
        });

        then('SearchUser will load with out errors', () => {
            expect(searchUserBlock).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = searchUserBlock.findWhere((node) => node.prop('testID') === 'searchUserTextInput');
            textInputComponent.simulate('changeText', 'David');
            textInputComponent.simulate('submitEditing');
            textInputComponent.simulate('changeText', '');
            textInputComponent.simulate('submitEditing');
            expect(textInputComponent).toHaveLength(1);
        });

        then("I can select the flat list with with out errors", () => {

            let flatList = searchUserBlock.findWhere(
                (node) => node.prop("testID") === "userFlatList",
            );
            flatList.renderProp("renderItem")(userItem);
            flatList.renderProp("renderItem")({ item: userResponse.data[1], index: 5 });
            flatList.props().keyExtractor({ id: "14" });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

            let itemWrapper = shallow(<View>{instance.renderItem(userItem.item, userItem.index)}</View>);
            let userComponent = itemWrapper.findWhere((node) => node.prop("testID") === "rowUserView-" + userItem.index);
            userComponent.simulate("press");
            expect(userComponent).toHaveLength(1);
        });

        then("User List API load with out errors", () => {
            const getUserListApiCallId: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            getUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getUserListApiCallId.messageId,
            );
            getUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(userResponse)),
            );

            getUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                "Error",
            );

            instance.getUserListApiCallId = getUserListApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getUserListApiCallId);
            expect(searchUserBlock).toBeTruthy();
        });

        then("Search User List API load with out errors", () => {
            const getSearchUserListApiCallId: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            getSearchUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getSearchUserListApiCallId.messageId,
            );
            getSearchUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(userResponse)),
            );
            getSearchUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({ message: "No User Found" })),
            );
            getSearchUserListApiCallId.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                "Error",
            );
            instance.getSearchUserListApiCallId = getSearchUserListApiCallId.messageId;
            runEngine.sendMessage("Unit Test", getSearchUserListApiCallId);
            expect(searchUserBlock).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(searchUserBlock).toBeTruthy();
        });
    });
});
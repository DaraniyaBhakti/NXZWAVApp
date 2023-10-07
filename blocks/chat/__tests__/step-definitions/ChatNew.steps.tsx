import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpersChatNew from "../../../../framework/src/Helpers";

import React from "react";
import ChatNew from "../../src/ChatNew";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { UserResponse } from "../../src/ChatNewController";

const screenPropsChatNew = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    goBack: jest.fn(),
    state: {
      params: {
        receiverUser: "ReceiveUser",
        userID: "7",
        userName: "name",
        userPic: "",
        userPoints: "12",
        userRole: "designer"
      },
    },
  },
  id: "ChatNew",
};

const userList: UserResponse[] = 
	[{
			id: "319",
			type: "user_profile_info",
			attributes: {
				user_name: "Prof. Kieth Crona",
				unlock_amount: null,
				apple_account_id: 320,
				level_name: "Level 1",
				points: 4950,
				rank: 1,
				profile_account_categories_id: {
					id: 321,
					name: "Tracee Wintheiser"
				},
				profile_pic: null,
				cover_pic: null
			}
		},
		{
			id: "320",
			type: "user_profile_info",
			attributes: {
				user_name: "Diana Fisher DO",
				unlock_amount: null,
				apple_account_id: 321,
				level_name: "Level 1",
				points: 125,
				rank: 2,
				profile_account_categories_id: {
					id: 322,
					name: "Bobbie Luettgen"
				},
				profile_pic: null,
				cover_pic: null
			}
		}
	]


const featureChatNew = loadFeature("./__tests__/features/ChatNew-scenario.feature");

defineFeature(featureChatNew, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpersChatNew, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to ChatNew", ({ given, when, then }) => {
    let chatNewWrapper: ShallowWrapper;
    let instanceChatNew: ChatNew;

    given("I am a User loading ChatNew", () => {
      chatNewWrapper = shallow(<ChatNew {...screenPropsChatNew} />);
    });

    when("I navigate to ChatNew", () => {
      instanceChatNew = chatNewWrapper.instance() as ChatNew;
      let textInputComponentChatNew = chatNewWrapper.findWhere(
        (node) => node.prop("testID") === "textInputComponentChatNew"
      );
      textInputComponentChatNew.simulate("changeText", "user1");
      instanceChatNew.onPressUserSubmitting()
    });

    then("ChatNew will load", () => {
      instanceChatNew.setState({ userList: userList });

      let itemChatNew = {
        item: {
          id: "319",
          type: "user_profile_info",
          attributes: {
            user_name: "Prof. Kieth Crona",
            unlock_amount: null,
            apple_account_id: 320,
            level_name: "Level 1",
            points: 4900,
            rank: 1,
            profile_account_categories_id: {
              id: 321,
              name: "Tracee Wintheiser"
            },
            profile_pic: null,
            cover_pic: null
          }
        }
      };
      let flatListChatNew = chatNewWrapper.findWhere(
        (node) => node.prop("testID") === "flatListChatNew"
      );
      let rowItemChatNew = flatListChatNew
        .renderProp("renderItem")(itemChatNew)
        .findWhere((node) => node.prop("testID") === "rowItemChatNew");
      rowItemChatNew.simulate("press");

      let touchOnMainContainerChatNew = chatNewWrapper.findWhere(
        (node) => node.prop("testID") === "touchOnMainContainerChatNew"
      );
      touchOnMainContainerChatNew.simulate("press");

      let btnBackChatNew = chatNewWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackChatNew"
      );
      btnBackChatNew.simulate("press");

      let btnChatChatNew = chatNewWrapper.findWhere(
        (node) => node.prop("testID") === "btnChatChatNew"
      );
      btnChatChatNew.simulate("press");

      instanceChatNew.setState({currentSelectedUser:null})

    });

    then("I can leave the screen", () => {
      const msgGetUsersForConversation = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgGetUsersForConversation.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgGetUsersForConversation.messageId
      );
      msgGetUsersForConversation.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            message: "No conversations Found"
          }
        })
      instanceChatNew.getUserListApiCallId = msgGetUsersForConversation.messageId;
      runEngine.sendMessage("Unit Test", msgGetUsersForConversation);
    });
  });
});

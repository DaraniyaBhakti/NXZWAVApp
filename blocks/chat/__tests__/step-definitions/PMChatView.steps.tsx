import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import PMChatView from "../../src/PmChatView";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import LockedMessage from "../../src/components/LockedMessage";
import MessageView from "../../src/components/MessageView";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    state: { params: { receiverUser: {}, conversationID: 0 } },
  },
  id: "PMChatView"
};

const feature = loadFeature("./__tests__/features/PMChatView-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to PMChatView", ({ given, when, then }) => {
    let pmChatViewWrapper: ShallowWrapper;
    let instance: PMChatView;
    let messageView: ShallowWrapper;
    let messageViewInstance: MessageView;
    let lockedMessageView: ShallowWrapper;
    let lockedMessageViewInstance: LockedMessage;

    given("I am a User loading PMChatView", () => {
      pmChatViewWrapper = shallow(<PMChatView {...screenProps} />);
      messageView = shallow(<MessageView messageData={{
        id: "",
        type: "pm_chat",
        attributes: {
          id: 0,
          points: 0,
          message: {
            message: "",
            created_at: ''
          },
          is_locked: false,
          image: "",
          is_mark_read: true,
          profile: {
            profile_pic: "",
            user_name: "",
            user_role: ""
          },
          conversation_id: 0
        }
      }} />);
      lockedMessageView = shallow(<LockedMessage messageData={{
        id: "",
        type: "pm_chat",
        attributes: {
          id: 0,
          points: 0,
          message: {
            message: "",
            created_at: ''
          },
          is_locked: false,
          image: "",
          is_mark_read: true,
          profile: {
            profile_pic: "",
            user_name: "",
            user_role: ""
          },
          conversation_id: 0
        }
      }} unlockMessage={function (messageId: any): void { }} />);
    });

    when("I navigate to PMChatView", () => {
      instance = pmChatViewWrapper.instance() as PMChatView;
      messageViewInstance = messageView.instance() as MessageView;
      lockedMessageViewInstance = lockedMessageView.instance() as LockedMessage;


    });
    then('PMChatView will load with out errors', () => {
      expect(pmChatViewWrapper).toBeTruthy();
    });

    then('I can enter text with out errors', () => {
      let textInputComponent = pmChatViewWrapper.findWhere((node) => node.prop('testID') === 'inputMessage');
      textInputComponent.simulate('changeText', 'hello@aol.com');
    });

    then('I can select the button with with out errors', () => {
      let backBtn = pmChatViewWrapper.findWhere(
        (node) => node.prop("testID") === "backBtn",
      );
      backBtn.simulate("press");
      expect(backBtn).toHaveLength(1);

      let editBtn = pmChatViewWrapper.findWhere(
        (node) => node.prop("testID") === "editBtn",
      );
      editBtn.simulate("press");
      expect(editBtn).toHaveLength(1);

      let btnSendMessage = pmChatViewWrapper.findWhere(
        (node) => node.prop("testID") === "btnSendMessage",
      );
      btnSendMessage.simulate("press");
      expect(btnSendMessage).toHaveLength(1);

      let unlockBtn = lockedMessageView.findWhere(
        (node) => node.prop("testID") === "unlockBtn",
      );
      unlockBtn.simulate("press");
      expect(unlockBtn).toHaveLength(1);
    });

    then("Get Chat List API load with out errors", () => {
      const getChatListApiCallId: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      getChatListApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getChatListApiCallId.messageId,
      );
      getChatListApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({
          "data": [{
            "id":
              "244", "type": "pm_chat", "attributes":
            {
              "id": 244, "points": 0, "is_locked": false, "user_profile_info_id": 9,
              "image": null, "message": { "message": "heloo mitang rana", "created_at": "2023-07-03T10:39:37.430Z" }, "profile": null
            }
          },
          {
            "id": "211", "type": "pm_chat", "attributes": {
              "id": 211, "points": 50, "is_locked": true, "user_profile_info_id": 9, "image": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWjA9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--03191c01d82d9bdf7fc902680f66f67720c653f6/IMG_0010.JPG", "message": { "message": "Fgh", "created_at": "2023-06-23T07:39:23.981Z" }, "profile": null
            }
          }]
        }
        )));
      getChatListApiCallId.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        JSON.parse(JSON.stringify({ Error: "error message" })),
      );
      instance.getChatListApiCallId = getChatListApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getChatListApiCallId);
      expect(pmChatViewWrapper).toBeTruthy();
    });

    then("Unlock Message API load with out errors", () => {
      const unlockMessageApiCallId: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      unlockMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        unlockMessageApiCallId.messageId,
      );
      unlockMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({
          "data":
          {
            "id": "231",
            "type":
              "pm_chat", "attributes": {
                "id": 231,
                "points": 0,
                "is_locked": false,
                "user_profile_info_id": 3,
                "image": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBYUU9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f8276fa3961fbf5b31a48aa240f40505df068b7c/image-3.png", "message": { "message": "monday 2/7", "created_at": "2023-07-03T08:24:52.236Z" },
                "profile": {
                  "profile_pic": null,
                  "user_name": "Bhakti_Daraniya",
                  "user_role": null
                }
              }
          }
        }
        )));
      unlockMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        JSON.parse(JSON.stringify({ Error: "error message" })),
      );
      instance.unlockMessageApiCallId = unlockMessageApiCallId.messageId;
      runEngine.sendMessage("Unit Test", unlockMessageApiCallId);
      expect(pmChatViewWrapper).toBeTruthy();
    });

    then("Read Message API load with out errors", () => {
      const putReadMessageApiCallId: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      putReadMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        putReadMessageApiCallId.messageId,
      );
      putReadMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ "message": "Message Readed" }
        )));
      putReadMessageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        JSON.parse(JSON.stringify({ Error: "error message" })),
      );
      instance.putReadMessageApiCallId = putReadMessageApiCallId.messageId;
      runEngine.sendMessage("Unit Test", putReadMessageApiCallId);
      expect(pmChatViewWrapper).toBeTruthy();
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(pmChatViewWrapper).toBeTruthy();
    });

  });
});

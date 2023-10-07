import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpersChatViewWeb from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ChatView from "../../src/ChatView.web";
import { IChatData } from "../../src/ChatViewController";

const paramsChatViewWeb = {
  receiverUser: "ReceiveUser",
  userID:"7",
  userName:"name",
  userPic:"",
  userPoints:"12",
  userRole:"designer"
};

const testChatData: IChatData = {
  id: "17",
  attributes: {
    id: 1,
    name: "test group",
    is_notification_mute: true,
    accounts_chats: [
      { id: "1", attributes: { account_id: 1, muted: true, unread_count: 5 } },
    ],
    messages: [
      {
        id: "1",
        type: "conversation",
        attributes: {
          id: 1,
          message: "hello",
          user_profile_info_id: 1,
          conversation_id: 1,
          created_at: "2022-05-02T21:31:05.047Z",
          updated_at: "2022-05-03T02:45:09.837Z",
          is_mark_read: true,
          profile_image: "",
          user_name: ""
        },
      },
    ],
  },
  relationships: {
    accounts: {
      data: [
        {
          id: "1",
          type: "account",
        },
      ],
    },
  },
};

const screenPropsChatViewWeb = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    onGoBack: jest.fn(),
    state: {
      params: {
        receiverUser: paramsChatViewWeb.receiverUser,
        userID:paramsChatViewWeb.userID,
        userName:paramsChatViewWeb.userName,
        userPic:paramsChatViewWeb.userPic,
        userPoints:paramsChatViewWeb.userPoints,
        userRole:paramsChatViewWeb.userRole
      },
    },
  },
  id: "ChatView",
};

const featureChatViewWeb = loadFeature(
  "./__tests__/features/ChatView-scenario.web.feature"
);

defineFeature(featureChatViewWeb, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpersChatViewWeb, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to ChatView", ({ given, when, then }) => {
    let chatViewWebWrapper: ShallowWrapper;
    let instanceChatViewWeb: ChatView;
    let fileChatViewWeb: Blob;

    given("I am a User loading ChatView", () => {
      chatViewWebWrapper = shallow(<ChatView {...screenPropsChatViewWeb} />);
    });

    when("I navigate to ChatView", () => {
      instanceChatViewWeb = chatViewWebWrapper.instance() as ChatView;

      const accountIdInputChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputAccountID"
      );
      accountIdInputChatViewWeb.simulate("change", "2");
      accountIdInputChatViewWeb.simulate("change", "hey");
      
      const addAccountButtonChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddAccount"
      );
      addAccountButtonChatViewWeb.simulate("click");

      const buttonComponentChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseModal"
      );
      buttonComponentChatViewWeb.simulate("click");

      const buttonClosePreviewComponentChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnClosePreviewModal"
      );
      buttonClosePreviewComponentChatViewWeb.simulate("click");

      const messageInputChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputImageMessage"
      );
      messageInputChatViewWeb.simulate("change", "Hi");

      const messageInputmChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputMessage"
      );
      messageInputmChatViewWeb.simulate("change", "Hi");
    });

    then("ChatView will load", () => {
      instanceChatViewWeb.setState({ chatData: testChatData });
      const buttonComponentChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnShowAddModal"
      );
      buttonComponentChatViewWeb.simulate("click");
    });

    when("I click on the btnInsertImage button", () => {
      const insertButtonChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnInsertImage"
      );
      insertButtonChatViewWeb.simulate("click");

      const buttonComponentSendChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSendImageMessage"
      );
      buttonComponentSendChatViewWeb.simulate("click");
    });

    then("I can change image file", () => {
      const fileInputChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "FileInput"
      );
      fileInputChatViewWeb.simulate("change", { target: { value: '', files: [] } });
      fileChatViewWeb = new Blob([new ArrayBuffer(1)]);
      fileInputChatViewWeb.simulate("change", { target: { value: 'T', files: [fileChatViewWeb] } });
    });

    when("I click on the leaveChat button", () => {
      const buttonComponentChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnLeaveChat"
      );
      buttonComponentChatViewWeb.simulate("click");
    });

    then("a call to leave the chat room will be made", () => {
      const leaveChatRoomApiMessageChatViewWeb = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      leaveChatRoomApiMessageChatViewWeb.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        leaveChatRoomApiMessageChatViewWeb.messageId
      );

      instanceChatViewWeb.leaveChatApiCallId = leaveChatRoomApiMessageChatViewWeb.messageId;
      runEngine.sendMessage("Unit Test", leaveChatRoomApiMessageChatViewWeb);

      instanceChatViewWeb.setState({message:""})
      const buttonComponentSendChatViewWeb = chatViewWebWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSendImageMessage"
      );
      buttonComponentSendChatViewWeb.simulate("click");
      instanceChatViewWeb.handleMessageChange("message")



    });
  
    then("I can leave the screen", () => {
      instanceChatViewWeb.componentWillUnmount()
    });
  });
});
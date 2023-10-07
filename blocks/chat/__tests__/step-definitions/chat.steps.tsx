import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpersChat from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import React from "react";
import Chat from "../../src/Chat";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";

const screenPropsChat = {
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
        userID:"7",
        userName:"name",
        userPic:"",
        userPoints:"12",
        userRole:"designer"
      },
    },
  },
  id: "Chat",
};

const featureChat = loadFeature("./__tests__/features/Chat-scenario.feature");

defineFeature(featureChat, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpersChat, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to Chat", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instanceChat: Chat;

    given("I am a User loading Chat", () => {
      chatWrapper = shallow(<Chat {...screenPropsChat} />);
    });

    when("I navigate to Chat", () => {
      instanceChat = chatWrapper.instance() as Chat;
      jest.spyOn(instanceChat, "send");
      let dmSelectedChat = true;
      instanceChat.state = {
        // Customizable Area Start
        token: "",
        accountId: -1,
        chatName: "",
        chatList: [],
        isVisibleModal: false,
        dmSelected: dmSelectedChat,
        pmSelected: !dmSelectedChat,
        txtInputValue: "",
        messageConversation: "",
        // Customizable Area End
      };

      let btnBackChat = chatWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackChat"
      );
      btnBackChat.simulate("press");

      let textInputComponentChat = chatWrapper.findWhere(
        (node) => node.prop("testID") === "textInputComponentChat"
      );
      textInputComponentChat.simulate("changeText", "user");
      instanceChat.onPressSubmitting()
    });

    then("User can select Message typ", () => {
      let btnDmChat = chatWrapper.findWhere(
        (node) => node.prop("testID") === "btnDmChat"
      );
      btnDmChat.simulate("press");

      let btnPmChat = chatWrapper.findWhere(
        (node) => node.prop("testID") === "btnPmChat"
      );
      btnPmChat.simulate("press");
      
      let btnNewMessage = chatWrapper.findWhere(
        (node) => node.prop("testID") === "btnNewMessage"
      );
      btnNewMessage.simulate("press");

    });

    then("Chat conversation will load", () => {
      let itemConversation = {
        item:{
        attributes: {
          id: 1,
          created_at: "2023-05-11T13:35:01.045Z",
          updated_at: "2023-05-12T11:07:19.753Z",
          profile_info: {
              profile_pic: null,
              user_name: "Mr. Fabian Ward"
          },
          message: {
              id: 724,
              message: "test_message",
              created_at: "2023-05-12T11:07:19.751Z",
              updated_at: "2023-05-12T11:07:19.751Z",
              is_mark_read: true,
              attachment: null,
              conversation_id: 240,
              user_profile_info_id: 475
          }
        },}
      };
      let flatListConversation = chatWrapper.findWhere(
        (node) => node.prop("testID") === "swipeListViewConversation"
      );
      let rowItemConversation = flatListConversation
        .renderProp("renderItem")(itemConversation)
        .findWhere((node) => node.prop("testID") === "rowItemConversation");
      rowItemConversation.simulate("press");

      let rowHiddenItemMessage = flatListConversation
        .renderProp("renderHiddenItem")(itemConversation)
        .findWhere((node) => node.prop("testID") === "rowHiddenItemMessage");
        rowHiddenItemMessage.simulate("press");
        instanceChat.handleRowItemOnMessagePress(itemConversation.item)

        let rowHiddenItemDelete = flatListConversation
        .renderProp("renderHiddenItem")(itemConversation)
        .findWhere((node) => node.prop("testID") === "rowHiddenItemDelete");
        rowHiddenItemDelete.simulate("press");

        let rowItemKeyExtractor = flatListConversation
        .renderProp("keyExtractor")(itemConversation.item)

        let touchOnMainContainerChat = chatWrapper.findWhere(
          (node) => node.prop("testID") === "touchOnMainContainerChat"
        );
        touchOnMainContainerChat.simulate("press");
        instanceChat.hideKeyboard();
    });

    when("I write in textInput and press submit", () => {
      instanceChat.render()
    });

    then("Api call and show chat list", async() => {
      instanceChat.setState({dmSelected:true})

      instanceChat.getChatList("eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzIxLCJleHAiOjE3MTUzMjY3NTB9.y_MHa8FuNf5s6W9SkhcIKUCLwZdlTRajumrfzciVlBnxzmp330huF83ST449ga4SPWcMqDYAm8SjIexxxwzJAw");
      
      const msgDeleteAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDeleteAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDeleteAPI.messageId
      );
      msgDeleteAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
              message: "Conversation Deleted"
          }
        })
        instanceChat.deleteConversationApiCallId = msgDeleteAPI.messageId;
        runEngine.sendMessage("Unit Test", msgDeleteAPI);
    });

    when("I click on top button", () => {
      
      const messageNavigationChat = new Message(getName(MessageEnum.NavigationMessage));
      messageNavigationChat.addData(getName(MessageEnum.NavigationPropsMessage), {
      messageType: "readMessage",
      conversationID:"1"
      });
      instanceChat.send(messageNavigationChat);
      
      instanceChat.setState({txtInputValue:"ru"})
      instanceChat.getConversationList()

      const msgGetConversations = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgGetConversations.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgGetConversations.messageId
      );
      msgGetConversations.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
              message: "No conversations Found"
          }
        })
        instanceChat.getConversationListApiCallId = msgGetConversations.messageId;
        runEngine.sendMessage("Unit Test", msgGetConversations);

        instanceChat.deleteConversation("1")
    });

    then("it navigates on next screen", () => {
      instanceChat.setState({dmSelected:false, pmSelected:true})
      instanceChat.getConversationList()
    });

    then("I can leave the screen", () => {
      instanceChat.componentWillUnmount();
    });
  });
});

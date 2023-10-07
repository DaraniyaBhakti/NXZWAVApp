import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

import * as helpersChatView from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";

import React from "react";
import ChatView from "../../src/ChatView";
import { IMessage } from "../../src/ChatViewController";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { act } from "react-dom/test-utils";

const screenPropsChatView = {
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
  id: "ChatView",
};

const featureChatView = loadFeature("./__tests__/features/ChatView-scenario.feature");

const messagesChatView: IMessage[] = [
  {
    id: "743",
    type: "conversation",
    attributes: {
      id: 743,
      message: "test_message",
      user_profile_info_id: 320,
      conversation_id: 237,
      created_at: "2023-05-12T14:04:40.470Z",
      updated_at: "2023-05-12T14:04:40.544Z",
      is_mark_read: false,
      profile_image: null,
      user_name: null
    }
  },
  {
    id: "212",
    type: "conversation",
    attributes: {
      id: 212,
      message: "test_message",
      user_profile_info_id: 320,
      conversation_id: 237,
      created_at: "2023-05-11T12:03:12.560Z",
      updated_at: "2023-05-11T12:03:12.564Z",
      is_mark_read: true,
      profile_image: null,
      user_name: null
    }
  },
  {
    id: "210",
    type: "conversation",
    attributes: {
      id: 210,
      message: "test_message",
      user_profile_info_id: 319,
      conversation_id: 237,
      created_at: "2023-05-11T11:58:21.959Z",
      updated_at: "2023-05-11T11:58:21.967Z",
      is_mark_read: true,
      profile_image: null,
      user_name: "Prof. Kieth Crona"
    }
  },
]

const EXAMPLE_CHAT_RESPONSE_CHAT_VIEW = {
  data: {
    id: "17",
    type: "chat",
    attributes: {
      id: 17,
      name: "Duis est moll",
      accounts_chats: [
        {
          id: "19",
          type: "accounts_chats",
          attributes: {
            account_id: 2,
            muted: true,
            unread_count: 0,
          },
        },
      ],
      messages: [],
    },
    relationships: {
      accounts: {
        data: [
          {
            id: "2",
            type: "account",
          },
        ],
      },
    },
  },
};

defineFeature(featureChatView, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpersChatView, "getOS").mockImplementation(() => "ios");
    jest.spyOn(DocumentPicker, 'pickSingle').mockImplementation(() => {
      const response: DocumentPickerResponse = { name: "testFile", uri: 'testUri', size: 100, fileCopyUri: "testCopyUri", type: "testFileType" };
      return Promise.resolve(response);
    });
    jest.spyOn(runEngine, "sendMessage");
    jest.useFakeTimers();
  });

  test("User navigates to ChatView", ({ given, when, then }) => {
    let chatViewWrapper: ShallowWrapper;
    let instanceChatView: ChatView;

    given("I am a User loading ChatView", () => {
      chatViewWrapper = shallow(<ChatView {...screenPropsChatView} />);
    });

    when("I navigate to ChatView", () => {
      instanceChatView = chatViewWrapper.instance() as ChatView;

      instanceChatView.state = {
        // Customizable Area Start
        token: "",
        chatId: 3,
        message: "",
        accountId: -1,
        accountIdInput: "",
        chatData: null,
        isVisibleModal: false,
        isVisiblePreviewModal: false,
        imageUrl: "",
        docRes: null,
        keyboardHeight: 0,
        muted: null,
        messageList: [],
        receiverUserID: "12",
        receiverUserName: "RName",
        receiverUserRole: "RRole",
        receiverUserPic: "",
        receiverUserPoints: "12",
        // Customizable Area End
      };
      instanceChatView.loginUserProfileId = "9"

      instanceChatView.addUserToChat("", 3);
      instanceChatView.addUserToChat("2", 3);
    });

    then("ChatView will load", () => {

      let btnBackChatView = chatViewWrapper.findWhere(
        (node) => node.prop("testID") === "btnBack"
      );
      btnBackChatView.simulate("press");

      let btnSendMessageChatView = chatViewWrapper.findWhere(
        (node) => node.prop("testID") === "btnSendMessage"
      );
      btnSendMessageChatView.simulate("press");

      instanceChatView.setState({ messageList: messagesChatView })
      let itemChatView = {
        item: {
          id: "743",
          type: "conversation",
          attributes: {
            id: 743,
            message: "test_message",
            user_profile_info_id: 320,
            conversation_id: 237,
            created_at: "2023-05-12T14:04:40.470Z",
            updated_at: "2023-05-12T14:04:40.544Z",
            is_mark_read: false,
            profile_image: null,
            user_name: null
          }
        }
      };
      let flatListChatView = chatViewWrapper.findWhere(
        (node) => node.prop("testID") === "flatList"
      );
      let rowItemChatView = flatListChatView
        .renderProp("renderItem")(itemChatView)

      instanceChatView.loginUserProfileId = "320"
      let rowItemChatView1 = flatListChatView
        .renderProp("renderItem")(itemChatView)

      instanceChatView.refreshConversationListScreen();

      instanceChatView.chatTypeDM = false;
      instanceChatView.getReadMessage();

      const msgGetConversationsChatView = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgGetConversationsChatView.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgGetConversationsChatView.messageId
      );
      msgGetConversationsChatView.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "743",
              type: "conversation",
              attributes: {
                id: 743,
                message: "test_message",
                user_profile_info_id: 320,
                conversation_id: 237,
                created_at: "2023-05-12T14:04:40.470Z",
                updated_at: "2023-05-12T14:04:40.544Z",
                is_mark_read: false,
                profile_image: null,
                user_name: null
              }
            },]
        })
      instanceChatView.conversationID = ""
      instanceChatView.getChatListApiCallId = msgGetConversationsChatView.messageId;
      runEngine.sendMessage("Unit Test", msgGetConversationsChatView);

      instanceChatView.sendMessageApiCallId = msgGetConversationsChatView.messageId;
      runEngine.sendMessage("Unit Test", msgGetConversationsChatView);

      instanceChatView.addUserToChatApiCallId = msgGetConversationsChatView.messageId;
      runEngine.sendMessage("Unit Test", msgGetConversationsChatView);

      instanceChatView.putReadMessageApiCallId = msgGetConversationsChatView.messageId;
      runEngine.sendMessage("Unit Test", msgGetConversationsChatView);

      instanceChatView.leaveChatApiCallId = msgGetConversationsChatView.messageId;
      runEngine.sendMessage("Unit Test", msgGetConversationsChatView);

      const msgGetSessionChatView = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgGetSessionChatView.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      msgGetSessionChatView.addData(
        getName(MessageEnum.SessionResponseData),
        //"{data: { id: 1},meta: {id: 2}}"
        {
          data: {
            id: "1",
            type: "apple_account",
          },
          meta: {
            id: 1,
          }
        }
      );
      runEngine.sendMessage("Unit Test", msgGetSessionChatView);

      const msgGetApiErrorChatView = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgGetApiErrorChatView.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgGetApiErrorChatView.messageId
      );
      msgGetApiErrorChatView.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["Signature verification failed"],
      });
      msgGetApiErrorChatView.addData(getName(MessageEnum.RestAPIResponceErrorMessage), 
      "Signature verification failed"
      );
      
      instanceChatView.addUserToChatApiCallId = msgGetApiErrorChatView.id
      runEngine.sendMessage("Unit Test", msgGetApiErrorChatView);


    });

    when("dm type message", () => {
      instanceChatView.chatTypeDM = true;
      instanceChatView.isStringNullOrBlank("")
      instanceChatView.isStringNullOrBlank("string")
    });

    then("do action for dm Type", () => {
      instanceChatView.getReadMessage();
    });

    when("pm type message", () => {
      instanceChatView.chatTypeDM = false;
      const msgGetApiErrorChatView = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgGetApiErrorChatView.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgGetApiErrorChatView.messageId
      );
      msgGetApiErrorChatView.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["Signature verification failed"],
      });
      
      instanceChatView.addUserToChatApiCallId = msgGetApiErrorChatView.id
      runEngine.sendMessage("Unit Test", msgGetApiErrorChatView);
      
    });

    then("do action for pm Type", () => {
      instanceChatView.getReadMessage();

      const messageInput = chatViewWrapper.findWhere(
        (node) => node.prop("testID") === "inputMessage"
      );
      messageInput.simulate("changeText", "Hi");
      expect(instanceChatView.state.message).toEqual("Hi")
    });

    then("I can leave the screen", () => {

      const msgTokenChatView = new Message(getName(MessageEnum.SessionResponseMessage));
      msgTokenChatView.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgTokenChatView);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );

      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: EXAMPLE_CHAT_RESPONSE_CHAT_VIEW,
          meta: {
            message: "Chat data",
          },
        }
      );

      instanceChatView.addUserToChatApiCallId = msgValidationAPI.messageId;
      instanceChatView.leaveChatApiCallId = msgValidationAPI.messageId;
      instanceChatView.sendMessageApiCallId = msgValidationAPI.messageId;
      instanceChatView.updateReadMessageApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instanceChatView.changeNotificationStatus()
      instanceChatView.setState({ muted: true })
      instanceChatView.changeNotificationStatus()

      instanceChatView.getReceiverData()
      act(() => {
        jest.runOnlyPendingTimers();
      });
    });
  });
});

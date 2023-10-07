import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import PMCompose from "../../src/PMCompose";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    state: { params: { receiverUser: {}, conversationID: 0 } },
  },
  id: "PMCompose"
};

const feature = loadFeature("./__tests__/features/PMCompose-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");

  });

  test("User navigates to PMCompose", ({ given, when, then }) => {
    let pmComposeWrapper: ShallowWrapper;
    let instance: PMCompose;

    given("I am a User loading PMCompose", () => {
      pmComposeWrapper = shallow(<PMCompose {...screenProps} />);
    });

    when("I navigate to PMCompose", () => {
      instance = pmComposeWrapper.instance() as PMCompose;


    });
    then('PMCompose will load with out errors', () => {
      let hideKeyboard = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard",
      );
      hideKeyboard.simulate("press");
      expect(hideKeyboard).toHaveLength(1);
      expect(pmComposeWrapper).toBeTruthy();
    });

    then('I can enter text with out errors', () => {
      let textInputComponent = pmComposeWrapper.findWhere((node) => node.prop('testID') === 'textInputMessage');
      textInputComponent.simulate('changeText', 'hello@aol.com');
    });

    then('I can select the button with with out errors', () => {
      let btnImgUpload = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnImgUpload",
      );
      btnImgUpload.simulate("press");
      expect(btnImgUpload).toHaveLength(1);

      let btnOption50 = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnOption50",
      );
      btnOption50.simulate("press");
      expect(btnOption50).toHaveLength(1);

      let btnOption100 = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnOption100",
      );
      btnOption100.simulate("press");
      expect(btnOption100).toHaveLength(1);

      let btnOption250 = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnOption250",
      );
      btnOption250.simulate("press");
      expect(btnOption250).toHaveLength(1);

      let btnPmCompose = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnPmCompose",
      );
      btnPmCompose.simulate("press");
      expect(btnPmCompose).toHaveLength(1);

      let btnCancel = pmComposeWrapper.findWhere(
        (node) => node.prop("testID") === "btnCancel",
      );
      btnCancel.simulate("press");
      expect(btnCancel).toHaveLength(1);
    });

    then("Create PM Compose API load with out errors", () => {
      const apiPMCompose: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiPMCompose.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiPMCompose.messageId,
      );
      apiPMCompose.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({
          "data":
          {
            "id": "247",
            "type": "pm_message",
            "attributes": {
              "id": 247,
              "message": "Nature",
              "user_profile_info_id": 8,
              "pm_conversation_id": 31,
              "created_at": "2023-07-04T11:44:00.081Z",
              "updated_at": "2023-07-04T11:44:00.090Z",
              "is_locked": true,
              "points": 50,
              "image": {
                "id": 168,
                "url": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBYWc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--27fe6a532e0edb90c424c2a2418c5ec2a4f592ca/IMG_0014.JPG"
              }
            }
          }
        })),
      );
      apiPMCompose.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        JSON.parse(JSON.stringify({Error:"error message"})),
      );
      instance.apiPMCompose = apiPMCompose.messageId;
      runEngine.sendMessage("Unit Test", apiPMCompose);
      expect(pmComposeWrapper).toBeTruthy();
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(pmComposeWrapper).toBeTruthy();
    });

  });
});

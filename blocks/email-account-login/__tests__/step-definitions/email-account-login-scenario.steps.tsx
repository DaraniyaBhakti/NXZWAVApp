import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock";
import { ButtonTitles } from "../../../AppleLogin2/src/AppleLogin2";
import { AppleLoginResponse } from "../../../AppleLogin2/src/AppleLogin2Controller";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    onGoBack: jest.fn(),
  },
  id: "EmailAccountLoginBlock",
};

const appleLoginProps = {
  testId: "",
  buttonTitle: ButtonTitles.signIn,
  callback: jest.fn(),
  onPress: jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/email-account-login-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Account Log In screen", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a apple login", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
    });

    then("Screen will load with out errors", () => {
      instance.render();
      instance.setState({
        isLoading: true,
        userId: "",
        identityToken: "",
        email: "",
        firstName: "",
        lastName: "",
        isNetConnected: true,
      });
      instance.render();
      instance.startLoading();
      instance.stopLoading();
    });

    then("User can click on button", () => {
      let touchOnMainContainer = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "mainContainerTouch"
      );
      touchOnMainContainer.simulate("press");
      instance.hideKeyboard();
      instance.appleViewPress();
    });

    then("On callback get response of button action", () => {
      const response: AppleLoginResponse = {
        success: false,
        error: {
          code: "1001",
          message: "The user canceled the authorization attempt.",
        },
      };
      instance.responseApple(response);
      const responseSuccess: AppleLoginResponse = {
        success: true,
        data: {
          userId: "000833.c72aaf2cb04542eabcf01ef782460363.0916",
          identityToken:
            "eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndlbHRobWFuYWdtZW50Lm54endhdiIsImV4cCI6MTY3NTE1NjU3MCwiaWF0IjoxNjc1MDcwMTcwLCJzdWIiOiIwMDA4MzMuYzcyYWFmMmNiMDQ1NDJlYWJjZjAxZWY3ODI0NjAzNjMuMDkxNiIsIm5vbmNlIjoiZTc5NzFjMzA2ODQzNWUzZDk2NWI0MWVkMDI3ODNlMDgxNDVlOTljMzNlZjQ1YThiZDA4ODAxZWNiYjYwZjg5YiIsImNfaGFzaCI6Im1jVUtyaVRZOVVkLXZUbDRjeU5URlEiLCJlbWFpbCI6ImF0aGFydmEubS50ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY3NTA3MDE3MCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.Yv8xQmPmj9oHHJIP6oTb4oe7AxGlyKTi_JjAyFAP-kfJtv_Vb3dlvemH5h6K7oUqXvAZKh7R4maF_4zM4qxJyaQzn700iVVDktoiXPxqwx7sake7jYsMCo0kqA9A8IXuY6XWSUc7oyWfPSZtPwBbiwvvdk52Ooz0x1oCRU8aRhQDvh2kEKYmMd2MAxcuB8HrZzGacQaSf5hAIXHjdmCPrk3W00RBb_RgZiCj9xSTTkrlJDDkx0bW94R5h58tAAiHvregpMlw40lYJR0mWqd5LDrH4l8WBuT_s7H6nKTxMnZGaAypBqWz0ET3y4nNWjiLJNNrt7iHEMXCZQE1QvvQpg",
          email: "abc@gmail.com",
          firstName: "first name",
          lastName: "last name",
        },
      };
      instance.responseApple(responseSuccess);
      instance.onLoginSuccessRedirectOnScreen();
      instance.navigateOnNextScreen();
    });

    then("RestAPI will return error message for wrong end points", async () => {
      const singIn = new Message(getName(MessageEnum.RestAPIResponceMessage));
      singIn.addData(getName(MessageEnum.RestAPIResponceDataMessage), singIn);
      singIn.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        singIn.messageId
      );

      instance.appleSignInApiCallId = singIn.messageId;
      runEngine.sendMessage("Unit Test", singIn);
    });

    then("RestAPI will return error message for verification", async () => {
      const singIn = new Message(getName(MessageEnum.RestAPIResponceMessage));
      singIn.addData(getName(MessageEnum.RestAPIResponceDataMessage), singIn);
      singIn.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: ["Signature verification failed"],
      });
      singIn.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        singIn.messageId
      );
      instance.appleSignInApiCallId = singIn.messageId;
      runEngine.sendMessage("Unit Test", singIn);

      let responseJson = singIn.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      instance.parseApiErrorResponse(responseJson);
    });

    then("RestAPI will return token", async () => {
      const singIn = new Message(getName(MessageEnum.RestAPIResponceMessage));
      singIn.addData(getName(MessageEnum.RestAPIResponceDataMessage), singIn);
      singIn.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          id: "1",
          type: "apple_account",
          attributes: {
            first_name: null,
            last_name: null,
            email: null,
            unique_auth_id: "001004.79f85077b57643dc9db01b86f684c6aa.0733",
            password_digest: null,
            type: null,
            activated: true,
          },
        },
        meta: { message: "User Signed in Successfully" },
      });
      singIn.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        singIn.messageId
      );

      instance.appleSignInApiCallId = singIn.messageId;
      runEngine.sendMessage("Unit Test", singIn);
      instance.onLoginSuccessRedirectOnScreen();
      instance.navigateOnNextScreen();
    });
  });
});

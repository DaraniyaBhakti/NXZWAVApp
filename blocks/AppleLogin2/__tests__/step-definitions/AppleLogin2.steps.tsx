//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AppleLogin2, { ButtonTitles } from "../../src/AppleLogin2";
import { useNetInfo } from "@react-native-community/netinfo";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import {
  appleAuth,
  AppleRequestResponse,
} from "@invertase/react-native-apple-authentication";

const screenPropsBlockExample = {
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
  id: "AppleLogin2",
  buttonTitle: ButtonTitles.signIn,
  callback: jest.fn(),
  onPress: jest.fn(),
};

const screenPropsBlock = {
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
  id: "AppleLogin2",
  testId: "testId",
  buttonTitle: null,
  callback: null,
  onPress: jest.fn(),
};

const featureMobile = loadFeature(
  "./__tests__/features/AppleLogin2-scenario.feature"
);

defineFeature(featureMobile, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
  });

  test("User navigates to AppleLogin2", ({ given, when, then }) => {
    let appleLoginBlockWrapper: ShallowWrapper;
    let instance: AppleLogin2;

    given("I am a User loading AppleLogin2", () => {
      appleLoginBlockWrapper = shallow(<AppleLogin2 {...screenPropsBlockExample} />);
    });

    when("I navigate to the AppleLogin2", () => {
      instance = appleLoginBlockWrapper.instance() as AppleLogin2;
    });

    then("AppleLogin2 will load with out errors", () => {
      instance.render();
      instance.setState({
        isNetConnected: false,
        userId: "000833.c72aaf2cb04542eabcf01ef782460363.0916",
        identityToken:
          "eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndlbHRobWFuYWdtZW50Lm54endhdiIsImV4cCI6MTY3NTE1NjU3MCwiaWF0IjoxNjc1MDcwMTcwLCJzdWIiOiIwMDA4MzMuYzcyYWFmMmNiMDQ1NDJlYWJjZjAxZWY3ODI0NjAzNjMuMDkxNiIsIm5vbmNlIjoiZTc5NzFjMzA2ODQzNWUzZDk2NWI0MWVkMDI3ODNlMDgxNDVlOTljMzNlZjQ1YThiZDA4ODAxZWNiYjYwZjg5YiIsImNfaGFzaCI6Im1jVUtyaVRZOVVkLXZUbDRjeU5URlEiLCJlbWFpbCI6ImF0aGFydmEubS50ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY3NTA3MDE3MCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.Yv8xQmPmj9oHHJIP6oTb4oe7AxGlyKTi_JjAyFAP-kfJtv_Vb3dlvemH5h6K7oUqXvAZKh7R4maF_4zM4qxJyaQzn700iVVDktoiXPxqwx7sake7jYsMCo0kqA9A8IXuY6XWSUc7oyWfPSZtPwBbiwvvdk52Ooz0x1oCRU8aRhQDvh2kEKYmMd2MAxcuB8HrZzGacQaSf5hAIXHjdmCPrk3W00RBb_RgZiCj9xSTTkrlJDDkx0bW94R5h58tAAiHvregpMlw40lYJR0mWqd5LDrH4l8WBuT_s7H6nKTxMnZGaAypBqWz0ET3y4nNWjiLJNNrt7iHEMXCZQE1QvvQpg",
        nonce: "Kp6i28usGghFAXuuUsbSkMOKgQ0tEorR",
        email: "abc@gmail.com",
        firstName: "test1",
        lastName: "test2",
      });
      instance.render();
    });

    then("I can select the button with out errors", async () => {
      let touchOnMainContainer = appleLoginBlockWrapper.findWhere(
        (node) => node.prop("testID") === "mainContainerTouch"
      );
      touchOnMainContainer.simulate("press");
      instance.handleSignInWithApple();
      instance.setState({
        isNetConnected: true,
      });
      instance.handleSignInWithApple();
      instance.validateData();
      instance.appleSignInIos()
      let appleRequestResponse: AppleRequestResponse = {
        authorizationCode:
          "cde53c6ea33a4479f8a1bfba27e854469.0.sytt.SpEWrRPkWirVWiOC2QdMyg",
        authorizedScopes: [],
        email: "abc@gmail.com",
        fullName: {
          familyName: "M Test",
          givenName: "lastName",
          middleName: null,
          namePrefix: null,
          nameSuffix: null,
          nickname: null,
        },
        identityToken:
          "eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndlbHRobWFuYWdtZW50Lm54endhdiIsImV4cCI6MTY3NTE1NjU3MCwiaWF0IjoxNjc1MDcwMTcwLCJzdWIiOiIwMDA4MzMuYzcyYWFmMmNiMDQ1NDJlYWJjZjAxZWY3ODI0NjAzNjMuMDkxNiIsIm5vbmNlIjoiZTc5NzFjMzA2ODQzNWUzZDk2NWI0MWVkMDI3ODNlMDgxNDVlOTljMzNlZjQ1YThiZDA4ODAxZWNiYjYwZjg5YiIsImNfaGFzaCI6Im1jVUtyaVRZOVVkLXZUbDRjeU5URlEiLCJlbWFpbCI6ImF0aGFydmEubS50ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY3NTA3MDE3MCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.Yv8xQmPmj9oHHJIP6oTb4oe7AxGlyKTi_JjAyFAP-kfJtv_Vb3dlvemH5h6K7oUqXvAZKh7R4maF_4zM4qxJyaQzn700iVVDktoiXPxqwx7sake7jYsMCo0kqA9A8IXuY6XWSUc7oyWfPSZtPwBbiwvvdk52Ooz0x1oCRU8aRhQDvh2kEKYmMd2MAxcuB8HrZzGacQaSf5hAIXHjdmCPrk3W00RBb_RgZiCj9xSTTkrlJDDkx0bW94R5h58tAAiHvregpMlw40lYJR0mWqd5LDrH4l8WBuT_s7H6nKTxMnZGaAypBqWz0ET3y4nNWjiLJNNrt7iHEMXCZQE1QvvQpg",
        nonce: "Kp6i28usGghFAXuuUsbSkMOKgQ0tEorR",
        realUserStatus: 2,
        state: null,
        user: "000833.c72aaf2cb04542eabcf01ef782460363.0916",
      };
      instance.getAppleAuthResponse(appleRequestResponse);
      instance.setUserDetailIfItHas(
        JSON.stringify(appleRequestResponse),
        appleRequestResponse
      );
    });

    then("login/register with an Invalid identityToken should fail", () => {
      expect(instance.isValidate()).toBe(true);
      instance.setState({
        userId: "",
      });
      instance.validateData();
      instance.handleAppleCatchError(appleAuth.Error.UNKNOWN);
      instance.handleAppleCatchError(appleAuth.Error.CANCELED);
      instance.handleAppleCatchError(appleAuth.Error.INVALID_RESPONSE);
      instance.handleAppleCatchError(appleAuth.Error.NOT_HANDLED);
      instance.handleAppleCatchError(appleAuth.Error.FAILED);
      expect(instance.isValidate()).toBe(false);
    });

    then("login/register without internetConnection", () => {
      useNetInfo.mockResolvedValueOnce({
        type: "test", // not 'unknown'
        isConnected: false,
      });
      instance.noInternetConnection();
      useNetInfo.mockResolvedValueOnce({
        type: "test", // not 'unknown'
        isConnected: false,
      });
      instance.noInternetConnection();
      instance.componentDidMount();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
    });
  });

  test("AppleLogin on same screen", ({ given, when, then }) => {
    let appleLoginBlockWrapper: ShallowWrapper;
    let instance: AppleLogin2;

    given("I am a User loading AppleLogin2", () => {
      appleLoginBlockWrapper = shallow(<AppleLogin2 {...screenPropsBlock} />);
    });

    when("I navigate to the AppleLogin2", () => {
      instance = appleLoginBlockWrapper.instance() as AppleLogin2;
    });

    then("AppleLogin2 will load with out errors", () => {
      instance.setState({
        userId: "000833.c72aaf2cb04542eabcf01ef782460363.0916",
        identityToken:
          "eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLndlbHRobWFuYWdtZW50Lm54endhdiIsImV4cCI6MTY3NTE1NjU3MCwiaWF0IjoxNjc1MDcwMTcwLCJzdWIiOiIwMDA4MzMuYzcyYWFmMmNiMDQ1NDJlYWJjZjAxZWY3ODI0NjAzNjMuMDkxNiIsIm5vbmNlIjoiZTc5NzFjMzA2ODQzNWUzZDk2NWI0MWVkMDI3ODNlMDgxNDVlOTljMzNlZjQ1YThiZDA4ODAxZWNiYjYwZjg5YiIsImNfaGFzaCI6Im1jVUtyaVRZOVVkLXZUbDRjeU5URlEiLCJlbWFpbCI6ImF0aGFydmEubS50ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY3NTA3MDE3MCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.Yv8xQmPmj9oHHJIP6oTb4oe7AxGlyKTi_JjAyFAP-kfJtv_Vb3dlvemH5h6K7oUqXvAZKh7R4maF_4zM4qxJyaQzn700iVVDktoiXPxqwx7sake7jYsMCo0kqA9A8IXuY6XWSUc7oyWfPSZtPwBbiwvvdk52Ooz0x1oCRU8aRhQDvh2kEKYmMd2MAxcuB8HrZzGacQaSf5hAIXHjdmCPrk3W00RBb_RgZiCj9xSTTkrlJDDkx0bW94R5h58tAAiHvregpMlw40lYJR0mWqd5LDrH4l8WBuT_s7H6nKTxMnZGaAypBqWz0ET3y4nNWjiLJNNrt7iHEMXCZQE1QvvQpg",
      });
      instance.validateData();
      instance.handleAppleCatchError("");
    });
  });
});

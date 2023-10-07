import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AppleLogin2 from "../../src/AppleLogin2.web";
import { ButtonTitles } from "../../src/AppleLogin2";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AppleLogin2",
  testId:"testId",
  buttonTitle: ButtonTitles.signIn,
  callback: jest.fn(),
  onPress: jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/AppleLogin2-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AppleLogin2", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AppleLogin2;

    given("I am a User loading AppleLogin2", () => {
      exampleBlockA = shallow(<AppleLogin2 {...screenProps} />);
    });

    when("I navigate to the AppleLogin2", () => {
      instance = exampleBlockA.instance() as AppleLogin2;
    });

    then("AppleLogin2 will load with out errors", () => {
      instance.render();
    });

    then("I can enter text with out errors", () => {
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
    });
  });
});

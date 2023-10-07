import React from "react";

// Customizable Area Start
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// Merge Engine - import assets - Start
import {icAppleIconBlack } from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

export enum ButtonTitles {
  signIn = "Sign in with Apple",
  signUp = "Sign up with Apple",
  continue = "Continue with Apple",
}
// Customizable Area End

import AppleLogin2Controller, {
  Props,
} from "./AppleLogin2Controller";

export default class AppleLogin2 extends AppleLogin2Controller {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    console.disableYellowBox = true;
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <TouchableOpacity
        testID="mainContainerTouch"
        onPress={this.handleSignInWithApple}
      >
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <View style={styles.buttonView}>
            <Image
              source={icAppleIconBlack}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>
              {this.props.buttonTitle ?? ButtonTitles.signIn}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: "#fff",
    height: 52,
    marginTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonImage: {
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 5,
    color: "#000",
    textAlign: "center",
  },
});
// Customizable Area End
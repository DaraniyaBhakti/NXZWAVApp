import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

import { COLORS, FONTS } from "../../../components/src/AppGlobals";
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import WalletSentMessageController, {
  Props,
} from "./WalletSentMessageController";
import FastImage from "react-native-fast-image";

export default class WalletSentMessage extends WalletSentMessageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewDetail}>
          <FastImage source={{ uri: this.state.userImage ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
            style={[styles.imgProfile]} />
          <Text style={styles.textUserName}>@{this.state.userName}</Text>
          <Text style={styles.textSentLabel}>You Sent</Text>
          <Text style={styles.textAmount}>{this.state.amount.toLocaleString("en-US")}</Text>
          <View style={styles.viewPointType}>
            <Image source={this.state.pointImage} style={styles.imgPayReceive} />
            <Text style={styles.textPointType}>${this.state.pointType}</Text>
          </View>
        </View>
        <TouchableOpacity testID="btnBack" onPress={() => this.goBack()}>
          <Text style={styles.textBack}>BACK TO WALLET</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground,
  },
  imgProfile: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'grey',
    height: 110,
    width: 110,
    alignSelf: 'center'
  },
  imgPayReceive: {
    height: 40,
    width: 40,
    marginRight: 10
  },
  viewDetail: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center",
    alignSelf: 'center'
  },
  textUserName: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
  textSentLabel: {
    color: COLORS.textColorBlue,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  },
  textAmount: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 35,
    textAlign: 'center',
    marginTop: 5
  },
  viewPointType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 10
  },
  textPointType: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center'
  },
  textBack: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  }
});
// Customizable Area End
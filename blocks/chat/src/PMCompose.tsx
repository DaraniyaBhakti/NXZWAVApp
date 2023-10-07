import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";

import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgPlusIcon } from "./assets";
import FastImage from "react-native-fast-image";
// Customizable Area End

import PMComposeController, { Props, configJSON, } from "./PMComposeController";

export default class PMCompose extends PMComposeController {
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
      <>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            testID={"hideKeyboard"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <>
              <Text style={styles.textHeading}>Send PM</Text>
              <View style={styles.viewImage}>
                {this.state.imgData.uri !== "" ?
                  <FastImage source={{ uri: this.state.imgData.uri }}
                    style={styles.imgUpload} >
                    <TouchableOpacity
                      testID="btnImgUpload"
                      onPress={() => this.selectFile()}
                      style={styles.viewUploadPlusImg} >
                      <Image source={imgPlusIcon} style={styles.imagePlus} />
                    </TouchableOpacity>
                  </FastImage>
                  :
                  <>
                    <TouchableOpacity
                      testID="btnImgUpload"
                      onPress={() => this.selectFile()}
                      style={styles.viewPlusImg}>
                      <Image source={imgPlusIcon} style={styles.imagePlus} />
                    </TouchableOpacity>
                    <View style={styles.viewUploadText}>
                      <Text style={styles.textUpload}>Upload Image</Text>
                      <Text style={styles.textOptional}>(Optional)</Text>
                    </View>
                  </>
                }
              </View>
              <Text style={styles.textFieldHeading}>Message</Text>
              <TextInput
                testID="textInputMessage"
                style={styles.textInputMessage}
                value={this.state.message}
                onChangeText={(text) => this.setMessage(text)}
                placeholder="Enter Message Here" />
              <Text style={styles.textFieldHeading}>Unlock Fee</Text>
              <Text style={styles.textDesc}>Select amount of points needed to unlock this message.</Text>

              <View style={styles.viewAmountShortcut}>
                <TouchableOpacity
                  onPress={() => this.option50Selected()} testID="btnOption50"
                  style={this.state.is50PointsSelected ? styles.touchableShortcutSelected
                    : styles.touchableShortcut}>
                  {this.state.is50PointsSelected &&
                    <View style={styles.viewRedColumn}></View>
                  }
                  <View style={styles.viewShortcutText}>
                    <Text style={styles.textNumber}>{configJSON.label50}</Text>
                    <Text style={styles.textPts}>{configJSON.labelPts}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.option100Selected()} testID="btnOption100"
                  style={this.state.is100PointsSelected ? [{ marginHorizontal: 10 }, styles.touchableShortcutSelected]
                    : [{ marginHorizontal: 10, }, styles.touchableShortcut]}>
                  {this.state.is100PointsSelected && <
                    View style={styles.viewRedColumn}></View>
                  }
                  <View style={styles.viewShortcutText}>
                    <Text style={styles.textNumber}>{configJSON.label100}</Text>
                    <Text style={styles.textPts}> {configJSON.labelPts}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.option250Selected()} testID="btnOption250"
                  style={this.state.is250PointsSelected ? styles.touchableShortcutSelected
                    : styles.touchableShortcut}>
                  {this.state.is250PointsSelected &&
                    <View style={styles.viewRedColumn}></View>
                  }
                  <View style={styles.viewShortcutText}>
                    <Text style={styles.textNumber}>{configJSON.label250}</Text>
                    <Text style={styles.textPts}> {configJSON.labelPts}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity testID="btnPmCompose"
                onPress={() => this.createPMCompose()}
                style={styles.touchableUploadBtn}>
                <Text style={styles.textuploadBtn}>SEND</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="btnCancel"
                onPress={() => { this.props.navigation.navigate("PmChatView", { receiverUser: this.state.receiverUserData }) }}
              >
                <Text style={styles.textCancelBtn}>Cancel</Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
          {this.state.isLoading &&
            <View style={[styles.container]}>
              <ActivityIndicator />
            </View>
          }
        </SafeAreaView>
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground,
  },
  textHeading: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,

  },
  viewImage: {
    width: '50%',
    height: 200,
    backgroundColor: "#141414",
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFieldHeading: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 22,
    marginLeft: 16,
    marginBottom: 10
  },
  textInputMessage: {
    backgroundColor: '#141414',
    height: 100,
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.bold,
    marginBottom: 30,
    color: COLORS.textColor
  },
  textDesc: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginLeft: 16,
    width: '60%',
    marginBottom: 10
  },
  viewAmountShortcut: {
    flexDirection: 'row'
  },
  touchableShortcutSelected: {
    flexDirection: 'row',
    borderColor: "#141414",
    borderWidth: 1,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1
  },
  touchableShortcut: {
    flexDirection: 'row',
    backgroundColor: "#141414",
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  viewRedColumn: {
    width: 10,
    backgroundColor: 'red',
    height: '75%',
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: 10,
    flex: 0.1
  },
  viewShortcutText: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textNumber: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.textColor,
    fontFamily: FONTS.bold
  },
  textPts: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "red",
    fontFamily: FONTS.bold
  },
  viewPlusImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 45,
    backgroundColor: 'red',
  },
  imagePlus: {
    height: 25,
    width: 25,
  },
  imgUpload: {
    width: "100%",
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewUploadPlusImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 45,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textUpload: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.textColorBlue,
  },
  textOptional: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.textColor,
  },
  viewUploadText: {
    marginTop: 30
  },
  touchableUploadBtn: {
    backgroundColor: "#FF0A10",
    padding: 15,
    width: "80%",
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 30
  },
  textuploadBtn: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center'
  },
  textCancelBtn: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  }
});
// Customizable Area End

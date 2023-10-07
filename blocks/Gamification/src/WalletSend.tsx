import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgBackSpaceIcon, imgDownArrow, imgSearchUser } from "./assets";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from "react-native-material-dropdown"
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import WalletSendController, {
  Props,
} from "./WalletSendController";
import FastImage from "react-native-fast-image";

export default class WalletSend extends WalletSendController {
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
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <>
              <LinearGradient colors={['#1d1d1d', 'transparent']}>
                <View style={styles.headerView}>
                  <View style={[styles.viewSendPoint]}>

                    <View style={styles.viewSendPointText}>
                      <Image source={this.state.payImage} style={styles.imgSendPoint} />
                      <View style={styles.viewSendOption}>
                        <Text style={styles.textSendPoint}>Send:</Text>
                        <Dropdown
                          testID="typeDropDown"
                          data={this.dropdownItems}
                          value={this.state.paySelectedValue}
                          onChangeText={this.handlePayDropdownSelect}
                          textColor={COLORS.textColor}
                          itemColor={COLORS.textColor}
                          baseColor={COLORS.textColor}
                          selectedItemColor={COLORS.textColorBlue}
                          fontSize={15}
                          itemTextStyle={styles.itemText}
                          labelTextStyle={styles.labelText}
                          itemPadding={5}
                          dropdownOffset={{ top: 0, left: 0 }}
                          dropdownPosition={0}
                          pickerStyle={styles.userPickerStyle}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.textLeft}>{this.state.payLimit.toLocaleString("en-US")}<Text style={styles.textColorBlue}> MAX</Text></Text>
                    </View>
                  </View>

                  <View style={[styles.viewSendPoint]}>
                    <View style={styles.viewSendPointText}>{
                      this.state.userData.attributes.profile_pic !== "" ?
                        <FastImage source={{ uri: this.state.userData.attributes.profile_pic ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                          style={[styles.imgSendPoint, styles.imgUserProfile]} />
                        :
                        <Image source={imgSearchUser} style={styles.imgSendPoint} />
                    }
                      <View>
                        <Text style={styles.textSendPoint}>To:</Text>
                        <TouchableOpacity testID="searchUserBtn" style={styles.touchableUser}
                          onPress={() => this.searchUserClick()}>
                          <Text style={styles.textUser}>{this.state.userData.attributes.user_name !== "" ? this.state.userData.attributes.user_name : "Search User"}</Text>
                          <Image source={imgDownArrow} style={styles.imgDownArrow} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>


                <View style={styles.viewSendDesc}>
                  <Text style={styles.textSendConversion}>{this.state.payAmount === '' ? '0' : this.state.payAmount}</Text>
                  <Text style={styles.textSendFee}>Send Fee = $5</Text>
                </View>

                <View style={styles.viewSendKeyPad}>
                  <View style={styles.viewKeyPadRowSend}>
                    <TouchableOpacity onPress={() => this.addAmount("1")} testID="btnNumber1" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("2")} testID="btnNumber2" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("3")} testID="btnNumber3" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>3</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewKeyPadRowSend}>
                    <TouchableOpacity onPress={() => this.addAmount("4")} testID="btnNumber4" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("5")} testID="btnNumber5" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("6")} testID="btnNumber6" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>6</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewKeyPadRowSend}>
                    <TouchableOpacity onPress={() => this.addAmount("7")} testID="btnNumber7" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("8")} testID="btnNumber8" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("9")} testID="btnNumber9" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>9</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewKeyPadRowSend}>
                    <TouchableOpacity onPress={() => this.addAmount(".")} testID="btnNumberDot" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addAmount("0")} testID="btnNumber0" style={styles.flex1}>
                      <Text style={styles.textKeyPad}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.backSpaceClicked()} testID="btnBackSpace"
                      style={styles.touchableBackspaceSend}>
                      <Image source={imgBackSpaceIcon} style={styles.imgBackSpace} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity testID="btnSend" style={styles.touchableSend} onPress={() => this.sendWalletPoints()}>
                  <Text style={styles.textSend}>SEND</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goBack()} testID="btnCancel">
                  <Text style={styles.textCancelSend}>{this.state.userData.id !== "" ? "BACK" : "CANCEL"}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </>

          </View>

        </ScrollView>
      </View>
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
  headerView: {
    marginTop: 60,
    marginHorizontal: 15,
  },
  viewSendPoint: {
    marginTop: 15,
    backgroundColor: COLORS.windowBackground,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewSendPointText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgSendPoint: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  textSendPoint: {
    fontSize: 18,
    color: COLORS.textColorBlue,
    fontFamily: FONTS.bold
  },
  touchableUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    width: '100%'
  },
  textUser: {
    fontSize: 18,
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold
  },
  imgDownArrow: {
    height: 15,
    width: 15,
    marginLeft: 10
  },
  textLeft: {
    color: COLORS.textColor,
    textAlign: 'right',
    fontFamily: FONTS.bold,
    fontSize: 12
  },
  textColorBlue: {
    color: COLORS.textColorBlue
  },
  viewSendDesc: {
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },
  textSendFee: {
    color: COLORS.textColorBlue,
    fontFamily: FONTS.bold,
    fontSize: 18
  },
  textSendConversion: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 35,
    marginBottom: 20
  },
  viewSendKeyPad: {
    marginTop: 40
  },
  viewKeyPadRowSend: {
    flexDirection: 'row',
    marginVertical: 18
  },
  flex1: {
    flex: 1
  },
  textKeyPad: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    color: COLORS.textColor,
    fontWeight: "bold"
  },
  touchableBackspaceSend: {
    flex: 1,
    justifyContent: 'center'
  },
  imgBackSpace: {
    height: 25,
    width: 25,
    alignSelf: 'center'
  },
  touchableSend: {
    backgroundColor: "#FF0A10",
    padding: 15,
    width: "80%",
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 20
  },
  textSend: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center'
  },
  textCancelSend: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  userPickerStyle: {
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#ffffff',
    shadowOpacity: 0.2,
    elevation: 50
  },
  labelText: {
    fontFamily: FONTS.bold
  },
  itemText: {
    fontFamily: FONTS.medium,
    fontSize: 15
  },
  viewSendOption: {
    width: '40%',
    justifyContent: 'center'
  },
  imgUserProfile: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#1d1d1d'
  }
});
// Customizable Area End
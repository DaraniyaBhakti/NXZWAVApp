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
import { imgBackSpaceIcon, imgSwitchWallet } from "./assets";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from "react-native-material-dropdown"

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import WalletSwitchController, {
  Props,
} from "./WalletSwitchController";

export default class WalletSwitch extends WalletSwitchController {
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
            <LinearGradient colors={['#1d1d1d', 'transparent']}>
              <View style={styles.headerView}>
                <View style={[styles.viewPayReceive, { paddingBottom: 40, paddingTop: 25 }]}>

                  <View style={styles.viewPayReceiveText}>
                    <Image source={this.state.payImage} style={styles.imgPayReceive} />
                    <View style={{ width: '40%', justifyContent: 'center' }}>
                      <Text style={styles.textPayReceive}>Pay</Text>
                      <Dropdown
                        testID="payTypeDropDown"
                        data={this.dropdownItems}
                        value={this.state.paySelectedValue}
                        onChangeText={this.handlePayDropdownSelect}
                        textColor={COLORS.textColor}
                        itemColor={COLORS.textColor}
                        baseColor={COLORS.textColor}
                        selectedItemColor={COLORS.textColorBlue}
                        fontSize={15}
                        itemTextStyle={{ fontFamily: FONTS.medium, fontSize: 15 }}
                        labelTextStyle={{ fontFamily: FONTS.bold }}
                        itemPadding={5}
                        dropdownOffset={{ top: 0, left: 0 }}
                        dropdownPosition={0}
                        pickerStyle={{ marginTop: 20, backgroundColor: '#000000', borderRadius: 20, borderWidth: 2, borderColor: '#ffffff', shadowOffset: { width: 5, height: 5 }, shadowColor: '#ffffff', shadowOpacity: 0.2, elevation: 50 }}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textLeft}>{this.state.payAmount === '' ? ' max:' : 'left:'}<Text style={styles.textColorBlue}>{this.state.payLimit.toLocaleString("en-US")}</Text></Text>
                    <TouchableOpacity testID="payAmount" onPress={() => this.setPayAmount()}>
                      <Text style={styles.textAmount}>{this.state.payAmount === '' ? 'Amount' : this.state.payAmount}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.viewPayReceive, { paddingTop: 40, paddingBottom: 25 }]}>
                  <View style={styles.viewPayReceiveText}>
                    <Image source={this.state.receiveImage} style={styles.imgPayReceive} />
                    <View style={{ width: '40%', justifyContent: 'center' }}>
                      <Text style={styles.textPayReceive}>Receive</Text>
                      <Dropdown
                        testID="receiveTypeDropDown"
                        data={this.dropdownItems}
                        value={this.state.receiveSelectedValue}
                        onChangeText={this.handleReceiveDropdownSelect}
                        textColor={COLORS.textColor}
                        itemColor={COLORS.textColor}
                        baseColor={COLORS.textColor}
                        selectedItemColor={COLORS.textColorBlue}
                        fontSize={15}
                        itemTextStyle={{ fontFamily: FONTS.medium, fontSize: 15 }}
                        labelTextStyle={{ fontFamily: FONTS.bold }}
                        itemPadding={5}
                        dropdownOffset={{ top: 0, left: 0 }}
                        dropdownPosition={0}
                        pickerStyle={{ marginTop: 20, backgroundColor: 'black', borderRadius: 20, borderWidth: 2, borderColor: 'white', shadowOffset: { width: 5, height: 5 }, shadowColor: '#ffffff', shadowOpacity: 0.2, elevation: 50 }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity testID="receiveAmount" onPress={() => this.setReceiveAmount()}>
                    <Text style={styles.textAmount}>{this.state.receivedAmount === '' ? 'Amount' : this.state.receivedAmount}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.viewImgSwitch}>
                  <Image source={imgSwitchWallet} style={styles.imgSwitch} />
                </View>
              </View>
              <Text style={styles.textRateHeading}>Switch Rate:</Text>

              <View style={styles.viewSwitchDesc}>
                <Text style={styles.textSwitchConversion}>100<Text style={styles.textColorBlue}> $Clout</Text> = 1<Text style={styles.textColorBlue}> $Push</Text></Text>
                <Text style={styles.textFee}>Switch Fee = $50</Text>
              </View>

              <View style={styles.viewKeyPad}>
                <View style={styles.viewKeypadRow}>
                  <TouchableOpacity onPress={() => this.addAmount("1")} testID="btnDigit1" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("2")} testID="btnDigit2" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("3")} testID="btnDigit3" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>3</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewKeypadRow}>
                  <TouchableOpacity onPress={() => this.addAmount("4")} testID="btnDigit4" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("5")} testID="btnDigit5" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("6")} testID="btnDigit6" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>6</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewKeypadRow}>
                  <TouchableOpacity onPress={() => this.addAmount("7")} testID="btnDigit7" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("8")} testID="btnDigit8" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("9")} testID="btnDigit9" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewKeypadRow}>
                  <TouchableOpacity onPress={() => this.addAmount(".")} testID="btnDigitDot" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.addAmount("0")} testID="btnDigit0" style={styles.flex1}>
                    <Text style={styles.textKeyPad}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.backSpaceClicked()} testID="btnBackSpace"
                    style={styles.touchableBackspace}>
                    <Image source={imgBackSpaceIcon} style={styles.imgBackSpace} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity testID="btnSwitch" style={styles.touchableSwitch} onPress={() => this.swicthWalletPoints()}>
                <Text style={styles.textSwitch}>SWITCH</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigateToGamification()} testID="btnCancel">
                <Text style={styles.textCancel}>CANCEL</Text>
              </TouchableOpacity>
            </LinearGradient>
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
  viewPayReceive: {
    marginTop: 15,
    backgroundColor: COLORS.windowBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewPayReceiveText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgPayReceive: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  textPayReceive: {
    fontSize: 18,
    color: COLORS.textColorBlue,
    fontFamily: FONTS.bold
  },
  touchableSwitchType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  textSwitchType: {
    fontSize: 20,
    color: COLORS.textColor,
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
  textAmount: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: 10,
    textAlign: 'right'
  },
  viewImgSwitch: {
    position: 'absolute',
    alignSelf: 'center',
    top: 120,
    padding: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgSwitch: {
    height: 26,
    width: 26
  },
  textRateHeading: {
    marginHorizontal: 15,
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    marginTop: 10,
    fontSize: 15
  },
  viewSwitchDesc: {
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  textFee: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 18
  },
  textSwitchConversion: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 15
  },
  viewKeyPad: {
    marginTop: 40
  },
  viewKeypadRow: {
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
  touchableBackspace: {
    flex: 1,
    justifyContent: 'center'
  },
  imgBackSpace: {
    height: 25,
    width: 25,
    alignSelf: 'center'
  },
  touchableSwitch: {
    backgroundColor: "#FF0A10",
    padding: 15,
    width: "80%",
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 20
  },
  textSwitch: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center'
  },
  textCancel: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  }
});
// Customizable Area End
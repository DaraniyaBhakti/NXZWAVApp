import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import GamificationController, {
  Props,
} from "./GamificationController";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgBackSpaceIcon } from "./assets";
import { configJSON } from './GamificationController';

export default class Gamification extends GamificationController {
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
        <ScrollView>
          <View>
            <View style={styles.viewContainer}>
              <Text style={styles.textHeading}>{configJSON.labelUnlockAmount}</Text>
              <Text style={styles.textDesc}>{configJSON.labelDescription}</Text>
            </View>
            <Text style={styles.textAmount}>{this.state.unlockAmount}</Text>
            <View style={styles.flexDirectionRow}>
              <TouchableOpacity onPress={() => this.option50Selected()} testID="btnOption50"
                style={this.state.is50PointsSelected ? styles.touchableOptionSelected : styles.touchableOption}>
                {this.state.is50PointsSelected &&
                  <View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewTextPoint}>
                  <Text style={styles.textPoint}>50</Text>
                  <Text style={styles.textLabelPts}>{configJSON.labelPts}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.option100Selected()} testID="btnOption100"
                style={this.state.is100PointsSelected ? [{ marginHorizontal: 10, }, styles.touchableOptionSelected]
                  : [{ marginHorizontal: 10 }, styles.touchableOption]}>
                {this.state.is100PointsSelected && <View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewTextPoint}>
                  <Text style={styles.textPoint}>100</Text>
                  <Text style={styles.textLabelPts}>{configJSON.labelPts}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.option250Selected()} testID="btnOption250"
                style={this.state.is250PointsSelected ? styles.touchableOptionSelected : styles.touchableOption}>
                {this.state.is250PointsSelected &&
                  <View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewTextPoint}>
                  <Text style={styles.textPoint}>250</Text>
                  <Text style={styles.textLabelPts}>{configJSON.labelPts}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.marginTop30}>
              <View style={styles.viewNumberRow}>
                <TouchableOpacity onPress={() => this.addAmount("1")} testID="btnDigit1" style={styles.flex1}>
                  <Text style={styles.textNumber}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("2")} testID="btnDigit2" style={styles.flex1}>
                  <Text style={styles.textNumber}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("3")} testID="btnDigit3" style={styles.flex1}>
                  <Text style={styles.textNumber}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewNumberRow}>
                <TouchableOpacity onPress={() => this.addAmount("4")} testID="btnDigit4" style={styles.flex1}>
                  <Text style={styles.textNumber}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("5")} testID="btnDigit5" style={styles.flex1}>
                  <Text style={styles.textNumber}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("6")} testID="btnDigit6" style={styles.flex1}>
                  <Text style={styles.textNumber}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewNumberRow}>
                <TouchableOpacity onPress={() => this.addAmount("7")} testID="btnDigit7" style={styles.flex1}>
                  <Text style={styles.textNumber}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("8")} testID="btnDigit8" style={styles.flex1}>
                  <Text style={styles.textNumber}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("9")} testID="btnDigit9" style={styles.flex1}>
                  <Text style={styles.textNumber}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewNumberRow}>
                <TouchableOpacity onPress={() => this.addAmount(".")} testID="btnDigitDot" style={styles.flex1}>
                  <Text style={styles.textNumber}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addAmount("0")} testID="btnDigit0" style={styles.flex1}>
                  <Text style={styles.textNumber}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.backSpaceClicked()} testID="btnBackSpace"
                  style={styles.touchableBackSpace}>
                  <Image source={imgBackSpaceIcon} style={styles.imgBackSpace} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => this.updateAmount()} testID="btnSetAmount" style={styles.touchableSetAmount}>
              <Text style={styles.textSetAmount}>{configJSON.labelSetAmount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToPostCreation()} testID="btnBack">
              <Text style={styles.textBack}>{configJSON.labelBack}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground,
  },
  viewContainer: {
    height: '15%',
    width: '60%',
    alignSelf: 'center'
  },
  textHeading: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    color: COLORS.textColor,
    fontWeight: "bold",
    marginTop: 30
  },
  textDesc: {
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.textColorOffWhite,
    marginTop: 15
  },
  textAmount: {
    fontSize: 50,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    color: COLORS.textColorOffWhite,
    fontWeight: "bold",
    marginVertical: 30,
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  touchableOptionSelected: {
    flexDirection: 'row',
    borderColor: "#141414",
    borderWidth: 1,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1
  },
  touchableOption: {
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
  viewTextPoint: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textPoint: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.textColor,
    fontFamily: FONTS.bold
  },
  textLabelPts: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "red",
    fontFamily: FONTS.bold
  },
  marginTop30: {
    marginTop: 30
  },
  viewNumberRow: {
    flexDirection: 'row',
    marginVertical: 18
  },
  flex1: {
    flex: 1
  },
  textNumber: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    color: COLORS.textColor,
    fontWeight: "bold",
  },
  touchableBackSpace: {
    flex: 1,
    justifyContent: 'center'
  },
  imgBackSpace: {
    height: 25,
    width: 25,
    alignSelf: 'center'
  },
  touchableSetAmount: {
    backgroundColor: "#FF0A10",
    padding: 15,
    width: "80%",
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20
  },
  textSetAmount: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center'
  },
  textBack: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  }
});
// Customizable Area End
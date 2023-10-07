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
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgActivity, imgAssets, imgBlast, imgPush, imgPin, imgPromotion, imgReceive, imgSend, imgSwitch, imgTransaction, imgWatcher } from "./assets";
import LinearGradient from "react-native-linear-gradient";
import Watchers from "./components/Watchers";
import Transactions from "./components/Transactions";
import Assets from "./components/Assets";
import Activity from "./components/Activity";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import GamifiedWalletController, {
  Props, configJSON
} from "./GamifiedWalletController";

export default class GamifiedWallet extends GamifiedWalletController {
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
        <>
          <LinearGradient colors={['transparent', 'blue']} style={styles.linearGradient}>
            <Text style={styles.textClout}>Clout Balance</Text>
            <Text style={styles.textBalanceValue}>{this.state.assetCategories.attributes.clout_changes.clout_ballence}<Text style={styles.textPts}> pts</Text></Text>

            <View style={styles.viewFourBtn}>
              <View>
                <TouchableOpacity testID="btnSend" onPress={() => this.navigateScreen('WalletSend')}>
                  <Image source={imgSend} style={styles.imgBtnOption} />
                </TouchableOpacity>
                <Text style={styles.textBtnOption}>Send</Text>
              </View>
              <View>
                <TouchableOpacity testID="btnReceive">
                  <Image source={imgReceive} style={styles.imgBtnOption} />
                </TouchableOpacity>
                <Text style={styles.textBtnOption}>Receive</Text>
              </View>
              <View>
                <TouchableOpacity testID="btnSwitch" onPress={() => this.navigateScreen('WalletSwitch')}>
                  <Image source={imgSwitch} style={styles.imgBtnOption} />
                </TouchableOpacity>
                <Text style={styles.textBtnOption}>Switch</Text>
              </View>
              <View>
                <TouchableOpacity testID="btnPush">
                  <Image source={imgPromotion} style={styles.imgBtnOption} />
                </TouchableOpacity>
                <Text style={styles.textBtnOption}>Push</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.viewSlider}>

            <ScrollView snapToEnd={true} horizontal={true} showsHorizontalScrollIndicator={false}>

              <View style={styles.viewSliderInner}>

                <TouchableOpacity testID="btnBuyPush" onPress={() => this.navigateBuyScreen('Push')}
                  style={[styles.touchableItem, { marginLeft: 10 }]}>
                  <View>
                    <Text style={styles.textBuyBlue}>Buy</Text>
                    <Text style={styles.textHeading}>$PUSH</Text>
                  </View>
                  <Image source={imgPush} style={styles.imgSlider} />
                </TouchableOpacity>

                <TouchableOpacity testID="btnBuyPin" onPress={() => this.navigateBuyScreen('Pins')}
                  style={[styles.touchableItem, { marginHorizontal: 10 }]}>
                  <View>
                    <Text style={styles.textBuyRed}>Buy</Text>
                    <Text style={styles.textHeading}>$PINS</Text>
                  </View>
                  <Image source={imgPin} style={styles.imgSlider} />
                </TouchableOpacity>

                <TouchableOpacity testID="btnBuyBlast" onPress={() => this.navigateBuyScreen('Blast')}
                  style={[styles.touchableItem, { marginRight: 10 }]}>
                  <View>
                    <Text style={styles.textBuyYellow}>Buy</Text>
                    <Text style={styles.textHeading}>$BLAST</Text>
                  </View>
                  <Image source={imgBlast} style={styles.imgSlider} />
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>

          <View style={styles.viewListOption}>
            <TouchableOpacity testID="btnAsset" onPress={() => this.selectListOption(configJSON.labelAsset)}
              style={[{ backgroundColor: this.state.selectedListOption === configJSON.labelAsset ? 'red' : '#1d1d1d' }, styles.touchableListOption]}>
              <Image source={imgAssets} style={styles.imgListOption} />
            </TouchableOpacity>
            <TouchableOpacity testID="btnActivity" onPress={() => this.selectListOption(configJSON.labelActivity)}
              style={[{ backgroundColor: this.state.selectedListOption === configJSON.labelActivity ? 'red' : '#1d1d1d' }, styles.touchableListOption]}>
              <Image source={imgActivity} style={styles.imgListOption} />
            </TouchableOpacity>
            <TouchableOpacity testID="btnWatcher" onPress={() => this.selectListOption(configJSON.labelWatcher)}
              style={[{ backgroundColor: this.state.selectedListOption === configJSON.labelWatcher ? 'red' : '#1d1d1d' }, styles.touchableListOption]}>
              <Image source={imgWatcher} style={styles.imgListOption} />
            </TouchableOpacity>
            <TouchableOpacity testID="btnTransaction" onPress={() => this.selectListOption(configJSON.labelTransaction)}
              style={[{ backgroundColor: this.state.selectedListOption === configJSON.labelTransaction ? 'red' : '#1d1d1d' }, styles.touchableListOption]}>
              <Image source={imgTransaction} style={styles.imgListOption} />
            </TouchableOpacity>
          </View>

          {this.state.assetCategories.id !== "" &&
            <>
              {(this.state.selectedListOption === configJSON.labelAsset) && <Assets assetCategories={this.state.assetCategories} />}
              {(this.state.selectedListOption === configJSON.labelActivity) && <Activity activityFeeds={this.state.activityFeeds} />}
              {(this.state.selectedListOption === configJSON.labelWatcher) && <Watchers watchers={this.state.watchers} />}
              {(this.state.selectedListOption === configJSON.labelTransaction) && <Transactions transactions={this.state.transactions} />}
            </>
          }
          {this.state.loader &&
            <View style={[styles.container]}>
              <ActivityIndicator />
            </View>
          }
        </>

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
  textClout: {
    marginLeft: 30,
    marginTop: 25,
    fontSize: 17,
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.semiBold
  },
  textBalanceValue: {
    marginLeft: 30,
    marginTop: 10,
    fontSize: 32,
    color: COLORS.textColor,
    fontFamily: FONTS.bold
  },
  textPts: {
    color: COLORS.textColorOffWhite,
    fontSize: 22,
    fontFamily: FONTS.bold
  },
  viewFourBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 100
  },
  imgBtnOption: {
    height: 55,
    width: 55
  },
  textBtnOption: {
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15
  },
  linearGradient: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  viewListOption: {
    backgroundColor: '#1d1d1d',
    width: '60%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 70,
    marginHorizontal: 10
  },
  imgListOption: {
    height: 22,
    width: 22,
    marginHorizontal: 20,
    marginVertical: 10
  },
  touchableListOption: {
    borderRadius: 20
  },
  viewSlider: {
    position: 'absolute',
    top: 300,
  },
  viewSliderInner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  touchableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.windowBackground,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    height: 120,
  },
  textBuyBlue: {
    color: COLORS.textColorBlue,
    fontSize: 22
  },
  textBuyRed: {
    color: 'red',
    fontSize: 22
  },
  textBuyYellow: {
    color: 'yellow',
    fontSize: 22
  },
  textHeading: {
    color: COLORS.textColor,
    fontSize: 25
  },
  imgSlider: {
    height: 53,
    width: 53,
    marginLeft: 70
  }
});
// Customizable Area End
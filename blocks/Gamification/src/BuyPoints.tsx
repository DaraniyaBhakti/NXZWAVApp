import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import BuyPointsController, {
  Props, configJSON,
} from "./BuyPointsController";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgBackArrow, imgBackground } from "./assets";
import LinearGradient from "react-native-linear-gradient";

export default class BuyPoints extends BuyPointsController {
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
        <ScrollView>
          <ImageBackground source={imgBackground} style={styles.imgBackgroud}>
            <LinearGradient colors={['transparent', 'black']} style={styles.linearGradient}>
              <TouchableOpacity testID="btnBack" onPress={() => this.props.navigation.goBack()}>
                <Image source={imgBackArrow} style={styles.imgBackArrow} />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.viewList}>

            <TouchableOpacity testID="btnOption100" onPress={() => this.setSelectedOption(configJSON.label100)}
              style={[styles.touchableItem, { borderColor: this.state.listOptionSelected === configJSON.label100 ? 'white' : '#1d1d1d' }]}>
              <View>
                <Text style={styles.textAmount}>1K<Text style={styles.textPush}> {this.state.screenType}</Text></Text>
                <Text style={styles.textDesc}>4K+ Engagements</Text>
              </View>
              <View style={[{ backgroundColor: this.state.listOptionSelected === configJSON.label100 ? 'red' : '#1d1d1d' }, styles.viewBtn]}>
                <Text style={styles.textBtn}>$100</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity testID="btnOption1k" onPress={() => this.setSelectedOption(configJSON.label1k)}
              style={[{ borderColor: this.state.listOptionSelected === configJSON.label1k ? 'white' : '#1d1d1d', marginVertical: 15 }, styles.touchableItem]}>
              <View>
                <Text style={styles.textAmount}>10K <Text style={styles.textPush}> {this.state.screenType}</Text></Text>
                <Text style={styles.textDesc}>40K+ Engagements</Text>
              </View>
              <View style={[{ backgroundColor: this.state.listOptionSelected === configJSON.label1k ? 'red' : '#1d1d1d' }, styles.viewBtn]}>
                <Text style={styles.textBtn}>$1K</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity testID="btnOption5k" onPress={() => this.setSelectedOption(configJSON.label5k)}
              style={[{ borderColor: this.state.listOptionSelected === configJSON.label5k ? 'white' : '#1d1d1d' }, styles.touchableItem]}>
              <View>
                <Text style={styles.textAmount}>100K <Text style={styles.textPush}> {this.state.screenType}</Text></Text>
                <Text style={styles.textDesc}>400K+ Engagements</Text>
              </View>
              <View style={[{ backgroundColor: this.state.listOptionSelected === configJSON.label5k ? 'red' : '#1d1d1d' }, styles.viewBtn]}>
                <Text style={styles.textBtn}>$5K</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity testID="btnPay" style={styles.viewPayBtn}>
              <Text style={styles.textPay}>PAY</Text>
            </TouchableOpacity>
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
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground,
  },
  imgBackgroud: {
    width: '100%',
    height: 500,
  },
  linearGradient: {
    flex: 1
  },
  imgBackArrow: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 60,
    left: 30
  },
  viewList: {
    position: 'absolute',
    top: 400,
    width: '100%'
  },
  touchableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.windowBackground,
    borderRadius: 20,
    borderWidth: 4,
    height: 110,
    width: '100%',
    padding: 15
  },
  textAmount: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 22
  },
  textPush: {
    color: COLORS.textColorBlue
  },
  textDesc: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    marginTop: 10
  },
  viewBtn: {
    borderRadius: 20,
    paddingHorizontal: 45,
    paddingVertical: 9
  },
  textBtn: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20
  },
  viewPayBtn: {
    backgroundColor: 'red',
    width: '85%',
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
    marginTop: 30
  },
  textPay: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    fontSize: 24
  }
});
// Customizable Area End
// Customizable Area Start
import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import { StatusBarHeight } from "../../../framework/src/BlockHelper";

export const dimension = {
  commentUsername: 13,
  commentText: 13,
  bulletText: 8,
  defaultText:13,
  chatSearchUserImage:35
}

const globalStyles = StyleSheet.create({
  defaultButtonView: {
    backgroundColor: COLORS.grey,
    height: normalize(50),
    marginTop: normalize(25),
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: normalize(30),
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultButtonViewRed: {
    backgroundColor: COLORS.redActive,
  },
  defaultButtonViewBlue: {
    backgroundColor: COLORS.blue,
  },
  buttonViewRed: {
    backgroundColor: COLORS.redActive,
    width: "40%",
    marginLeft: "5%",
    marginRight: "4%",
  },
  buttonViewGrey: {
    backgroundColor: COLORS.grey,
    width: "40%",
    marginLeft: "4%",
    marginRight: "8%",
  },
  buttonText: {
    fontSize: normalize(18),
    color: COLORS.textColor,
    textAlign: "center",
    fontFamily: FONTS.bold,
  },
  flex1: {
    flex: 1,
  },
  flexDirectionColumn: {
    flexDirection: "column",
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: normalize(13),
    color: COLORS.textColorOffWhite,
    textAlign: "center",
    fontFamily: FONTS.bold,
  },
  labelTextBlue: {
    color: COLORS.textColorBlue,
  },
  labelTextOffWhite: {
    color: COLORS.textColorOffWhite,
  },
  labelTextWhite: {
    color: COLORS.textColor,
  },
  labelTextMedium: {
    fontSize: normalize(12),
    color: COLORS.textColor,
    textAlign: "center",
    fontFamily: FONTS.semiBold,
  },
  labelTextSmall: {
    fontSize: normalize(10),
    color: COLORS.textColor,
    textAlign: "center",
    fontFamily: FONTS.semiBold,
  },
  viewWindow:{
    width:'100%',
    height:Dimensions.get('window').height,
    flex:1,
    paddingTop:StatusBarHeight,
    paddingBottom:normalize(25),
    paddingLeft:normalize(10),
    paddingRight:normalize(10),
  },
  viewWindowNoHeight: {
    width: "100%",
    flex: 1,
    paddingTop: StatusBarHeight,
  },
  headerRow:{
    height:StatusBarHeight,
    marginTop:normalize(15)
  },
  headerTextView: {
    width: '100%',
    height:'100%',
    justifyContent:'center',
    paddingRight:normalize(40),
    paddingLeft:normalize(5),
  },
  headerText: {
    justifyContent:'center',
    textAlign:'center',
    fontSize: normalize(13),
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
  },
  headerImage: {
    width: normalize(30),
    height: normalize(30),
    padding: normalize(8),
  },
  apiMessage: {
    marginTop: normalize(20),
    marginBottom: normalize(10),
    fontSize: normalize(16),
    textAlign:'center',
    marginVertical: 8,
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.medium,
  },
});

export default globalStyles;

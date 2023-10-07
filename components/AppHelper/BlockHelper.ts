import { Alert, Dimensions, Keyboard, Platform, StatusBar } from "react-native";
import moment from "moment";
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export function showAlertView(title: string, mesage: string) {
    Keyboard.dismiss();
    Alert.alert(title, mesage, [{ text: 'Okay', onPress: () => {} }]);
  }
  
  export function isStringNullOrBlank(string: string) {
    return (
      string === undefined ||
      string === 'undefined' ||
      string === null ||
      string.length === 0
    );
  }
  
  export function isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== 'undefined' &&
      value !== null &&
      value !== 'null' &&
      value.trim().length > 0
    );
  }

  export const getStaggerGridStyle = () => {
    return {
      width: (SCREEN_WIDTH - 18) / 3,
      height: Number(Math.random() * 20 + 10) * 9,
      backgroundColor: 'gray',
      margin: 4,
      borderRadius: 18,
    };
  };

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

export const getTimeFromDateString = (createdAt:string) =>{
  let time = createdAt ? moment.utc(createdAt).startOf('seconds').fromNow(true): ""
  time = time.replace("ago","")
  .replace("a few seconds","now")
  .replace("a ","1 ").replace("an ","1 ")
  .replace("minutes","m").replace("minute","m")
  .replace("hours","H").replace("hour","H")
  .replace("days","D").replace("day","D")
  .replace("months","M").replace("month","M")
  .replace("weeks", "W").replace("week", "W")
  .replace("years", "Y").replace("year", "Y")
  return time
}

export const toBoolean = (value: string | number | boolean): boolean => 
    [true, 'true', 'True', 'TRUE', '1', 1].includes(value);
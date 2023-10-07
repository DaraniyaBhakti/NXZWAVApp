import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React from "react";
import { COLORS, FONTS } from "../AppGlobals";
import { normalize } from "react-native-elements";
import globalStyles, { dimension } from "../../../blocks/utilities/src/GlobalStyles";
import FastImage from "react-native-fast-image";
import { defaultProfileImage } from "../../../framework/src/AppConstant";
import { getTimeFromDateString } from "../../../framework/src/BlockHelper";

interface MessageViewProps {
  profilePic: string|null,
  userName: string|null,
  message: string,
  created: string,
  isReceiver:boolean
}
export default function ChatMessageView(props: MessageViewProps) {
  return (
    <View
      style={{ flexDirection: "row", 
      marginTop: normalize(20), 
      marginLeft: props.isReceiver ? normalize(0): normalize(50),
      marginRight: props.isReceiver ? normalize(50): normalize(0)
    }}
    >
      {props.isReceiver && <FastImage
        style={styles.userImage}
        source={{
          uri: props.profilePic ? props.profilePic : defaultProfileImage(props.userName??""),
        }}
      />}
      
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          marginLeft: normalize(5),
        }}
      >
        <View
          style={{
            backgroundColor: props.isReceiver ? COLORS.grey : COLORS.blue,
            borderRadius: normalize(8),
            minHeight: normalize(50),
            justifyContent: "center",
            padding: normalize(8),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {props.isReceiver ? <Text style={[styles.commentUserName]} numberOfLines={1}>@{props.userName}</Text>: <View style={{flex:1}}/>}
            <View
              style={{
                maxWidth: normalize(80),
                backgroundColor: COLORS.black,
                borderRadius: normalize(10),
                paddingLeft: normalize(15),
                paddingRight: normalize(15),
                paddingTop: normalize(3),
                paddingBottom: normalize(3),
              }}
            >
              <Text style={{ color: COLORS.textColor }} numberOfLines={1}>
                {getTimeFromDateString(props.created)}
              </Text>
            </View>
          </View>
          <Text style={styles.commentText}>{props.message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(35),
    borderColor: COLORS.white,
    borderWidth: normalize(2),
  },
  comment: {
    flex: 1,
    fontSize: normalize(12),
    color: COLORS.textColorOffWhite,
    marginLeft: normalize(10),
    alignSelf: "center",
  },
  commentUserName: {
    flex: 1,
    fontSize: normalize(dimension.commentUsername),
    color: COLORS.textColor,
    textAlign: "left",
    fontFamily: FONTS.bold,
  },
  commentText: {
    fontSize: normalize(dimension.commentText),
    color: COLORS.textColor,
    fontFamily: FONTS.regular,
    marginTop: normalize(8),
    marginBottom: normalize(5),
  },
  rectangleView: {
    flex: 1,
    backgroundColor: COLORS.lightBlack,
    height: normalize(60),
    justifyContent: "center",
    borderRadius: normalize(10),
  },
  image: {
    width: normalize(25),
    height: normalize(25),
    padding: normalize(5),
    marginRight:normalize(5),
    alignSelf: "flex-end",
  },
  viewColumn:{ flex:1,justifyContent:'flex-start', marginLeft:normalize(10), marginRight:normalize(10)}
});

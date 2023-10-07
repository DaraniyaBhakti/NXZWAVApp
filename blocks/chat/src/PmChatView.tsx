import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from "react-native";
// Customizable Area End

import PmChatViewController, {
  Props,
  configJSON,
  IMessage,
} from "./PmChatViewController";
import { icArrowBackChat, imgRedDollar, imgRedMessageEdit } from "./assets";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { defaultProfileImage } from "../../../framework/src/AppConstant";
import globalStyles from "../../utilities/src/GlobalStyles";
import Message from "./components/MessageView";
import LockedMessage from "./components/LockedMessage";

export default class PmChatView extends PmChatViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderMessages = (item: IMessage) => {
    let lockedMesage = item.attributes.profile === null ? <Message messageData={item} /> : <LockedMessage messageData={item} unlockMessage={this.unlockMessage} />
    return (
      <View style={styles.viewMessageItem}>
        {item.attributes.is_locked === true ?
          lockedMesage :
          <Message messageData={item} />
        }
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    let userPic = this.state.receiverUserPic
    let userName = this.state.receiverUserName
    let userRole = this.state.receiverUserRole
    return (
      <View style={styles.container}>
        <View style={globalStyles.viewWindow}>
          {/* header */}
          <View style={[globalStyles.flexDirectionRow, globalStyles.headerRow]}>
            <TouchableOpacity onPress={this.doButtonBackPressed} style={styles.alignSelfCenter} testID="backBtn">
              <Image
                source={icArrowBackChat}
                style={globalStyles.headerImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* header middle */}
            <View style={styles.viewHeaderMiddle}>
              <View style={styles.profilePhotoView}>
                <View style={styles.profileCameraView}>
                  <FastImage
                    source={{ uri: userPic ? userPic : defaultProfileImage("user") }}
                    style={styles.profileImageView}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
              </View>

              <View style={styles.viewTextHeader}>
                <Text style={[styles.itemName, styles.alignSelfStart]} numberOfLines={1}>{userName ?? ""}</Text>
                <Text
                  style={[styles.itemName, styles.alignSelfStart, { color: COLORS.textColorOffWhite }]}
                  numberOfLines={1}
                >
                  {userRole ?? ""}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.alignSelfCenter} testID="editBtn">
              <Image
                source={imgRedMessageEdit}
                style={globalStyles.headerImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {this.state.messageList.length == 0 ? <View style={styles.flex1}>
          </View> :
            <>
              <View style={styles.flex1}>
                <FlatList
                  testID="flatList"
                  style={styles.flatList}
                  contentContainerStyle={styles.flexGrow}
                  data={this.state.messageList}
                  inverted
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => this.renderMessages(item)}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </>
          }
          <View style={{ ...styles.bottomContainer }}>
            <FastImage
              style={styles.userImage}
              source={imgRedDollar}
            />
            <TextInput
              testID={"inputMessage"}
              style={styles.messageTextInput}
              placeholder="Write message here"
              value={this.state.message}
              onChangeText={(text) => this.handleMessageChange(text)}
            />
            <TouchableOpacity
              testID={"btnSendMessage"}
              style={styles.sendButton}
              disabled={this.state.message?.length === 0}
              {...this.btnSendMessageProps}
            >
              <Text style={styles.buttonLabel}>{configJSON.sendText}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: COLORS.windowBackground,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  bottomContainer: {
    width: "95%",
    flexDirection: "row",
    borderColor: COLORS.boxBorderColor,
    borderWidth: normalize(2),
    backgroundColor: COLORS.boxBackground,
    borderRadius: normalize(30),
    alignSelf: "center",
    bottom: normalize(1),
    padding: normalize(5),
    minHeight: normalize(40),
  },
  userImage: {
    width: normalize(30),
    height: normalize(30),
  },
  messageTextInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,

  },
  sendButton: {
    backgroundColor: COLORS.blue,
    paddingTop: normalize(5),
    paddingBottom: normalize(5),
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
    borderRadius: normalize(15),
    alignSelf: "center",
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  textInput: {
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  profilePhotoView: {
    height: normalize(30),
    width: normalize(30),
    marginLeft: normalize(10),
    marginRight: normalize(3),
    alignSelf: 'center'
  },
  profileCameraView: {
    backgroundColor: COLORS.black,
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: normalize(2),
    borderRadius: normalize(45),
    overflow: "hidden",
  },
  profileImageView: {
    width: normalize(30),
    height: normalize(30),
    alignSelf: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: normalize(13),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    marginTop: normalize(3),
    alignSelf: "center",
  },
  flatList: {
    marginTop: normalize(10),
    flex: 1,
    marginBottom: normalize(20),
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex1: {
    flex: 1
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  viewTextHeader: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: normalize(5),

  },
  viewHeaderMiddle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center'
  },
  viewMessageItem: {
    margin: 10,
    width: '100%'
  }
});
// Customizable Area End

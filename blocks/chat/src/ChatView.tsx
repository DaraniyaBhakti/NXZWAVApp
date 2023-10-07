import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";
import { icArrowBackChat, icDmMessageChat } from "./assets";
import globalStyles, { COLORS, FONTS, dimension } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { Constant, defaultProfileImage } from "../../../components/src/AppHelper/AppConstant";
import ChatMessageView from "../../../components/src/MessageViews/ChatMessageView";
// Customizable Area End

import ChatViewController, {
  Props,
  configJSON,
  IMessage,
} from "./ChatViewController";
import { insertPhoto } from "./assets";

export default class ChatView extends ChatViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  chatInitialView = () => {
    let userPic = this.state.receiverUserPic
    let userName = this.state.receiverUserName
    let userRole = this.state.receiverUserRole
    let userPoints = this.state.receiverUserPoints
    return (
      <>
        <View style={{ flexDirection: "column", flex: 1, justifyContent: 'center' }}>
          <View style={styles.profilePhotoViewInitial}>
            <View style={styles.profileCameraViewInitial}>
              <FastImage
                source={{
                  uri: userPic ? userPic : defaultProfileImage("user"),
                }}
                style={styles.profileImageViewInitial}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
          </View>

          <Text style={[styles.userNameInitial]} numberOfLines={1}>{userName ?? ""}</Text>
          <Text
            style={[styles.userRoleInitial, { color: COLORS.textColorOffWhite }]}
            numberOfLines={1}
          >
            {userRole ?? ""}
          </Text>

          <Text style={[styles.userPointsInitial]} numberOfLines={1}>
            {userPoints ?? ""}
            <Text style={{ color: COLORS.textColorBlue }}>{Constant.space + Constant.unitPts}</Text></Text>

          <View style={{ width: "50%", alignSelf: 'center', marginTop: normalize(10), backgroundColor: COLORS.blue, borderRadius: normalize(20), paddingLeft: normalize(15), paddingRight: normalize(15), paddingTop: normalize(10), paddingBottom: normalize(10) }}>
            <TouchableOpacity>
              <Text style={styles.userProfileInitial}> View Profile </Text>
            </TouchableOpacity>
          </View>

        </View>
      </>
    )
  }

  renderMessages = (item: IMessage) => {
    let isReceiver = this.loginUserProfileId === "" + item.attributes.user_profile_info_id
    return (
      <View style={{ margin: 10 }}>
        <ChatMessageView
          profilePic={item.attributes.profile_image}
          userName={item.attributes.user_name}
          message={item.attributes.message}
          created={item.attributes.created_at}
          isReceiver={isReceiver}
        />
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    //const { receiverUser } = this.state;
    let userPic = this.state.receiverUserPic
    let userName = this.state.receiverUserName
    let userRole = this.state.receiverUserRole
    const keyboardVerticalOffset = Platform.OS === 'ios' ? normalize(90) : normalize(80)
    return (
      <View style={styles.container}>
        <View style={globalStyles.viewWindow}>
          {/* header */}
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.headerRow,
            ]}
          >
            <TouchableOpacity
              testID="btnBack"
              onPress={this.doButtonBackPressed} style={{ alignSelf: 'center' }}>
              <Image
                source={icArrowBackChat}
                style={globalStyles.headerImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* header middle */}
            <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center' }}>
              <View style={styles.profilePhotoView}>
                <View style={styles.profileCameraView}>
                  <FastImage
                    source={{
                      uri: userPic ? userPic : defaultProfileImage("user"),
                    }}
                    style={styles.profileImageView}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: normalize(5),

                }}
              >
                <Text style={[styles.itemName, { alignSelf: "flex-start" }]} numberOfLines={1}>{userName ?? ""}</Text>
                <Text
                  style={[styles.itemName, { color: COLORS.textColorOffWhite, alignSelf: 'flex-start' }]}
                  numberOfLines={1}
                >
                  {userRole ?? ""}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }}>
              {this.state.messageList.length == 0 ? <View style={{ flex: 1 }}>
                {this.chatInitialView()}
              </View> : <TouchableWithoutFeedback
                testID={"hideKeyboard"}
                onPress={() => {
                  this.hideKeyboard();
                }}
              >
                <FlatList
                  testID="flatList"
                  style={styles.flatList}
                  contentContainerStyle={styles.flexGrow}
                  data={this.state.messageList}
                  inverted
                  renderItem={({ item }) => this.renderMessages(item)}
                />
              </TouchableWithoutFeedback>}
              <View
                style={{
                  ...styles.bottomContainer,

                }}
              >
                <FastImage
                  style={styles.userImage}
                  source={icDmMessageChat}
                />
                <TextInput
                  testID={"inputMessage"}
                  style={styles.messageTextInput}
                  placeholder="Write message here"
                  value={this.state.message}
                  {...this.inputMessageProps}
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
            </KeyboardAvoidingView>
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
  // container: {
  //   flex: 1,
  //   padding: 1,
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   width: "100%",
  //   maxWidth: 650,
  //   backgroundColor: COLORS.white,
  // },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  userCountText: {
    fontSize: 16,
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
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(35),
    borderColor: COLORS.white,
    borderWidth: normalize(2),
  },
  // bottomContainer: {
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems:'center',
  //   borderTopWidth: 1,
  //   padding: 10,
  //   borderColor:COLORS.white
  // },
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
    paddingTop: normalize(8),
    paddingBottom: normalize(8),
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
    borderRadius: normalize(15),
    alignSelf: "center",
  },
  sendFileButton: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderRadius: 4,
  },
  closeFileButton: {
    backgroundColor: "red",
    marginRight: 10,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  messageBoxContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d9d6ed",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginRight: 40,
  },
  messageText: {
    fontSize: 18,
  },
  messageDate: {
    fontSize: 14,
    fontWeight: "200",
    color: "#111",
    marginTop: 5,
  },
  modalContainer: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  previewModal: {
    flex: 1,
  },
  privewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  fileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 60
  },
  textInput: {
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  toggleNotificationBtn: {
    padding: 4,
    borderWidth: 0,
    marginLeft: 10,
  },
  unreadMessage: {
    color: "red",
  },
  readMessage: {
    color: "black",
  },
  insertPhotoIcon: {
    resizeMode: 'contain',
    margin: 0,
    padding: 0
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
  profilePhotoViewInitial: {
    height: normalize(80),
    width: normalize(80),
    marginLeft: normalize(10),
    marginRight: normalize(3),
    alignSelf: 'center'
  },
  profileCameraViewInitial: {
    backgroundColor: COLORS.black,
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: normalize(2),
    borderRadius: normalize(80),
    overflow: "hidden",
  },
  profileImageViewInitial: {
    width: normalize(80),
    height: normalize(80),
    alignSelf: "center",
    alignItems: "center",
  },
  userNameInitial: {
    fontSize: normalize(16),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    marginTop: normalize(10),
    alignSelf: "center",
  },
  userRoleInitial: {
    fontSize: normalize(dimension.defaultText),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    marginTop: normalize(1),
    alignSelf: "center",
  },
  userPointsInitial: {
    fontSize: normalize(dimension.defaultText),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    marginTop: normalize(10),
    alignSelf: "center",
  },
  userProfileInitial: {
    fontSize: normalize(dimension.defaultText),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
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
});
// Customizable Area End

import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
} from "react-native";
import { icArrowBackChat, icDefaultRadioButtonChat, icSearchChat, icSelectedRadioButtonChat } from "./assets";
import globalStyles, { COLORS, FONTS, dimension } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { defaultProfileImage } from "../../../framework/src/AppConstant";
// Customizable Area End

import ChatNewController, { Props, configJSON, UserResponse } from "./ChatNewController";

export default class ChatNew extends ChatNewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItemUserForChat = (itemUserResponse:UserResponse) => {
    let userPicItemUser = itemUserResponse.attributes.profile_pic ?? ''
    let userNameItemUser = itemUserResponse.attributes.user_name ?? ''
    return(
      <TouchableOpacity
        testID="rowItemChatNew"
        style={styles.rowItemChatNew}
        onPress={() => {
          this.handleRowItemOnPressUser(itemUserResponse);
        }}
      >
        <View style={{flexDirection:"row"}}>
        <View style={styles.profilePhotoViewChatNew}>
            <View style={styles.profileCameraViewChatNew}>
              <FastImage
                source={{
                  uri:userPicItemUser
                  ? userPicItemUser : defaultProfileImage(userNameItemUser) ,
                }}
                style={styles.profileImageViewChatNew}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
          </View>

          <View style={styles.itemViewName}>
            <Text style={[styles.itemNameUser, { alignSelf: "flex-start" }]} numberOfLines={1}>{userNameItemUser}</Text>
            </View>
            <Image
            source={
              this.state.currentSelectedUser === itemUserResponse
                ? icSelectedRadioButtonChat
                : icDefaultRadioButtonChat
            }
            style={styles.radioButtonImageUser}
            resizeMode="contain"
          />
        </View>
        </TouchableOpacity>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={globalStyles.containerFlex}>
        <TouchableWithoutFeedback
          testID={"touchOnMainContainerChatNew"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
           <View style={globalStyles.viewWindow}>
            {/* header */}
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.headerRow,
              ]}
            >
              <TouchableOpacity
               testID="btnBackChatNew"
               onPress={this.doButtonBackPressed}>
                <Image
                  source={icArrowBackChat}
                  style={globalStyles.headerImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* header middle */}
              <View style={{flex:1, justifyContent:'center'}}>
                <Text style={globalStyles.headerText}>
                  {configJSON.newMessage}
                </Text>
              </View>

              <TouchableOpacity 
                testID="btnChatChatNew"
                style={styles.touchChatNew} onPress={this.doButtonPressChatMessages}>
                <View style={{ 
                justifyContent:'center',
                alignSelf:'center', 
                paddingLeft:normalize(10), 
                paddingRight:normalize(10),
                paddingTop:normalize(3),
                paddingBottom:normalize(3),
                backgroundColor:this.state.currentSelectedUser ? COLORS.redActive : COLORS.grey,
                borderRadius:normalize(10)
                }}>
                <Text style={{color:COLORS.textColor, fontSize:normalize(dimension.defaultText)}}>
                  {configJSON.chat}
                </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={globalStyles.searchImageView}>
              <Image
                source={icSearchChat}
                style={globalStyles.imageSearch}
                resizeMode="contain"
              />
              <TextInput
                testID="textInputComponentChatNew"
                style={styles.textInputSearchUser}
                placeholder={configJSON.searchPlayers}
                {...this.txtInputUserProps}
                onSubmitEditing={this.onPressUserSubmitting}
              />
            </View>

            {this.state.messageUser.length > 0 && (
              <Text style={[globalStyles.apiMessage]}>{this.state.messageUser}</Text>
            )}
            <FlatList
              testID="flatListChatNew"
              style={styles.flatList}
              contentContainerStyle={globalStyles.flexGrow1}
              data={this.state.userList}
              renderItem={({ item }) => this.renderItemUserForChat(item)}
            />
         </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  touchChatNew:{
    height:'100%', 
    justifyContent:'center',
    alignSelf:'center'
  },
  flatList: {
    marginTop: normalize(5),
    flex: 1,
  },
  profilePhotoViewChatNew: {
    height: normalize(dimension.chatSearchUserImage),
    width: normalize(dimension.chatSearchUserImage),
    marginLeft:normalize(1),
    marginRight:normalize(3)
  },
  profileCameraViewChatNew: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: normalize(2),
    borderRadius: normalize(45),
    overflow: "hidden",
  },
  profileImageViewChatNew: {
    width: normalize(dimension.chatSearchUserImage),
    height: normalize(dimension.chatSearchUserImage),
    alignSelf: "center",
    alignItems: "center",
  },
  rowItemChatNew:{
    paddingLeft:normalize(1),
    paddingRight:normalize(1), 
    paddingTop:normalize(5),
    paddingBottom:normalize(5), 
    marginTop:normalize(1), 
    marginBottom:normalize(1), 
  },
  itemViewName:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: normalize(5),
  },
  itemNameUser: {
    fontSize: normalize(13),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    marginTop:normalize(3),
    alignSelf: "center",
  },
  radioButtonImageUser: {
    width: 22,
    height: 22,
    padding: 5,
    marginTop: normalize(2),
    marginBottom: normalize(2),
    marginLeft: normalize(2),
    marginEnd: normalize(2),
    alignSelf: "center",
  },
  textInputSearchUser: {
    flex: 1,
    fontSize: normalize(15),
    fontFamily: FONTS.semiBold,
    marginLeft: normalize(10),
  },
});
// Customizable Area End

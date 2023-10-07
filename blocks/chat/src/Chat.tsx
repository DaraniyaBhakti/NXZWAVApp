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
} from "react-native";
import { icArrowBackChat, icDeleteChat, icMessageChat, icNewChat, icSearchChat } from "./assets";
import globalStyles, { COLORS, FONTS, dimension } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { Constant, defaultProfileImage } from "../../../components/src/AppHelper/AppConstant";
import { getTimeFromDateString } from "../../../components/src/AppHelper/BlockHelper";
import { SwipeListView } from 'react-native-swipe-list-view';
import { IChatResponse } from "./ChatController";
// Customizable Area End

import ChatController, { Props, configJSON, IChat } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItemConversation = (itemConversation: IChatResponse) => {
    let userPicConversation = itemConversation.attributes.profile_info.profile_pic ?? ''
    let userNameConversation = itemConversation.attributes.profile_info.user_name ?? ''
    let messageConversation = itemConversation.attributes.message.message ?? ''
    let isReadConversation = itemConversation.attributes.message.is_mark_read ?? true
    let createdAtConversation = itemConversation.attributes.message.created_at ?? ''
    let timeConversation = getTimeFromDateString(createdAtConversation)
    return (
      <TouchableOpacity
        testID="rowItemConversation"
        style={styles.rowItemConversation}
        onPress={() => {
        }}
      >
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.profilePhotoView}>
            <View style={styles.profileCameraView}>
              <FastImage
                source={{
                  uri: userPicConversation
                    ? userPicConversation : defaultProfileImage(userNameConversation),
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
            <Text style={[styles.itemName, { alignSelf: "flex-start" }]} numberOfLines={1}>{userNameConversation}</Text>
            <Text
              style={[styles.itemName, { color: COLORS.textColorOffWhite, alignSelf: 'flex-start' }]}
              numberOfLines={1}
            >
              {messageConversation} <Text style={{ color: COLORS.textColorBlue }}>- {timeConversation}</Text>
            </Text>
          </View>
          {!isReadConversation && <Text style={{ color: COLORS.textColorBlue, fontSize: normalize(dimension.bulletText), alignSelf: 'center' }}>{Constant.markBullet} </Text>}

        </View>
      </TouchableOpacity>
    );
  }

  renderHiddenItemConversation = (itemConversationHidden: IChatResponse) => {
    return (
      <View style={styles.rowBackConversation}>
        <View style={[styles.backSwipeConversation]}>
          <TouchableOpacity
            testID="rowHiddenItemMessage"
            onPress={() => {
              this.handleRowItemOnMessagePress(itemConversationHidden);
            }}>
            <View style={[styles.rowSwipeView, styles.rowSwipeViewGrey]}>
              <Image
                source={icMessageChat}
                style={styles.rowSwipeImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="rowHiddenItemDelete"
            onPress={() => {
              this.handleRowItemOnDeletePress(itemConversationHidden);
            }}>
            <View style={[styles.rowSwipeView, styles.rowSwipeViewRed]}>
              <Image
                source={icDeleteChat}
                style={styles.rowSwipeImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={globalStyles.containerFlex}>
        <TouchableWithoutFeedback
          testID={"touchOnMainContainerChat"}
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
                testID="btnBackChat"
                onPress={this.doButtonBackPressed}>
                <Image
                  source={icArrowBackChat}
                  style={globalStyles.headerImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* view selection */}
              <View style={styles.selectionView}>
                <TouchableOpacity
                  testID="btnDmChat"
                  style={[
                    styles.buttonViewNew,
                    this.state.dmSelected
                      ? styles.buttonActiveNew
                      : styles.buttonDefaultNew,
                  ]}
                  onPress={this.onPressDm}
                >
                  <Text style={globalStyles.buttonText}>{configJSON.DM}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btnPmChat"
                  style={[
                    styles.buttonViewNew,
                    this.state.pmSelected
                      ? styles.buttonActiveNew
                      : styles.buttonDefaultNew,
                  ]}
                  onPress={this.onPressPm}
                >
                  <Text style={globalStyles.buttonText}>{configJSON.PM}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                testID="btnNewMessage"
                onPress={this.doButtonPressNewMessage}>
                <Image
                  source={icNewChat}
                  style={globalStyles.headerImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={globalStyles.searchImageView}>
              <Image
                source={icSearchChat}
                style={globalStyles.imageSearch}
                resizeMode="contain"
              />
              <TextInput
                testID="textInputComponentChat"
                style={styles.textInputSearchConversation}
                placeholder={configJSON.search}
                {...this.txtInputProps}
                onSubmitEditing={this.onPressSubmitting}
              />
            </View>

            {this.state.messageConversation.length > 0 && (
              <Text style={[globalStyles.apiMessage]}>{this.state.messageConversation}</Text>
            )}
            <SwipeListView
              testID="swipeListViewConversation"
              style={styles.flatListConversation}
              disableRightSwipe
              data={this.state.chatList}
              keyExtractor={itemConversation => itemConversation.attributes.id + ""}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBackConversation}>
                  {this.renderHiddenItemConversation(data.item)}
                </View>
              )}
              renderItem={(data, rowMap) => (
                <View style={styles.rowFrontConversation}>
                  {this.renderItemConversation(data.item)}
                </View>
              )}
              rightOpenValue={-125}
              closeOnRowOpen
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowMap[rowKey].closeRow()
                }, 2000)
              }}
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
  selectionView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: normalize(5),
    backgroundColor: COLORS.grey,
    marginLeft: normalize(20),
    marginRight: normalize(20),
    borderRadius: normalize(30),
  },
  buttonViewNew: {
    borderRadius: 20,
    flex: 1,
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
    paddingTop: normalize(3),
    paddingBottom: normalize(2),
  },
  buttonDefaultNew: {
    backgroundColor: COLORS.grey,
  },
  buttonActiveNew: {
    backgroundColor: COLORS.tabActive,
  },
  textInputSearchConversation: {
    flex: 1,
    fontSize: normalize(15),
    fontFamily: FONTS.semiBold,
    marginLeft: normalize(10),
  },
  flatListConversation: {
    marginTop: normalize(5),
    flex: 1,
  },
  rowFrontConversation: {
    backgroundColor: COLORS.black,
    marginTop: normalize(1),
    marginBottom: normalize(0)
  },
  rowBackConversation: {
    alignItems: 'center',
    backgroundColor: COLORS.black,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginTop: normalize(8),
    marginBottom: normalize(0)
  },
  backSwipeConversation: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    right: 0,
  },
  rowSwipeImage: {
    width: normalize(20),
    height: normalize(20),
    padding: normalize(3),
  },
  rowSwipeView: {
    borderRadius: normalize(30),
    padding: normalize(10),
    marginBottom: normalize(8)
  },
  rowSwipeViewGrey: {
    backgroundColor: COLORS.grey,
    marginLeft: normalize(10),
    marginRight: normalize(10)
  },
  rowSwipeViewRed: {
    backgroundColor: 'red',
  },
  rowItemConversation: {
    paddingLeft: normalize(1),
    paddingRight: normalize(1),
    paddingTop: normalize(5),
    paddingBottom: normalize(5),
    marginTop: normalize(2),
    marginBottom: normalize(5)
  },
  profilePhotoView: {
    height: normalize(45),
    width: normalize(45),
    marginLeft: normalize(1),
    marginRight: normalize(3)
  },
  profileCameraView: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: normalize(2),
    borderRadius: normalize(45),
    overflow: "hidden",
  },
  profileImageView: {
    width: normalize(45),
    height: normalize(45),
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
});
// Customizable Area End

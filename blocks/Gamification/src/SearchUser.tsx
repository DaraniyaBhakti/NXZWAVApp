import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
// Customizable Area End

import SearchUserController, { Props, configJSON } from "./SearchUserController";
import globalStyles from "../../utilities/src/GlobalStyles";
import { imgSearch, } from "./assets";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { normalize } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { defaultProfileImage } from "../../../framework/src/AppConstant";
import { UserResponse } from "./domain/gamification.dto";

export default class SearchUser extends SearchUserController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = (item: UserResponse,index:number) => {
    let userPic = item.attributes.profile_pic ?? ''
    let userName = item.attributes.user_name
    let userRole = item.attributes.profile_account_categories_id?.name ?? ''
    return (
      <TouchableOpacity
        testID={`rowUserView-${index}`}
        style={{
          paddingLeft: normalize(1),
          paddingRight: normalize(1),
          paddingTop: normalize(5),
          paddingBottom: normalize(5),
          marginTop: normalize(1),
          marginBottom: normalize(1),
        }}
        onPress={() => {
          this.handleRowItemOnPressUser(item);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.profilePhotoView}>
            <View style={styles.profileCameraView}>
              <FastImage
                source={{
                  uri: userPic
                    ? userPic : defaultProfileImage(userName),
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
            <Text style={[styles.itemName, { alignSelf: "flex-start" }]} numberOfLines={1}>{userName}</Text>
            <Text style={[styles.itemRole, { alignSelf: "flex-start" }]} numberOfLines={1}>{userRole}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.searchImageView}>
          <Image
            source={imgSearch}
            style={styles.imageSearch}
            resizeMode="contain"
          />
          <TextInput
            testID="searchUserTextInput"
            style={styles.bgMobileInput}
            placeholder={configJSON.searchPlayers}
            {...this.txtInputUserProps}
            onSubmitEditing={this.onPressUserSubmitting}
          />
        </View>

        {this.state.message.length > 0 && (
          <Text style={[globalStyles.apiMessage]}>{this.state.message}</Text>
        )}
        <FlatList
          testID="userFlatList"
          style={styles.flatList}
          data={this.state.userList}
          renderItem={({ item,index }) => this.renderItem(item,index)}
        />
        {this.state.loader &&
          <View style={[styles.container]}>
            <ActivityIndicator />
          </View>
        }
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
    width: "100%",
    backgroundColor: COLORS.windowBackground,
  },
  flatList: {
    marginTop: 30,
    padding: 10
  },
  flexGrow: {
    flexGrow: 1,
  },
  profilePhotoView: {
    height: 50,
    width: 50,
    marginLeft: 5,
    marginRight: 10
  },
  profileCameraView: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
  },
  profileImageView: {
    width: 50,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: normalize(13),
    color: COLORS.textColor,
    fontFamily: FONTS.semiBold,
    alignSelf: "center",
  },
  itemRole: {
    fontSize: normalize(12),
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.semiBold,
    marginTop: 5,
    alignSelf: "center",
  },
  searchImageView: {
    flexDirection: "row",
    padding: normalize(15),
    backgroundColor: COLORS.grey,
    borderRadius: 30,
  },
  imageSearch: {
    width: normalize(22),
    height: normalize(22),
    padding: normalize(4),
    alignSelf: "center",
  },
  bgMobileInput: {
    flex: 1,
    fontSize: normalize(15),
    fontFamily: FONTS.semiBold,
    marginLeft: normalize(10),

  },
});
// Customizable Area End

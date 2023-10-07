import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import HashtagsController, {
  Props, SelectedTag, Tag, configJSON,
} from "./HashtagsController";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgBackButton, imgTagsIcon } from "./assets";

export default class Hashtags extends HashtagsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderTags = (data: { item: Tag, index: number }) => {
    const { item, index } = data
    return (
      <TouchableOpacity
        onPress={() => this.handleSelectTags(item)}
        disabled={this.state.selectedTags.includes(item)}
        testID={`selectedTag-${index}`}
        style={styles.touchableListItem}>
        <Text style={styles.textlistItemName}>#{item.attributes.name}</Text>
        <View style={styles.viewListItemCount}>
          <Text style={styles.textItemCount}>{item.attributes.taggings_count}</Text>
          <Text style={styles.textItemActs}> {configJSON.labelactions}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <>
          <View style={styles.viewHeader}>
            <TouchableOpacity
              testID="btnBackButton"
              onPress={() => this.navigateToPostCreationScreen()}
              style={styles.touchableBackBtn}
            >
              <Image source={imgBackButton} style={styles.imgBack} />
            </TouchableOpacity>
            <TouchableOpacity
              testID="btnSaveButton"
              onPress={() => this.updateTags()}
              style={styles.touchableSave}>
              <Text style={styles.textSave}>{configJSON.labelSave}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textHeading}>{configJSON.labelAddTags}</Text>
          <Text style={styles.textDesc}>{configJSON.labelDescription}</Text>

          <View style={styles.viewSearch}>
            <Image source={imgTagsIcon} style={styles.imgSearch} />
            <TextInput
              testID="textInputSearchTag"
              style={styles.textInputSearch}
              placeholder="Search tags or create a new one"
              placeholderTextColor={COLORS.textColorOffWhite}
              onChangeText={(text) => this.setSearchTag(text)}
            />
          </View>
          <View style={styles.viewSelectedItem}>
            {this.state.selectedTags.map((item: SelectedTag, index: number) =>
              <TouchableOpacity
              testID={`tag-${index}`}
                key={item.attributes.name}
                onPress={() => this.handleRemoveTags(index)}
                style={styles.touchableSelectedItem}>
                <Text style={styles.textSelectedName}>#{item.attributes.name}</Text>
                <Text style={styles.textSelectedCount}>{item.attributes.taggings_count}</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.text40Tags}>{configJSON.labelTop40Tags}</Text>
          <View style={styles.viewFlatlist}>
            <FlatList
              showsVerticalScrollIndicator={false}
              testID="flatListTags"
              data={this.filterTags(this.state.tags)}
              renderItem={this.renderTags}
              style={styles.flatlist}
              keyExtractor={(item: Tag) => item.id}
            />
          </View>
        </>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground,
  },
  viewHeader: {
    height: "5%",
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touchableBackBtn: {
    borderRadius: 15,
    padding: 5,
    alignItems: 'center'
  },
  imgBack: {
    height: 25,
    width: 25,
  },
  touchableSave: {
    borderRadius: 20,
    backgroundColor: "#2b49de"
  },
  textSave: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'right'
  },
  textHeading: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textColor,
    marginHorizontal: 13,
    marginTop: 25
  },
  textDesc: {
    width: '70%',
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textColorOffWhite,
    marginHorizontal: 13,
    marginTop: 10
  },
  viewSearch: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderColor: COLORS.boxBorderColor,
    borderRadius: 15,
    borderWidth: 0.7,
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: 'black'
  },
  imgSearch: {
    height: 22,
    width: 22,
    marginRight: 10
  },
  textInputSearch: {
    color: COLORS.textColor,
    fontSize: 16,
  },
  viewSelectedItem: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  touchableSelectedItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#141414',
    marginHorizontal: 8,
    marginVertical: 5
  },
  textSelectedName: {
    color: COLORS.textColor,
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    marginRight: 20
  },
  textSelectedCount: {
    color: COLORS.textColorBlue
  },
  text40Tags: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textColor,
    marginHorizontal: 13,
    marginTop: 20
  },
  viewFlatlist: {
    flex: 1,
    paddingBottom: 10
  },
  flatlist: {
    marginTop: 10,
  },
  touchableListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  textlistItemName: {
    color: COLORS.textColor,
    fontSize: 17,
    fontFamily: FONTS.semiBold
  },
  viewListItemCount: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textItemCount: {
    fontSize: 16,
    color: COLORS.textColorBlue
  },
  textItemActs: {
    color: COLORS.textColorOffWhite
  },
});
// Customizable Area End
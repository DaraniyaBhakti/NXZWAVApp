import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
// Customizable Area End

// Customizable Area Start
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgPlayersIcon, imgSearchIcon, imgTagsIcon, imgTrendingIcon } from "./assets";
import CarouselView from "./components/CarouselView";
import Trending from "./components/Trending";
import Players from "./components/Players";
import Tags from "./components/Tags";
import { configJSON } from "./SearchController";
// Customizable Area End

import SearchController, { Props } from "./SearchController";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={styles.container} nestedScrollEnabled={true}>
          {/* Customizable Area Start */}
          <>
            <View style={styles.viewSearch}>
              <Image source={imgSearchIcon} style={styles.imgSearch} />
              <TextInput
                testID="textInputSearch"
                value={this.state.searchQuery}
                style={styles.textInputSearch}
                placeholder={this.state.searchCaption}
                onChangeText={(text) => this.setSearchQuery(text)}
                placeholderTextColor={COLORS.textColorOffWhite}
                returnKeyType="search"
                onSubmitEditing={this.getSearchedList}
                autoCorrect={false}
              />
            </View>

            <View style={styles.viewScreenOptions}>
              <TouchableOpacity
                onPress={() => this.optionTrendingSelected()}
                testID="btnOptionTrending"
                style={this.state.selectedOption === configJSON.labelTrending ? styles.touchableScreenOptionSelected
                  : styles.touchableScreenOption}>
                {((this.state.selectedOption === configJSON.labelTrending)) &&
                  <View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewScreenOptionText}>
                  <Image source={imgTrendingIcon} style={styles.imgOptions} />
                  <Text style={styles.textNumber}>{configJSON.labelTrending}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.optionTagsSelected()}
                testID="btnOptionTags"
                style={this.state.selectedOption === configJSON.labelTags ? [styles.marginHorizontal10, styles.touchableScreenOptionSelected]
                  : [styles.marginHorizontal10, styles.touchableScreenOption]}>
                {(this.state.selectedOption === configJSON.labelTags) && <
                  View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewScreenOptionText}>
                  <Image source={imgTagsIcon} style={styles.imgOptions} />
                  <Text style={styles.textNumber}>{configJSON.labelTags}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.optionPlayersSelected()}
                testID="btnOptionPlayers"
                style={this.state.selectedOption === configJSON.labelPlayers ? styles.touchableScreenOptionSelected
                  : styles.touchableScreenOption}>
                {(this.state.selectedOption === configJSON.labelPlayers) &&
                  <View style={styles.viewRedColumn}></View>
                }
                <View style={styles.viewScreenOptionText}>
                  <Image source={imgPlayersIcon} style={styles.imgOptions} />
                  <Text style={styles.textNumber}>{configJSON.labelPlayers}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.viewCarousel}>
              <CarouselView navigation={this.props.navigation} carouselList={this.state.carouselList} activeSlide={this.state.activeSlide} setActiveSlide={this.setActiveSlide} />
            </View>

            {(this.state.selectedOption === configJSON.labelTrending) &&
              <Trending trendingList={this.state.trendingList} itemHeights={this.state.itemHeights} loader={this.state.loader} />
            }

            {(this.state.selectedOption === configJSON.labelTags) &&
              <Tags tagsList={this.state.tagsList}
                navigateToTagsScreen={this.navigateToTagsScreen}
                loader={this.state.loader}
              />
            }

            {(this.state.selectedOption === configJSON.labelPlayers) &&
              <Players playersList={this.state.playersList} isSearchResults={this.state.isSearchResults}
                playerNotFound={this.state.playerNotFound} loader={this.state.loader} />
            }
          </>
          {/* Customizable End Start */}
          {this.state.loader &&
            <View style={[styles.container]}>
              <ActivityIndicator />
            </View>
          }
        </ScrollView>
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground
  },
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    borderWidth: 0.7,
    backgroundColor: '#1d1d1d'
  },
  imgSearch: {
    height: 22,
    width: 22,
    marginRight: 20
  },
  textInputSearch: {
    color: COLORS.textColor,
    fontSize: 16,
  },
  viewScreenOptions: {
    flexDirection: 'row',
    marginTop: 20
  },
  touchableScreenOptionSelected: {
    flexDirection: 'row',
    borderColor: "#1d1d1d",
    borderWidth: 1,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingRight: 10
  },
  touchableScreenOption: {
    flexDirection: 'row',
    backgroundColor: "#141414",
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  viewRedColumn: {
    width: 10,
    backgroundColor: 'red',
    height: '75%',
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: 10,
    flex: 0.1
  },
  viewScreenOptionText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textNumber: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.textColor,
    fontFamily: FONTS.bold
  },
  imgOptions: {
    height: 22,
    width: 22,
    alignSelf: 'center',
    marginBottom: 5,
  },

  marginHorizontal10: {
    marginHorizontal: 10
  },
  viewCarousel: {
    height: 300,
    marginTop: 20
  },
});
// Customizable Area End
import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ActivityIndicator,
  FlatList
} from "react-native";

// Customizable Area End

// Customizable Area Start
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import FastImage from "react-native-fast-image";
import { imgBackButton, imgBlueComment, imgBlueRepost, imgBlueUpvote, imgComment, imgDonwvote, imgMoreIcon, imgRedDownvote, imgRepost, imgUpvote } from "./assets";
// Customizable Area End

import SingleTagStreamController, { Props } from "./SingleTagStreamController";

export default class SingleTagStream extends SingleTagStreamController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderPosts = (data: any) => {
    const { item, index } = data
    let attributes = item.attributes;
    let image = "";
    if (attributes.images != null) {
      image = attributes.images;
    } else {
      image = "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg"
    }
    return (
      <View style={styles.viewPostItem}>
        <View style={styles.viewPostHeader}>
          <View style={styles.viewUserDetail}>
            <FastImage source={{ uri: item.attributes.user_profile_info_id.profile_pic !== null ? item.attributes.user_profile_info_id.profile_pic : "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
              style={styles.imgUserProfile} />
            <View>
              <Text style={styles.textUserName}>{item.attributes.user_profile_info_id.user_name}</Text>
              <Text style={styles.textUserRole}>{item.attributes.user_profile_info_id.role}</Text>
            </View>
          </View>
          <TouchableOpacity testID={`moreBtn-${index}`} onPress={() => { }}>
            <Image source={imgMoreIcon} style={styles.imgMore} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewPostImage}>
          <Image source={{ uri: image }} style={styles.imgPost} />
        </View>
        <View style={styles.viewPostData}>
          <Text style={styles.textDesc}><Text style={styles.textDescName}>{item.attributes.user_profile_info_id.user_name}: </Text>{item.attributes.description}</Text>
          <View style={styles.viewPostNumericalData}>
            <View style={styles.viewDataItem}>
              <Image source={imgBlueUpvote} style={styles.imgPostData} />
              <Text style={styles.textPostData}>{item.attributes.counts.upvote_count}</Text>
            </View>
            <View style={styles.viewDataItem}>
              <Image source={imgRedDownvote} style={styles.imgPostData} />
              <Text style={styles.textPostData}>{item.attributes.counts.downvote_count}</Text>
            </View>
            <View style={styles.viewDataItem}>
              <Image source={imgBlueRepost} style={styles.imgPostData} />
              <Text style={styles.textPostData}>{item.attributes.counts.repost_count}</Text>
            </View>
            <View style={styles.viewDataItem}>
              <Image source={imgBlueComment} style={styles.imgPostData} />
              <Text style={styles.textPostData}>{item.attributes.counts.comment_count}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewPostFooter}>
          {item.attributes.locked === true ?
            <TouchableOpacity testID={`unlockPostItem-${index}`} style={styles.viewUnlockPost} onPress={() => { }}>
              <Text style={styles.textUnlockPost}>Unlock - {item.attributes.points}</Text>
            </TouchableOpacity>
            :
            <View style={styles.viewPostButton}>
              <View style={styles.viewCommentRepost}>
                <TouchableOpacity testID={`commentPostItem-${index}`} onPress={() => { }}>
                  <Image source={imgComment} style={styles.imgComment} />
                </TouchableOpacity>
                <TouchableOpacity testID={`repostPostItem-${index}`} onPress={() => { }}>
                  <Image source={imgRepost} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewVotes}>
                <View style={styles.viewDownVote}>
                  <TouchableOpacity testID={`downVotePostItem-${index}`} onPress={() => { }}>
                    <Image source={imgDonwvote} style={styles.imgVotes} />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewUpVote}>
                  <TouchableOpacity testID={`upVotePostItem-${index}`} onPress={() => { }}>
                    <Image source={imgUpvote} style={styles.imgVotes} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/* Customizable Area Start */}
          <View style={styles.viewHeader}>
            <View>
              <FastImage source={{ uri: this.state.tagUrl }}
                style={styles.headerBackgorundImage} >
                <LinearGradient colors={['transparent', 'black']} style={[styles.linearGradient,]}>
                </LinearGradient>
              </FastImage>
            </View>
            <View style={styles.viewHeaderImage}>
              <FastImage source={{ uri: this.state.tagUrl }} resizeMode="cover"
                style={styles.imageHeader} />
              <Text style={styles.textTag}>#{this.state.tag}</Text>
              <Text style={styles.textWavs}>{this.state.taggingCount} wavs</Text>
            </View>
            <TouchableOpacity testID="btnBackButton" onPress={() => this.props.navigation.navigate('Search')}
              style={styles.viewImgBack}>
              <Image source={imgBackButton} style={styles.imgBackBtn} />
            </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            testID="flatListPosts"
            data={this.state.postList}
            renderItem={this.renderPosts}
            style={styles.flatList}
            keyExtractor={(item: any) => item.id}
          />
          {/* Customizable End Start */}
        </View>
        {this.state.loader &&
          <View style={[styles.container]}>
            <ActivityIndicator />
          </View>
        }
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: COLORS.windowBackground
  },
  imgBackBtn: {
    height: 30,
    width: 30,
  },
  viewHeader: {
    height: "30%",
    width: '100%'
  },
  headerBackgorundImage: {
    height: "100%",
    width: '100%',
  },
  viewHeaderImage: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  imageHeader: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black'
  },
  textTag: {
    color: 'white',
    fontFamily: FONTS.bold,
    fontSize: 17,
    textAlign: 'center'
  },
  textWavs: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    textAlign: 'center'
  },
  viewImgBack: {
    position: 'absolute',
    bottom: 15,
    left: 10
  },
  flatList: {
    paddingBottom: 20
  },
  viewPostItem: {
    marginHorizontal: 10,
    marginTop: 25
  },
  viewPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewUserDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  imgUserProfile: {
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#141414",
    marginHorizontal: 5,
    alignSelf: 'center',
    marginTop: 8
  },
  textUserName: {
    color: COLORS.textColor,
    fontSize: 16,
    fontFamily: FONTS.bold,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  textUserRole: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 14,
    paddingHorizontal: 10
  },
  imgMore: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 8
  },
  viewPostImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#141414',
    padding: 5
  },
  imgPost: {
    margin: 2,
    height: 300,
    borderRadius: 10
  },
  viewPostData: {
    backgroundColor: 'black',
    padding: 10
  },
  textDesc: {
    color: COLORS.textColor,
    fontSize: 16,
    fontStyle: 'normal',
    marginBottom: 10
  },
  textDescName: {
    fontFamily: FONTS.bold
  },
  viewPostNumericalData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10
  },
  viewDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgPostData: {
    height: 18,
    width: 18,
    marginRight: 10
  },
  textPostData: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold
  },
  viewPostFooter: {
    backgroundColor: '#141414',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  viewUnlockPost: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 30,
    margin: 12,
    paddingVertical: 12,
    flex: 1
  },
  textUnlockPost: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    fontSize: 18
  },
  viewPostButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewCommentRepost: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  imgComment: {
    marginRight: 10
  },
  viewVotes: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 10
  },
  viewDownVote: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderColor: 'black',
    borderWidth: 4,
    borderRightWidth: 2,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
  },
  viewUpVote: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderColor: 'black',
    borderWidth: 4,
    borderLeftWidth: 2,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30
  },
  imgVotes: {
    height: 20,
    width: 20
  },
  linearGradient: {
    flex: 1,
  },
});
// Customizable Area End

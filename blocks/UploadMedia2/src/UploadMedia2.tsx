import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import UploadMedia2Controller, {
  Props, configJSON,
} from "./UploadMedia2Controller";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgDeleteButton, imgAddPostButton } from "./assets";
import { verticalScale } from "../../../components/src/Scale";
export default class UploadMedia2 extends UploadMedia2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderList = ({ item, index }: { item: any; index: number }) => {
    const imageUri = (item.node.image.uri ?? '')
    // || item.path;
    return (
      <>
        <TouchableOpacity
          key={String(index)}
          testID={`selectedImage-${index}`}
          activeOpacity={this.state.selectedPhotos.index === index ? 0 : 1}
          onPress={() => {
            if (item.isSelected == undefined || item.isSelected === false) {
              this.onSelectPhoto(item, index);
            }
          }}
        >
          <View style={{
            borderColor: this.state.selectedPhotos.index === index ? "white" : "black", borderWidth: 1.5
          }}>
            <Image
              source={{ uri: imageUri }}
              style={[styles.galleryImage, { opacity: this.state.selectedPhotos.index === index ? 0.2 : 1, }]}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ opacity: this.state.isUploadDelete ? 0.4 : 1 }}>
          <View style={styles.viewHeader}>
            <View style={styles.viewDltBtn}>
              <TouchableOpacity testID="btnUploadDelete" onPress={() => this.setUploadDelete(true)}
                style={styles.touchableDltBtn}>
                <Image source={imgDeleteButton} style={styles.imgDltBtn} />
              </TouchableOpacity>
              <Text style={styles.textTitle}> {configJSON.titleEditWAV}</Text>
            </View>
            <TouchableOpacity testID="btnNext" onPress={() => this.navigateToPostCreationScreen()}
              style={styles.touchableNext}>
              <Text style={styles.textNext}>
                Next
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewImage}>
            {this.state.selectedPhotos?.item !== undefined ?
              <Image
                source={{ uri: (this.state.selectedPhotos.item.node.image.uri ?? '') }}
                style={styles.imageSelected}
              />
              :
              <>
                <View style={styles.viewPlusImg}>
                  <Image source={imgAddPostButton} style={styles.imagePlus} />
                </View>
                <Text style={styles.textPlus}>{configJSON.labelAddPost}</Text>
              </>
            }
          </View>
          <View style={styles.viewFlatlist}>
            <FlatList
              data={this.state.photos.slice(1)}
              renderItem={this.renderList}
              numColumns={4}
              keyExtractor={item => item.node?.timestamp.toString()}
              style={styles.flatlist}
              testID='imagesList'
            />
          </View>
        </View>
        {this.state.isUploadDelete &&
          <View style={styles.viewDlt}>
            <Text style={styles.textHeading}>{configJSON.labelDeleteWav}</Text>
            <Text style={styles.textDesc}>{configJSON.labelDeleteWavMsg}</Text>
            <TouchableOpacity testID="btnDeletePost" style={styles.btnDelete}>
              <Text style={styles.textDeleteBtn}>{configJSON.labelYesDelete}</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="btnCancelDelete" onPress={() => this.setUploadDelete(false)}>
              <Text style={styles.textCancelBtn}>{configJSON.labelCancelSmall}</Text>
            </TouchableOpacity>
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
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  galleryImage: {
    height: verticalScale(80),
    width: Dimensions.get('window').width / 4,
    backgroundColor: 'lightgray',
  },
  camera: {
    width: "24%",
    height: 10,
  },
  viewHeader: {
    flexDirection: "row",
    height: '5%',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewDltBtn: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  touchableDltBtn: {
    borderRadius: 15,
    backgroundColor: "red",
    padding: 7
  },
  imgDltBtn: {
    height: 18,
    width: 18,
  },
  textTitle: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 8
  },
  touchableNext: {
    borderRadius: 20,
    backgroundColor: "#2b49de"
  },
  textNext: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'right'
  },
  viewImage: {
    backgroundColor: '#141414',
    height: "45%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10
  },
  imageSelected: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  viewPlusImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderWidth: 0.8,
    borderRadius: 45,
    backgroundColor: 'black',
    borderColor: 'white'
  },
  imagePlus: {
    height: 30,
    width: 30,
  },
  textPlus: {
    width: '40%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textColorOffWhite,
    marginHorizontal: 17,
    marginTop: 10
  },
  viewFlatlist: {
    height: "55%"
  },
  flatlist: {
    flex: 1
  },
  viewDlt: {
    backgroundColor: COLORS.windowBackground,
    position: 'absolute',
    top: "30%",
    width: '100%',
    height: "70%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  textHeading: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 80
  },
  textDesc: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.regular,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    width: "60%",
    alignSelf: 'center'
  },
  btnDelete: {
    backgroundColor: "#FF0A10",
    padding: 20,
    width: "80%",
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 50
  },
  textDeleteBtn: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center'
  },
  textCancelBtn: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  },

});
// Customizable Area End
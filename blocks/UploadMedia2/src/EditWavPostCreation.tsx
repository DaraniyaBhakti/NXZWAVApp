import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform,
    Image,
    TextInput,
    ScrollView,
} from "react-native";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import EditWavPostCreationController, {
    Props, configJSON,
} from "./EditWavPostCreationController";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgRightArrow, imgBackButton, imgBlueRightArrow } from "./assets";

export default class EditWavPostCreation extends EditWavPostCreationController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {
        // Customizable Area Start

        // Merge Engine - render - Start
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.viewHeader}>
                    <TouchableOpacity testID="btnBackButton" onPress={() => this.navigateToUploadMedia()}
                        style={styles.touchableBackBtn}>
                        <Image source={imgBackButton} style={styles.imgBackBtn} />
                    </TouchableOpacity>
                    <Text style={styles.textHeading}>{configJSON.titleEditWAV}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={{ uri: this.photoURL() }} style={styles.imgPost} />

                        <View style={styles.viewCaption}>
                            <TextInput
                                testID="textInputCaption"
                                multiline={true}
                                value={this.state.postCreationData.caption}
                                style={styles.textInputCaption}
                                placeholder={configJSON.labelCaption}
                                placeholderTextColor={COLORS.textColorOffWhite}
                                onChangeText={(text) => this.setCaption(text)} />
                        </View>
                        <Text style={styles.textPostVisible}>{configJSON.labelPost}</Text>
                        <Text style={styles.textPostDesc}>{configJSON.labelDesc}</Text>

                        <View style={styles.viewOption}>
                            <TouchableOpacity testID="btnPublicOption"
                                onPress={() => this.setIsPublicLockFlag(true, false)}
                                style={[{ backgroundColor: (this.state.isPublicSelectedFlag ? "#2b49de" : COLORS.windowBackground) }, styles.touchableOptionItem]}>
                                <Text style={styles.textOptionItem}>{configJSON.labelPublic}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnLockedOption"
                                onPress={() => this.setIsPublicLockFlag(false, true)}
                                style={[{ backgroundColor: (this.state.isPublicSelectedFlag ? COLORS.windowBackground : "#2b49de") }, styles.touchableOptionItem]}>
                                <Text style={styles.textOptionItem}>{configJSON.labelLocked}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity testID="btnCategoryItem"
                            onPress={() => this.navigateToCategoryScreen()}
                            style={styles.toucableListItem}>
                            <Text style={styles.textListItem}>{configJSON.labelCategory}</Text>
                            <Image source={this.state.postCreationData.categoriesList !== "" ? imgBlueRightArrow : imgRightArrow} style={styles.imgArrow} />
                        </TouchableOpacity>

                        <View style={styles.viewHorizontalLine}></View>

                        <TouchableOpacity testID="btnTagsItem"
                            onPress={() => this.navigateToTagsScreen()}
                            style={styles.toucableListItem}>
                            <Text style={styles.textListItem}>{configJSON.labelTags}</Text>
                            <Image source={this.state.postCreationData.taglist !== "" ? imgBlueRightArrow : imgRightArrow} style={styles.imgArrow} />
                        </TouchableOpacity>

                        {!this.state.isPublicSelectedFlag &&
                            <>
                                <View style={styles.viewHorizontalLine}></View>
                                <TouchableOpacity testID="btnUnlockAmountItem"
                                    onPress={() => this.navigateToUnlockAmountScreen()}
                                    style={styles.toucableListItem}>
                                    <Text style={styles.textListItem}>{configJSON.labelUnlockAmount}</Text>
                                    <Image source={this.state.postCreationData.unlockAmount !== 0 ? imgBlueRightArrow : imgRightArrow} style={styles.imgArrow} />
                                </TouchableOpacity>
                            </>
                        }
                        <View style={styles.viewHorizontalLine}></View>
                        <View style={styles.toucableListItem}>
                            <Text style={styles.textListItem}>{configJSON.labelPromote}</Text>
                            <Switch
                                testID="switchPromotePost"
                                trackColor={{ false: '#767577', true: '#2b49de' }}
                                thumbColor={this.state.promotePostSwitchFlag ? '#FFFFFF' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.setIsPromote()}
                                value={this.state.promotePostSwitchFlag}
                            />
                        </View>

                        <View style={styles.viewHorizontalLine}></View>

                        <TouchableOpacity testID="btnUploadPost" onPress={() => this.createPost()} style={styles.touchableUploadBtn}>
                            <Text style={styles.textuploadBtn}>{configJSON.labelUpload}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnCancelPost" onPress={() => this.navigateToUploadMedia()}>
                            <Text style={styles.textCancelBtn}>{configJSON.labelCancel}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
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
        // padding: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 650,
        backgroundColor: COLORS.windowBackground,
    },
    viewHeader: {
        flexDirection: "row",
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    touchableBackBtn: {
        borderRadius: 15,
        padding: 5,
        alignItems: 'center'
    },
    imgBackBtn: {
        height: 25,
        width: 25,
    },
    textHeading: {
        width: '80%',
        textAlign: 'center',
        color: COLORS.textColor,
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginLeft: 8
    },
    imgPost: {
        height: 350,
        width: '100%',
        marginVertical: 10,
        borderRadius: 5
    },
    viewCaption: {
        padding: 15,
        borderColor: COLORS.boxBorderColor,
        borderRadius: 15,
        borderWidth: 0.7,
        height: 120,
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: '#141414'
    },
    textInputCaption: {
        color: COLORS.textColor,
        fontSize: 16,
    },
    textPostVisible: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.textColor,
        marginHorizontal: 15
    },
    textPostDesc: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.textColorOffWhite,
        marginHorizontal: 17,
        marginTop: 10
    },
    viewOption: {
        marginVertical: 15,
        marginHorizontal: 15,
        padding: 5,
        borderWidth: 0.6,
        borderColor: COLORS.boxBorderColor,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableOptionItem: {
        padding: 10,
        width: "50%",
        alignSelf: 'center',
        borderRadius: 20
    },
    textOptionItem: {
        color: COLORS.textColor,
        fontFamily: FONTS.bold,
        fontSize: 14,
        textAlign: 'center'
    },
    toucableListItem: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    textListItem: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.textColor
    },
    imgArrow: {
        height: 22,
        width: 15,
    },
    viewHorizontalLine: {
        height: 0.9,
        backgroundColor: COLORS.textColorOffWhite,
        marginHorizontal: 8
    },
    touchableUploadBtn: {
        backgroundColor: "#FF0A10",
        padding: 10,
        width: "80%",
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    textuploadBtn: {
        color: COLORS.textColor,
        fontFamily: FONTS.bold,
        fontSize: 16,
        textAlign: 'center'
    },
    textCancelBtn: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 40
    }
});
// Customizable Area End
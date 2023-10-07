import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
//@ts-ignore
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import AddCategoriesController, {
    Categories,
    Props, configJSON,
} from "./AddCategoriesController";
import { COLORS, FONTS } from "../../../components/src/AppGlobals";
import { imgBackButton, imgSearchIcon } from "./assets";
import CheckBox from "@react-native-community/checkbox";

export default class AddCategories extends AddCategoriesController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    renderCategories = (data: { item: Categories, index: number }) => {
        const { item, index } = data
        return (
            <>
                <View style={styles.viewListItem}>
                    <Text style={styles.textListItem}>{item.name}</Text>
                    <View style={styles.viewCheckBox}>
                        <>
                            {/* <CheckBox
                                testID={`checkBoxCategories-${index}`}
                                value={item.isSelected}
                                onValueChange={() => this.checkBoxOnPress(item.id)}
                                lineWidth={2}
                                hideBox={false}
                                boxType={'circle'}
                                tintColors={{ true: '#ff0000', false: '#767577' }}
                                onCheckColor={'#2b49de'}
                                onFillColor={'#2b49de'}
                                onTintColor={'#F4DCF8'}
                                animationDuration={0}
                                style={styles.checkBox}
                            ></CheckBox> */}
                        </>
                    </View>
                </View>
                <View style={styles.viewHowizontalLine}></View>
            </>
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
                        <TouchableOpacity testID="btnBackButton" onPress={() => this.navigateToPostCreationScreen()}
                            style={styles.touchableBackBtn}>
                            <Image source={imgBackButton} style={styles.imgBackBtn} />
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnSaveButton" onPress={() => [this.updateCategories()]}
                            style={styles.touchableSave}>
                            <Text style={styles.textSave}>{configJSON.labelSave}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.textHeading}>{configJSON.labelAddCategoriesHeading}</Text>
                    <Text style={styles.textDesc}>{configJSON.labelDesc}</Text>

                    <View style={styles.viewSearch}>
                        <Image source={imgSearchIcon} style={styles.imgSearch} />
                        <TextInput
                            testID="textInputSearchCategories"
                            style={styles.textInputSearch}
                            placeholder={configJSON.labelSearch}
                            onChangeText={(text) => this.setSearchTag(text)}
                            placeholderTextColor={COLORS.textColorOffWhite}
                        />
                    </View>

                    <View style={styles.viewSelectedItems}>
                        {this.state.selectedCategories.map((item: Categories, index: number) =>
                            <TouchableOpacity key={item.id} testID={`selectedCategories-${index}`}
                                onPress={() => this.handleRemoveCategories(index, item.id)}
                                style={styles.touchableSelectedItem}>
                                <Text style={styles.textSelectedItem}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.viewFlatlist}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            testID="flatListAddCategories"
                            data={this.filterCategories(this.state.categories)}
                            renderItem={this.renderCategories}
                            style={styles.flatlist}
                            keyExtractor={(item: Categories) => item.id.toString()}
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
        alignItems: "center",
        paddingHorizontal: 12,
        justifyContent: 'space-between'
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
        fontFamily: FONTS.regular,
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
    viewSelectedItems: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchableSelectedItem: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#141414',
        marginHorizontal: 6,
        marginVertical: 5
    },
    textSelectedItem: {
        color: COLORS.textColor,
        fontSize: 14,
        fontFamily: FONTS.semiBold
    },
    viewFlatlist: {
        paddingBottom: 10,
        flex: 1
    },
    flatlist: {
        marginTop: 10
    },
    viewListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12
    },
    textListItem: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.semiBold
    },
    viewCheckBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    checkBox: {
        alignSelf: "center",
        height: 22,
        width: 22,
    },
    viewHowizontalLine: {
        height: 0.9,
        backgroundColor: "#141414",
        marginHorizontal: 8,
        marginVertical: 6
    }
});
// Customizable Area End
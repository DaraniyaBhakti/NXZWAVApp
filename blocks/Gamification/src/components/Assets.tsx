import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { imgBlast, imgPush, imgClout, imgPin } from '../assets';
import { AssetCategories } from '../domain/gamification.dto';

export interface Props {
    assetCategories: AssetCategories
}

export default class Assets extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    assets = [
        {
            id: "1",
            img: imgClout,
            heading: 'Clout',
            desc: 'From Engagement',
            amount: this.props.assetCategories.attributes.points.toLocaleString("en-US"),
            percentage: this.props.assetCategories.attributes.clout_changes.percentage+"%"
        },
        {
            id: "2",
            img: imgPush,
            heading: 'Push',
            desc: 'Push Posts',
            amount: this.props.assetCategories.attributes.push_points.toLocaleString("en-US"),
            percentage: ''
        },
        {
            id: "3",
            img: imgPin,
            heading: 'Pins',
            desc: 'Pin to Home',
            amount: this.props.assetCategories.attributes.pin_points.toLocaleString("en-US"),
            percentage: ''
        },
        {
            id: "4",
            img: imgBlast,
            heading: 'Blast',
            desc: 'Broadcast Message',
            amount: this.props.assetCategories.attributes.blast_points.toLocaleString("en-US"),
            percentage: ''
        },

    ]

    renderAssets = (data: any) => {
        const { item, index } = data
        return (
            <>
                <TouchableOpacity testID={`assetItem-${index}`} style={styles.touchableAssetItem}>
                    <View style={styles.viewAssetItemInfo}>
                        <FastImage source={item.img}
                            style={styles.imgAssetItem} />
                        <View>
                            <Text style={styles.textAssetName}>
                                {item.heading}
                            </Text>
                            <Text style={styles.textAssetDesc}>
                                {item.desc}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textAssetPoints}>
                            {item.amount}
                        </Text>
                        <Text style={styles.textAssetPercent}>
                            {item.percentage}
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewAssetHeader}>
                    <Text style={styles.textAssetHeading}>Assets</Text>
                    <Text style={styles.textThisWeek}>This Week</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    testID="flatlistAsset"
                    data={this.assets}
                    renderItem={this.renderAssets}
                    keyExtractor={(item: any) => item.id}
                    ListEmptyComponent={ListEmptyComponent()}
                />
            </View>
        )
    }
}

function ListEmptyComponent() {
    return (
        <View style={styles.listEmptyFlatList}>
            {/* {(this.props.playerNotFound && this.props.loader === false) && */}
            <Text style={styles.textNoAsset}>No Assets Found</Text>
            {/* } */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    viewAssetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    textAssetHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,

    },
    textThisWeek: {
        color: COLORS.textColorOffWhite,
        fontSize: 18
    },
    touchableAssetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewAssetItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgAssetItem: {
        height: 55,
        width: 55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginHorizontal: 5
    },
    textAssetName: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    textAssetDesc: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 15,
        paddingHorizontal: 10
    },
    textAssetPoints: {
        color: COLORS.textColor,
        textAlign: 'right',
        fontSize: 20,
        paddingVertical: 8,
        paddingHorizontal: 5,
        fontFamily: FONTS.bold
    },
    textAssetPercent: {
        color: COLORS.textColorOffWhite,
        textAlign: 'right',
        fontFamily: FONTS.bold,
        paddingHorizontal: 5,
        fontSize:12
    },
    listEmptyFlatList: {
        flex: 1,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
    },
    textNoAsset: {
        fontSize: 18,
        color: COLORS.textColor,
        textAlignVertical: "center",
    },
})
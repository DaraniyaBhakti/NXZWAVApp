import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import StaggeredList from '@mindinventory/react-native-stagger-view';

export interface Props {
    trendingList: any[],
    itemHeights: number[],
    loader: boolean
}

export default class Trending extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    getStaggerGridStyle = (index: number) => {
        return {
            width: (Dimensions.get('window').width - 50) / 3,
            height: this.props.itemHeights[index],
            backgroundColor: 'gray',
            margin: 4,
            borderRadius: 10,
        };
    };

    renderTrendingPosts = (data: any) => {
        const { item, i } = data
        let attributes = item.attributes;
        let image = "";
        if (attributes.images != null && attributes.images.length > 0) {
            image = attributes.images;
        }
        return (
            <TouchableOpacity
                testID={`imgTrendingPost-${i}`}
                onPress={() => { }}
            >
                <View style={this.getStaggerGridStyle(i)} key={item.id}>
                    <View style={styles.avatarImage}>
                        <FastImage
                            source={{
                                uri: image
                                    ? image
                                    : "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg",
                            }}
                            style={styles.img}
                            resizeMode={'cover'}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.viewTrending}>
                <View style={styles.viewTrendingHeader}>
                    <Text style={styles.textTrendingHeading}>Trending Wavs</Text>
                    <Text style={styles.textThisWeek}>This Week</Text>
                </View>
                <StaggeredList
                    testID="staggeredList"
                    data={this.props.trendingList}
                    animationType={"FADE_IN_FAST"}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item: any) => this.renderTrendingPosts(item)}
                    LoadingView={
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator color={"white"} size={"large"} />
                        </View>
                    }
                    numColumns={3}
                    ListEmptyComponent={ListEmptyComponent(this.props.loader)}
                />
            </View>
        )
    }
}

function ListEmptyComponent(loader: boolean) {
    return (
        <View style={styles.listEmptyFlatList}>
            {loader === false &&
                <Text style={styles.textNoPost}>No Posts Found</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    viewTrending: {
        paddingBottom: 20
    },
    viewTrendingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTrendingHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,
        marginBottom: 20
    },
    textThisWeek: {
        color: COLORS.textColorOffWhite
    },
    activityIndicatorWrapper: {
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 0,
        alignSelf: "stretch",
    },
    avatarImage: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
    },
    img: {
        width: "100%",
        height: "100%",
    },
    listEmptyFlatList: {
        flex: 1,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
    },
    textNoPost: {
        fontSize: 18,
        color: COLORS.textColor,
        textAlignVertical: "center",
    },
})
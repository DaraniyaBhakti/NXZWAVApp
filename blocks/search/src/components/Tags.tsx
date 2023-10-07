import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { Hashtags, PostInfo } from '../SearchController';

export interface Props {
    tagsList: any[],
    loader: boolean,
    navigateToTagsScreen: (id: number) => void
}

export default class Tags extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }


    renderTagsImages = (data: { item: PostInfo }) => {
        return (
            <FastImage
                source={{
                    uri: data.item.attributes.images ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg"
                }}
                style={styles.imgTags} />
        )
    }

    renderTags = (data: { item: Hashtags, index: number }) => {
        const { item, index } = data
        return (
            <>
                <View style={styles.viewTagsItem}>
                    <View style={styles.viewTagHeader}>
                        <TouchableOpacity testID={`tagsItem-${index}`} onPress={() => this.props.navigateToTagsScreen(item.attributes.id)}>
                            <Text style={styles.textTag}>#{item.attributes.name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.textTagWavs}>{item.attributes.taggings_count} wavs</Text>
                    </View>
                    <View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            testID={`flatListTagsImage-${index}`}
                            data={item.attributes.post_info.data}
                            renderItem={this.renderTagsImages}
                            keyExtractor={(item: any) => item.id}

                        />
                    </View>
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={styles.viewTags}>
                <FlatList
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    testID="flatListTags"
                    data={this.props.tagsList}
                    renderItem={this.renderTags}
                    keyExtractor={(item: any) => item.id}
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
                <Text style={styles.textNoPost}>No Tags Found</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    viewTags: {
        marginBottom: 20
    },
    imgTags: {
        margin: 2,
        height: 120,
        width: 120,
        borderRadius: 8
    },
    viewTagsItem: {
        marginBottom: 15
    },
    viewTagHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    textTag: {
        color: 'white',
        fontFamily: FONTS.bold,
        fontSize: 17
    },
    textTagWavs: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold
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
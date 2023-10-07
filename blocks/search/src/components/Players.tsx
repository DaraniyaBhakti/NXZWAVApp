import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { imgBlueUpArrow, imgRedDownArrow } from '../assets';
import { PlayersItem } from '../SearchController';

export interface Props {
    playersList: any[],
    isSearchResults: boolean,
    playerNotFound: boolean,
    loader: boolean
}

export default class Players extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    renderPlayers = (data: { item: PlayersItem, index: number }) => {
        const { item, index } = data
        return (
            <>
                <TouchableOpacity testID={`playersItem-${index}`} style={styles.touchaplePlayerItem}>
                    <View style={styles.viewPlayerItemInfo}>
                        <View>
                            <Text style={styles.textPlayerRank}>
                                {item.attributes.player.rank  ??  0}
                            </Text>
                            <Image source={(index % 2 == 0) ? imgRedDownArrow : imgBlueUpArrow} style={styles.imgPlayerArrow} />
                        </View>
                        <FastImage source={{ uri: item.attributes.player.profile_pic ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                            style={styles.imgPlayer} />
                        <View>
                            <Text style={styles.textPlayerName}>
                                {item.attributes.player.name}
                            </Text>
                            <Text style={styles.textPlayerRole}>
                                {item.attributes.player.role}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textPlayerPoints}>
                            {item.attributes.player.points ?? 0} <Text style={{ color: COLORS.textColorBlue }}> pts</Text></Text>
                        <Text style={styles.textPlayerReacts}>
                            {item.attributes.player.reacts ?? '0 reacts'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    render() {
        return (
            <View>
                <Text style={styles.textPlayersHeading}>Top 100 Players</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    testID="flatListPlayers"
                    data={this.props.playersList}
                    renderItem={this.renderPlayers}
                    keyExtractor={(item: any) => item.id}
                    ListEmptyComponent={ListEmptyComponent(this.props.playerNotFound, this.props.loader)}
                />
            </View>
        )
    }
}
function ListEmptyComponent(playerNotFound: boolean, loader: boolean) {
    return (
        <View style={styles.listEmptyFlatList}>
            {(playerNotFound && loader === false) &&
                <Text style={styles.textNoPost}>No User Found</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    textPlayersHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,
        marginBottom: 20
    },
    touchaplePlayerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewPlayerItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textPlayerRank: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
        paddingHorizontal: 5,
        paddingVertical: 8
    },
    imgPlayerArrow: {
        height: 10,
        width: 10,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    imgPlayer: {
        height: 35,
        width: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginHorizontal: 5
    },
    textPlayerName: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    textPlayerRole: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 14,
        paddingHorizontal: 10
    },
    textPlayerPoints: {
        color: COLORS.textColor,
        textAlign: 'right',
        fontSize: 15,
        paddingVertical: 8,
        paddingHorizontal: 5,
        fontFamily: FONTS.bold
    },
    textPlayerReacts: {
        color: COLORS.textColorOffWhite,
        textAlign: 'right',
        fontFamily: FONTS.bold,
        paddingHorizontal: 5
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
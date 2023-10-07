import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { WatchersItem } from '../domain/gamification.dto';

export interface Props {
    watchers: WatchersItem[]
}

export default class Watchers extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    
    renderPlayers = (data: {item: WatchersItem, index: number}) => {
        const { item, index } = data
        return (
            <>
                <TouchableOpacity testID={`playersItem-${index}`} style={styles.touchableWatcherItem}>
                    <View style={styles.viewWatcherItemInfo}>
                        <View>
                            <Text style={styles.textWatcherRank}>
                                {index+1}
                            </Text>
                        </View>
                        <FastImage source={{ uri:  item.attributes.user_profile_info_id.profile_pic ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                            style={styles.imgWatcher} />
                        <View>
                            <Text style={styles.textWatcherName}>
                                {item.attributes.user_profile_info_id.user_name}
                            </Text>
                            <Text style={styles.textWatcherActions}>
                                <Text style={styles.textActions}>{item.attributes.action.action.toLocaleString("en-US")}</Text> Actions
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textWatcherPoints}>
                            {item.attributes.action.points.toLocaleString("en-US")} <Text style={styles.textPts}> pts</Text></Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewWatcherHeader}>
                    <Text style={styles.textWatcherHeading}>Top 100 Watchers</Text>
                    <Text style={styles.textThisWeek}>This Week</Text>
                </View>
                <View style={{paddingBottom:10,flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    testID="flatlistWatchers"
                    data={this.props.watchers}
                    renderItem={this.renderPlayers}
                    keyExtractor={(item: any) => item.id}
                    ListEmptyComponent={ListEmptyComponent()}
                />
                </View>
            </View>
        )
    }
}

function ListEmptyComponent() {
    return (
        <View style={styles.listEmptyFlatList}>
            {/* {(this.props.playerNotFound && this.props.loader === false) && */}
            <Text style={styles.textNoWatcher}>No Watchers Found</Text>
            {/* } */}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex:1
    },
    viewWatcherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    textWatcherHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,

    },
    textThisWeek: {
        color: COLORS.textColorOffWhite,
        fontSize: 18
    },
    touchableWatcherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewWatcherItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textWatcherRank: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
        paddingHorizontal: 5,
        paddingVertical: 8
    },
    imgWatcher: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginHorizontal: 5,
        marginLeft: 10
    },
    textWatcherName: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    textWatcherActions: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 14,
        paddingHorizontal: 10
    },
    textActions: {
        color: COLORS.textColorBlue
    },
    textPts: { color: COLORS.textColorBlue },
    textWatcherPoints: {
        color: COLORS.textColor,
        textAlign: 'right',
        fontSize: 15,
        paddingVertical: 8,
        paddingHorizontal: 5,
        fontFamily: FONTS.bold
    },
    listEmptyFlatList: {
        flex: 1,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
    },
    textNoWatcher: {
        fontSize: 18,
        color: COLORS.textColor,
        textAlignVertical: "center",
    },
})
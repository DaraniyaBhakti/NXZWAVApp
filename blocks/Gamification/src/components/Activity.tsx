import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { UserActivity } from '../domain/gamification.dto';

export interface Props {
    activityFeeds: UserActivity[]
}

export default class Activity extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    renderActivity = (data: any) => {
        const { item, index } = data
        let message = item.msg ? item.msg.split(":") : [];
        return (
            <>
                <TouchableOpacity testID={`playersItem-${index}`} style={styles.touchapleActivityItem}>
                    <View style={[styles.viewActivityItemInfo]}>
                        <FastImage source={{ uri: item.profile_img ??"https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                            style={styles.imgActivity} />
                        <View style={styles.viewText}>
                            <Text style={styles.textUserName}>
                                {item.name}
                            </Text>
                            <Text style={styles.textActivityMessage}>
                                <Text style={{ color: COLORS.textColorBlue }}>{message[0]}:</Text> {message[1]}
                            </Text>
                        </View>
                    </View>
                    <FastImage source={{ uri:  item.post_imag ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                        style={styles.imgPost} />
                </TouchableOpacity>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewActivityHeader}>
                    <Text style={styles.textActivityHeading}>Activities</Text>
                    <Text style={styles.textThisWeek}>This Week</Text>
                </View>
                <View style={{paddingBottom:10,flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    testID="flatlistActivity"
                    data={this.props.activityFeeds}
                    renderItem={this.renderActivity}
                    keyExtractor={(item: UserActivity,index:number) => index?.toString()}
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
            <Text style={styles.textNoActivity}>No Activity Found</Text>
            {/* } */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex:1
    },
    viewActivityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    textActivityHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,

    },
    textThisWeek: {
        color: COLORS.textColorOffWhite,
        fontSize: 18
    },
    touchapleActivityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewActivityItemInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imgActivity: {
        height: 48,
        width: 48,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginHorizontal: 5,
        marginLeft: 10
    },
    imgPost: {
        height: 52,
        width: 52,
        borderRadius: 5,
        alignSelf:'flex-end'
    },
    textUserName: {
        color: COLORS.textColor,
        fontSize: 15,
        fontFamily: FONTS.bold,
        paddingVertical: 8
    },
    textActivityMessage: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 13,
    },
    viewText: {
        width: '50%',
        marginLeft: 5
    },
    listEmptyFlatList: {
        flex: 1,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
    },
    textNoActivity: {
        fontSize: 18,
        color: COLORS.textColor,
        textAlignVertical: "center",
    },
})
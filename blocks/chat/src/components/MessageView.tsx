import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { COLORS, FONTS } from '../../../../components/src/AppGlobals'
import FastImage from 'react-native-fast-image'
import { IMessage } from '../PmChatViewController'
import { getTimeFromDateString } from '../../../../framework/src/BlockHelper'
import { defaultProfileImage } from '../../../../framework/src/AppConstant'

export interface Props {
    messageData: IMessage;
}
export class MessageView extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    message = this.props.messageData.attributes;
    render() {
        return (
            <View style={[styles.container, {
                alignSelf: this.message.profile === null ? 'flex-end' : 'flex-start',
                marginRight: this.message.profile === null ? 10 : 0,
                backgroundColor: this.message.profile === null ? COLORS.blue : COLORS.windowBackground,
            }]}>
                {(this.message.image !== null) &&
                    <FastImage source={{ uri: this.message.image ?? defaultProfileImage("user") }}
                        style={styles.imgUpload} >
                    </FastImage>
                }
                <View style={styles.flexRow}>
                    {this.message.profile && <View style={styles.viewImgUser}>
                        <FastImage source={{ uri: this.message?.profile?.profile_pic !== null ? this.message?.profile?.profile_pic : defaultProfileImage("user") }}
                            style={styles.imgUserPic} />
                    </View>}

                    <View style={styles.flex1}>
                        <View style={styles.viewMessage}>
                            <Text style={styles.textUserName}>{this.message?.profile?.user_name}</Text>

                            <View style={styles.viewTime}>
                                <Text style={styles.textTime}>{getTimeFromDateString(this.message.message.created_at)}</Text>
                            </View>
                        </View>
                        <Text style={styles.textMessage}>{this.props.messageData.attributes.message.message}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        borderRadius: 20,
        borderWidth: 4,
        width: '80%',
        borderColor: '#141414',
        padding: 10,
    },
    imgUserPic: {
        height: 30,
        width: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginRight: 10
    },
    imagePlus: {
        height: 25,
        width: 25,
    },
    imgUpload: {
        width: "100%",
        height: 250,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    viewUploadPlusImg: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    flexRow: {
        flexDirection: 'row'
    },
    viewImgUser: {
        borderRadius: 20
    },
    flex1: {
        flex: 1
    },
    viewMessage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    textUserName: {
        color: COLORS.textColor,
        fontFamily: FONTS.bold
    },
    viewTime: {
        backgroundColor: '#141414',
        padding: 5,
        borderRadius: 15,
        paddingHorizontal: 15
    },
    textTime: {
        color: COLORS.textColor,
        fontSize: 12
    },
    textMessage: {
        color: COLORS.textColor,
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0.8
    }
})
export default MessageView
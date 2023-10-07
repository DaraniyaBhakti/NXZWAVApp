import { Text, View, StyleSheet, Image, ImageBackground,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { COLORS, FONTS } from '../../../../components/src/AppGlobals'
import { imgLock } from '../assets'
import FastImage from 'react-native-fast-image'
import { IMessage } from '../PmChatViewController'
import { defaultProfileImage } from '../../../../framework/src/AppConstant'

export interface Props {
  messageData: IMessage;
  unlockMessage: (messageId: number) => void
}
export class LockedMessage extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  message = this.props.messageData.attributes;
  render() {
    return (
      <View style={[styles.container, {
        alignSelf: this.message.profile === null ? 'flex-end' : 'flex-start',
        marginRight: this.message.profile === null ? 10 : 0
      }]}>
        {(this.message.image !== null) &&
          <ImageBackground source={{ uri: defaultProfileImage("") }}
            style={styles.imgUpload} blurRadius={25} >
            <Image source={imgLock} style={styles.imagePlus} />
          </ImageBackground>
        }

        <View style={styles.viewMessage}>
          <View style={styles.viewImgUser}>
            <FastImage source={{ uri: this.message.profile?.profile_pic ?? defaultProfileImage("user") }}
              style={styles.imgUserPic} />
          </View>
          <View style={styles.flex1}>
            <View style={styles.viewLockUserName}></View>
            <View style={styles.viewLockMessage}></View>
            <View style={styles.viewLockMessage}></View>
          </View>
        </View>
        <TouchableOpacity testID='unlockBtn' onPress={() => this.props.unlockMessage(this.message.id)} style={styles.touchableUnlock}>
          <Text style={styles.textUnlock}>Unlock - {this.message.points}</Text>
        </TouchableOpacity>
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
    height: 65,
    width: 65,
  },
  imgUpload: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  viewMessage: {
    flexDirection: 'row',
    marginTop: 20
  },
  viewImgUser: {
    borderRadius: 20
  },
  flex1: {
    flex: 1
  },
  viewLockUserName: {
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    width: '100%'
  },
  viewLockMessage: {
    height: 10,
    backgroundColor: '#141414',
    borderRadius: 10,
    width: '80%',
    marginTop: 10
  },
  textUnlock: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    fontSize: 15
  },
  touchableUnlock: {
    backgroundColor: 'red',
    borderRadius: 20,
    marginTop: 10,
    padding: 10
  }
})
export default LockedMessage
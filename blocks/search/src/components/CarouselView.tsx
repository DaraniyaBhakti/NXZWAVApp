import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { imgFlashIcon } from '../assets';
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { CarouselPost } from '../SearchController';

export interface Props {
  carouselList: CarouselPost[],
  activeSlide: number,
  setActiveSlide: (index: number) => void,
  navigation:any
}

export default class CarouselView extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.carouselList.length}
        activeDotIndex={this.props.activeSlide}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={styles.paginationDotStyle}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotScale={1}
      />
    );
  }

  renderCarousel(data: { item: CarouselPost, index: number }) {
    const { item, index } = data
    return (
      <FastImage source={{ uri: item.attributes.images ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
        style={styles.imgCarouselBg}>
        <LinearGradient colors={['black', 'transparent', 'black']} style={styles.linearGradient}>
          <TouchableOpacity testID={`flashBtn-${index}`} onPress={() => {this.props.navigation.navigate("Hashtags") }}>
            <Image source={imgFlashIcon} style={styles.imgFlash} />
          </TouchableOpacity>
          <View style={styles.viewCarouselDetail}>
            <Text style={styles.textCarosuelUpdatedAt}>Posted {item.attributes.updated_at}</Text>
            <Text style={styles.textCarouselDesc}>{item.attributes.description}</Text>
            <View style={styles.viewCarouselInfo}>
              <View style={styles.viewCarouselUserDetail}>
                <FastImage source={{ uri: item.attributes.user_profile_info_id.profile_pic ?? "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg" }}
                  style={styles.imgCarouselUserPic} />
                <View>
                  <Text style={styles.textCaruselUserName}>{item.attributes.user_profile_info_id.user_name}</Text>
                  <Text style={styles.textCarouselRole}>{item.attributes.user_profile_info_id.role}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.textCarouselPts}>{item.attributes.user_profile_info_id.points}<Text style={styles.colorBlue}>  pts</Text> </Text>
                <Text style={styles.textCaoruselReacts}>
                  {item.attributes.reacts ?? "0 reacts"}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </FastImage>

    )
  }

  render() {
    return (
      <>
        <Carousel
          testID="carousel"
          data={this.props.carouselList}
          renderItem={this.renderCarousel}
          sliderWidth={380}
          itemWidth={380}
          onSnapToItem={(index) => this.props.setActiveSlide(index)}
        />
        {this.pagination}
      </>
    )
  }
}

const styles = StyleSheet.create({
  paginationDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: COLORS.textColorBlue
  },
  paginationInactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: COLORS.textColorOffWhite
  },
  imgCarouselBg: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  imgFlash: {
    height: 27,
    width: 27,
    top: 0,
    left: 0,
    alignSelf: 'flex-end',
    margin: 10
  },
  viewCarouselDetail: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  textCarosuelUpdatedAt: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold,
    fontSize: 13
  },
  textCarouselDesc: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 22,
    marginBottom: 15
  },
  viewCarouselInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewCarouselUserDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgCarouselUserPic: {
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.textColorOffWhite,
    marginRight: 10
  },
  textCaruselUserName: {
    color: COLORS.textColor,
    fontFamily: FONTS.bold,
    fontSize: 18
  },
  textCarouselRole: {
    color: COLORS.textColorOffWhite,
    fontFamily: FONTS.bold
  },
  textCarouselPts: {
    color: COLORS.textColor,
    textAlign: 'right',
    fontFamily: FONTS.bold
    ,
  },
  textCaoruselReacts: {
    color: COLORS.textColorOffWhite,
    textAlign: 'right',
    fontFamily: FONTS.bold,
  },
  colorBlue: {
    color: COLORS.textColorBlue
  },
  linearGradient: {
    flex: 1,
  },
})
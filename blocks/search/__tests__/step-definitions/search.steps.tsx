import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import Search from '../../src/Search'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'
import { View } from 'react-native'
import CarouselView from '../../src/components/CarouselView'
import Trending from '../../src/components/Trending'
import Tags from '../../src/components/Tags'
import Players from '../../src/components/Players'
const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
  },
  id: 'Search'
}

const feature = loadFeature('./__tests__/features/search-scenario.feature')

const trendingItem = {
  "item": {
    "id": "70",
    "type": "user_post",
    "attributes": {
      "id": 70,
      "description": "",
      "created_at": "10 days ago",
      "locked": true,
      "unlocked_by": [],
      "points": 0,
      "updated_at": "2023-05-08T14:31:05.487Z",
      "promote": false,
      "tag_list": [],
      "images": ["https://thumbs.dreamstime.com/b/aster-flowers-art-design-26968847.jpg"],
      "categories": [],
      "counts": {
        "upvote_count": 0,
        "downvote_count": 0,
        "repost_count": 0,
        "comment_count": 0
      },
      "user_profile_info_id": {
        "id": 13,
        "user_name": "nxzsound",
        "role": "Label",
        "level": "Level 1",
        "points": 100,
        "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"
      }
    }
  },
  "i": 29
}

const tagItem = {
  "item": {
    "id": "3",
    "type": "tagged_post",
    "attributes": {
      "id": 3,
      "name": "rup. producer",
      "taggings_count": 6,
      "post_info": {
        "data": [
          {
            "id": "106",
            "type": "user_post",
            "attributes": {
              "id": 106,
              "description": "Save plants",
              "created_at": "2 days ago",
              "locked": true,
              "unlocked_by": [],
              "points": 200,
              "updated_at": "2023-05-16T12:49:17.193Z",
              "promote": true,
              "admin_pinned": false,
              "tag_list": [
                "rup. producer",
                "devloper"
              ],
              "images": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBVZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35a985bd977638d0412e28ae9c907fe9a6260b17/IMG_0002.JPG"
              ,
              "categories": [
                "Artist",
                "A&R"
              ],
              "counts": {
                "upvote_count": 0,
                "downvote_count": 0,
                "repost_count": 0,
                "comment_count": 0
              },
              "user_profile_info_id": {
                "id": 13,
                "user_name": "nxzsound",
                "role": "Label",
                "level": "Level 1",
                "points": 100,
                "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"
              }
            }
          },
        ]
      }
    }
  },
  "index": 9,
  "separators": {}
}

const tagPostItem = {
  "item": {
    "id": "91",
    "type": "user_post",
    "attributes": {
      "id": 91,
      "description": "Helooo world",
      "created_at": "8 days ago",
      "locked": true,
      "unlocked_by": [],
      "points": 8,
      "updated_at": "2023-05-10T13:38:29.731Z",
      "promote": true,
      "tag_list": [
        "actor"
      ],
      "images": [
        "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBRdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--688bea011722524aef57cddace920724b6ebd44b/IMG_0111.HEIC"
      ],
      "categories": [
        "Booking Agent",
        "Barber",
        "Fashion Designer"
      ],
      "counts": {
        "upvote_count": 0,
        "downvote_count": 0,
        "repost_count": 0,
        "comment_count": 0
      },
      "user_profile_info_id": {
        "id": 13,
        "user_name": "nxzsound",
        "role": "Label",
        "level": "Level 1",
        "points": 100,
        "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"
      }
    }
  },
  "index": 12,
}

const playerItem = {
  "item": {
    "id": "11",
    "type": "leaderboard",
    "attributes": {
      "id": 11,
      "player": {
        "user_id": 11,
        "name": "Mitang",
        "rank": null,
        "role": "Booking Agent",
        "points": 100,
        "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/1fsj3sqq1v055xjxdcrd73vnmfr4",
        "reacts": "25654 reacts"
      }
    }
  },
  "index": 2
}

const tagListResponse = {
  "data": [
    {
      "id": "12",
      "type": "tagged_post",
      "attributes": {
        "id": 12,
        "name": "Work",
        "taggings_count": 1,
        "post_info": {
          "data": [
            {
              "id": "96",
              "type": "user_post",
              "attributes": {
                "id": 96,
                "description": "Hello apple",
                "created_at": "6 days ago",
                "locked": true,
                "unlocked_by": [],
                "points": 360.58,
                "updated_at": "2023-05-12T13:01:57.404Z",
                "promote": true,
                "tag_list": [
                  "rup. producer",
                  "actor",
                  "football",
                  "wef",
                  "Work"
                ],
                "images": [
                  "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--713825e51135de2776ee345904aaa2f57eb580f2/IMG_0012.PNG"
                ],
                "categories": [
                  "Artist",
                  "Graphic Designer",
                  "Producer"
                ],
                "counts": {
                  "upvote_count": 0,
                  "downvote_count": 0,
                  "repost_count": 0,
                  "comment_count": 0
                },
                "user_profile_info_id": {
                  "id": 13,
                  "user_name": "nxzsound",
                  "role": "Label",
                  "level": "Level 1",
                  "points": 100,
                  "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"
                }
              }
            }
          ]
        }
      }
    },
    {
      "id": "4",
      "type": "tagged_post",
      "attributes": {
        "id": 4,
        "name": "developer",
        "taggings_count": 5,
        "post_info": {
          "data": [
            {
              "id": "51",
              "type": "user_post",
              "attributes": {
                "id": 51,
                "description": "wefwe",
                "created_at": "13 days ago",
                "locked": false,
                "unlocked_by": [],
                "points": 555,
                "updated_at": "2023-05-05T12:03:07.257Z",
                "promote": true,
                "tag_list": [
                  "developer"
                ],
                "images": null,
                "categories": [
                  "A&R",
                  "Clothing Stylist"
                ],
                "counts": {
                  "upvote_count": 0,
                  "downvote_count": 0,
                  "repost_count": 0,
                  "comment_count": 0
                },
                "user_profile_info_id": {
                  "id": 13,
                  "user_name": "nxzsound",
                  "role": "Label",
                  "level": "Level 1",
                  "points": 100,
                  "profile_pic": "https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"
                }
              }
            },

          ]
        }
      }
    },
  ]
}

const carouselItem = {
  item: {
    "id": "119",
    "type": "promoted_post",
    "attributes": {
      "description": "test waves",
      "updated_at": "about 1 month ago",
      "images": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBVdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4b972c196c1653e9dfea13c79a6b634da863973e/image-3.png",
      "user_profile_info_id": {
        "id": 8,
        "user_name": "Mitang",
        "role": "A&R",
        "points": 1525,
        "profile_pic": null
      },
      "reacts": "46199 reacts"
    }
  },
  "index": 1
}

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to search', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let CarouselViewWrapper: ShallowWrapper
    let TrendingWrapper: ShallowWrapper
    let TagsWrapper: ShallowWrapper
    let PlayersWrapper: ShallowWrapper
    let instance: Search
    let carouselInstance: CarouselView
    let trendingInstance: Trending
    let tagsInstance: Tags
    let playersInstance: Players

    given('I am a User loading search', () => {
      SearchWrapper = shallow(<Search {...screenProps} />)
      CarouselViewWrapper = shallow(<CarouselView
        carouselList={[]}
        activeSlide={0}
        setActiveSlide={function (index: number): void { }}
        {...screenProps}
      />)
      TrendingWrapper = shallow(<Trending trendingList={[]} itemHeights={[]} loader={false} />)
      TagsWrapper = shallow(<Tags tagsList={[]} navigateToTagsScreen={function (id: any): void { }} loader={false} />)
      PlayersWrapper = shallow(<Players playersList={[]} isSearchResults={false} playerNotFound={true} loader={false} />)
    })

    when('I navigate to the search', () => {
      instance = SearchWrapper.instance() as Search
      carouselInstance = CarouselViewWrapper.instance() as CarouselView
      trendingInstance = TrendingWrapper.instance() as Trending
      tagsInstance = TagsWrapper.instance() as Tags
      playersInstance = PlayersWrapper.instance() as Players
    })

    then('I can enter text with out errors', () => {
      let textInputComponent = SearchWrapper.findWhere((node) => node.prop('testID') === 'textInputSearch');
      textInputComponent.simulate('changeText', 'ttt');
      textInputComponent.simulate('submitEditing')
      expect(textInputComponent).toHaveLength(1);
    });

    then('I can select the button with with out errors', () => {
      instance.setActiveSlide(2);
      instance.navigateToTagsScreen(3);
      let carousel = CarouselViewWrapper.findWhere(
        (node) => node.prop("testID") === "carousel",
      );
      carousel.renderProp("renderItem")(trendingItem);
      carousel.simulate("snapToItem")
      carousel.simulate("press");
      expect(carousel).toHaveLength(1);

      let itemWrapper = shallow(<View>{carouselInstance.renderCarousel(carouselItem)}</View>);
      let flashBtn = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "flashBtn-" + trendingItem.i,
      );

    })

    then("I can select the Trending option with with out errors", () => {
      let btnOptionTrending = SearchWrapper.findWhere(
        (node) => node.prop("testID") === "btnOptionTrending",
      );
      btnOptionTrending.simulate("press");
      expect(btnOptionTrending).toHaveLength(1);

      let flatList = TrendingWrapper.findWhere(
        (node) => node.prop("testID") === "staggeredList",
      );
      flatList.renderProp("renderItem")(trendingItem);
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);

      let itemWrapper = shallow(<View>{trendingInstance.renderTrendingPosts(trendingItem)}</View>);
      let tagSelectComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "imgTrendingPost-" + trendingItem.i,
      );
      tagSelectComponent.simulate("press");
      expect(tagSelectComponent).toHaveLength(1);


    });

    then("I can select the Tags option with with out errors", () => {
      let btnOptionTags = SearchWrapper.findWhere(
        (node) => node.prop("testID") === "btnOptionTags",
      );
      btnOptionTags.simulate("press");
      expect(btnOptionTags).toHaveLength(1);

      let flatList = TagsWrapper.findWhere(
        (node) => node.prop("testID") === "flatListTags",
      );
      flatList.renderProp("renderItem")(tagItem);
      flatList.props().keyExtractor({ id: 3 });
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);

      let itemWrapper = shallow(<View>{tagsInstance.renderTags(tagItem)}</View>);
      let tagSelectComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "tagsItem-" + tagItem.index,
      );
      tagSelectComponent.simulate("press");
      expect(tagSelectComponent).toHaveLength(1);

      let flatListImage = itemWrapper.findWhere(
        (node) => node.prop("testID") === "flatListTagsImage-" + tagItem.index,
      );
      flatListImage.renderProp("renderItem")(tagPostItem);
      flatListImage.props().keyExtractor({ id: 3 });
      flatListImage.simulate("press");
      expect(flatListImage).toHaveLength(1);
    });

    then("I can select the Players option with with out errors", () => {
      let btnOptionPlayers = SearchWrapper.findWhere(
        (node) => node.prop("testID") === "btnOptionPlayers",
      );
      btnOptionPlayers.simulate("press");
      expect(btnOptionPlayers).toHaveLength(1);

      let flatList = PlayersWrapper.findWhere(
        (node) => node.prop("testID") === "flatListPlayers",
      );
      flatList.renderProp("renderItem")(playerItem);
      flatList.props().keyExtractor({ id: 3 });
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);

      let itemWrapper = shallow(<View>{playersInstance.renderPlayers(playerItem)}</View>);
      let tagSelectComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "playersItem-" + playerItem.index,
      );
      tagSelectComponent.simulate("press");
      expect(tagSelectComponent).toHaveLength(1);
    });

    then("Tags List API load with out errors", () => {
      const apiGetTagsList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetTagsList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetTagsList.messageId,
      );
      apiGetTagsList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetTagsList = apiGetTagsList.messageId;
      runEngine.sendMessage("Unit Test", apiGetTagsList);
      expect(SearchWrapper).toBeTruthy();
    });

    then("Trending List API load with out errors", () => {
      const apiGetTrendingList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetTrendingList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetTrendingList.messageId,
      );
      apiGetTrendingList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetTrendingList = apiGetTrendingList.messageId;
      runEngine.sendMessage("Unit Test", apiGetTrendingList);
      expect(SearchWrapper).toBeTruthy();
    });

    then("Players List API load with out errors", () => {
      const apiGetPlayersList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetPlayersList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetPlayersList.messageId,
      );
      apiGetPlayersList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetPlayersList = apiGetPlayersList.messageId;
      runEngine.sendMessage("Unit Test", apiGetPlayersList);
      expect(SearchWrapper).toBeTruthy();
    });

    then("Carousel List API load with out errors", () => {
      const apiGetCarouselList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetCarouselList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetCarouselList.messageId,
      );
      apiGetCarouselList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetCarouselList = apiGetCarouselList.messageId;
      runEngine.sendMessage("Unit Test", apiGetCarouselList);
      expect(SearchWrapper).toBeTruthy();
    });

    then("Search List API load with out errors", () => {
      const apiGetSearchList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetSearchList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetSearchList.messageId,
      );
      apiGetSearchList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetSearchList = apiGetSearchList.messageId;
      runEngine.sendMessage("Unit Test", apiGetSearchList);
      expect(SearchWrapper).toBeTruthy();

      const apiGetSearchList2: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetSearchList2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetSearchList2.messageId,
      );
      apiGetSearchList2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ message: "No user" })),
      );
      instance.apiGetSearchList = apiGetSearchList2.messageId;
      runEngine.sendMessage("Unit Test", apiGetSearchList2);
      expect(SearchWrapper).toBeTruthy();

      instance.setState({ selectedOption: "Tags" })
      const apiGetSearchListTags: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetSearchListTags.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetSearchListTags.messageId,
      );
      apiGetSearchListTags.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetSearchList = apiGetSearchListTags.messageId;
      runEngine.sendMessage("Unit Test", apiGetSearchListTags);
      expect(SearchWrapper).toBeTruthy();


      instance.setState({ selectedOption: "Trending" })
      const apiGetSearchListTrending: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetSearchListTrending.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetSearchListTrending.messageId,
      );
      apiGetSearchListTrending.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(tagListResponse)),
      );
      instance.apiGetSearchList = apiGetSearchListTrending.messageId;
      runEngine.sendMessage("Unit Test", apiGetSearchListTrending);
      expect(SearchWrapper).toBeTruthy();
    });

    then('search will load with out errors', () => {
      instance.getToken()
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(SearchWrapper).toBeTruthy()
    })
  })
})

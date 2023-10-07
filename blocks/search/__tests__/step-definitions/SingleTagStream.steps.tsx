import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'
import { View } from 'react-native'
import SingleTagStream from '../../src/SingleTagStream'

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
  },
  id: 'Search'
}

const feature = loadFeature('./__tests__/features/SingleTagStream-scenario.feature')


defineFeature(feature, test => {

  const postItem = {
    "item": {
      "id": "95",
      "type": "user_post",
      "attributes": {
        "id": 95,
        "description": "Hello work 2023",
        "created_at": "6 days ago",
        "locked": false,
        "unlocked_by": [],
        "points": 551.99,
        "updated_at": "2023-05-12T11:51:12.679Z",
        "promote": true,
        "tag_list": [
          "developer",
          "football",
          "actor",
          "aman",
          "devloper",
          "True"
        ],
        "images": [
          "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBSdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--13f8f6b6c6fe5504c944f11bf253a076f983dbec/IMG_0111.HEIC"
        ],
        "categories": [
          "Artist",
          "A&R",
          "Booking Agent",
          "Barber",
          "Clothing Stylist",
          "Fashion Designer",
          "Investor",
          "Label",
          "Model"
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
    "index": 0,
  }
  const lockedPostItem = {
    "item": {
      "id": "55",
      "type": "user_post",
      "attributes": {
        "id": 55,
        "description": "Sunset",
        "created_at": "10 days ago",
        "locked": true,
        "unlocked_by": [],
        "points": 550,
        "updated_at": "2023-05-08T11:39:21.266Z",
        "promote": true,
        "tag_list": [
          "devloper",
          "wef",
          "grer"
        ],
        "images": null,
        "categories": [
          "Booking Agent",
          "Barber",
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
    "index": 2,
    "separators": {}
  }
  const postResponse = {
    data: {
      "id": "6",
      "type": "tagged_post",
      "attributes": {
        "id": 6,
        "name": "wef",
        "taggings_count": 10,
        "post_info": {
          "data": [
            {
              "id": "49",
              "type": "user_post",
              "attributes": {
                "id": 49,
                "description": "wefwe",
                "created_at": "14 days ago",
                "locked": false,
                "unlocked_by": [],
                "points": 555,
                "updated_at": "2023-05-04T14:01:29.779Z",
                "promote": true,
                "tag_list": [
                  "grer",
                  "wef"
                ],
                "images": ["https://minio.b294793.dev.eastus.az.svc.builder.cafe/sbucket/dp4grsmpsot7okrdwxmyqejqhpxj"],
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
            {
              "id": "53",
              "type": "user_post",
              "attributes": {
                "id": 53,
                "description": "Hello world",
                "created_at": "10 days ago",
                "locked": false,
                "unlocked_by": [],
                "points": 550,
                "updated_at": "2023-05-08T10:48:55.509Z",
                "promote": true,
                "tag_list": [
                  "football",
                  "wef",
                  "grer",
                  "devloper",
                  "actor"
                ],
                "images": null,
                "categories": [
                  "A&R",
                  "Booking Agent",
                  "Fashion Designer",
                  "Hair Stylist",
                  "Investor",
                  "Song Writer"
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
    }
  }
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to SingleTagStream', ({ given, when, then }) => {
    let SingleTagStreamWrapper: ShallowWrapper
    let instance: SingleTagStream

    given('I am a User loading SingleTagStream', () => {
      SingleTagStreamWrapper = shallow(<SingleTagStream {...screenProps} />)
    })

    when('I navigate to the SingleTagStream', () => {
      instance = SingleTagStreamWrapper.instance() as SingleTagStream
    })

    then('I can select the button with with out errors', () => {
      let btnBackButton = SingleTagStreamWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackButton",
      );
      btnBackButton.simulate("press");
      expect(btnBackButton).toHaveLength(1);
    })

    then("I can select the flatlist with with out errors", () => {
      let flatList = SingleTagStreamWrapper.findWhere(
        (node) => node.prop("testID") === "flatListPosts",
      );
      flatList.renderProp("renderItem")(postItem);
      flatList.simulate("press");
      flatList.props().keyExtractor({ id: 3 });
      expect(flatList).toHaveLength(1);

      let itemWrapper = shallow(<View>{instance.renderPosts(postItem)}</View>);

      let moreBtn = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "moreBtn-" + postItem.index,
      );
      moreBtn.simulate("press");
      expect(moreBtn).toHaveLength(1);

      let commentPostItem = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "commentPostItem-" + postItem.index,
      );
      commentPostItem.simulate("press");
      expect(commentPostItem).toHaveLength(1);

      let repostPostItem = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "repostPostItem-" + postItem.index,
      );
      repostPostItem.simulate("press");
      expect(repostPostItem).toHaveLength(1);

      let downVotePostItem = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "downVotePostItem-" + postItem.index,
      );
      downVotePostItem.simulate("press");
      expect(downVotePostItem).toHaveLength(1);

      let upVotePostItem = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "upVotePostItem-" + postItem.index,
      );
      upVotePostItem.simulate("press");
      expect(upVotePostItem).toHaveLength(1);

      let itemWrapperLocked = shallow(<View>{instance.renderPosts(lockedPostItem)}</View>);
      let unlockPostItem = itemWrapperLocked.findWhere(
        (node) =>
          node.prop("testID") === "unlockPostItem-" + lockedPostItem.index,
      );
      unlockPostItem.simulate("press");
      expect(unlockPostItem).toHaveLength(1);
    });

    then("Tagged Post List API load with out errors", () => {
      const apiGetTaggedPostList: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiGetTaggedPostList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiGetTaggedPostList.messageId,
      );
      apiGetTaggedPostList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(postResponse)),
      );
      instance.apiGetTaggedPostList = apiGetTaggedPostList.messageId;
      runEngine.sendMessage("Unit Test", apiGetTaggedPostList);
      expect(SingleTagStreamWrapper).toBeTruthy();
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(SingleTagStreamWrapper).toBeTruthy()
    })
  })
})

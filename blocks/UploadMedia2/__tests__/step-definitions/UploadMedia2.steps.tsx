import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import UploadMedia2 from "../../src/UploadMedia2"
import { View } from "react-native"
import { CameraRoll, PhotoIdentifiersPage } from "@react-native-camera-roll/camera-roll"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),

    },
    id: "UploadMedia2"
}

const feature = loadFeature('./__tests__/features/UploadMedia2-scenario.feature');

defineFeature(feature, (test) => {

    const imageItem = {
        item: { "node": { "group_name": "All Photos", "image": { "extension": null, "fileSize": 1852262,"filepath": 'path/to/image.jpg',  "filename": "IMG_0005.JPG", "height": 2002, "playableDuration": null, "uri": "ph://ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001", "width": 3000 }, "location": null, "timestamp": 1344462930.4, "type": "image" } },
        index: 0,
    }
    const mockedResponse: PhotoIdentifiersPage = {
        edges: [
          { "node": { "group_name": "All Photos", "image": {"orientation":null, "extension": "jpg", "fileSize": 1852262, "filepath": 'path/to/image.jpg', "filename": "IMG_0005.JPG", "height": 2002, "playableDuration": 5645645646,"uri": "ph://ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001", "width": 3000 }, "location": null, "timestamp": 1344462930.4, "type": "image"}  },
          { "node": { "group_name": "All Photos", "image": {"orientation":null, "extension": "jpg", "fileSize": 1852262, "filepath": 'path/to/image.jpg', "filename": "IMG_0005.JPG", "height": 2002, "playableDuration": 645656,"uri": "ph://ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/0012", "width": 3000 }, "location": null, "timestamp": 13444629330.4, "type": "image"}  },
        ],page_info: {
            has_next_page: false,
          },
      };
  
     
  
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(CameraRoll, 'getPhotos').mockResolvedValue(mockedResponse);
        

    });

    test('User navigates to UploadMedia2', ({ given, when, then }) => {
        let uploadMediaBlock: ShallowWrapper;
        let instance: UploadMedia2;

        given('I am a User loading UploadMedia2', () => {
            uploadMediaBlock = shallow(<UploadMedia2 {...screenProps} />);
        });

        when('I navigate to the UploadMedia2', () => {
            instance = uploadMediaBlock.instance() as UploadMedia2
        });

        then('UploadMedia2 will load with out errors', () => {
            instance.doButtonPressed();
            instance.setEnableField()
            expect(uploadMediaBlock).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let btnUploadDelete = uploadMediaBlock.findWhere((node) => node.prop('testID') === 'btnUploadDelete');
            btnUploadDelete.simulate('press');
            expect(btnUploadDelete).toHaveLength(1);

            let btnNext = uploadMediaBlock.findWhere(
                (node) => node.prop("testID") === "btnNext",
            );
            btnNext.simulate("press");
            expect(btnNext).toHaveLength(1);

            let btnDeletePost = uploadMediaBlock.findWhere((node) => node.prop('testID') === 'btnDeletePost');
            btnDeletePost.simulate('press');
            expect(btnDeletePost).toHaveLength(1);

            let btnCancelDelete = uploadMediaBlock.findWhere(
                (node) => node.prop("testID") === "btnCancelDelete",
            );
            btnCancelDelete.simulate("press");
            expect(btnCancelDelete).toHaveLength(1);
        });

        then("I can select the flat list with with out errors", () => {
            jest.spyOn(CameraRoll, 'getPhotos').mockRejectedValue( Error('Failed to fetch photos'));
            let flatList = uploadMediaBlock.findWhere(
                (node) => node.prop("testID") === "imagesList",
            );
            flatList.renderProp("renderItem")(imageItem);
            flatList.props().keyExtractor({ timestamp:imageItem.item.node.timestamp.toString() });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

            let itemWrapper = shallow(<View>{instance.renderList(imageItem)}</View>);
            let imageListComponent = itemWrapper.findWhere((node) => node.prop("testID") === "selectedImage-" + imageItem.index);
            imageListComponent.simulate("press");
            expect(imageListComponent).toHaveLength(1);

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(uploadMediaBlock).toBeTruthy();
        });
    });


});

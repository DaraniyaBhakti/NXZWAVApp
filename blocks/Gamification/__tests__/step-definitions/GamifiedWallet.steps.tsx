import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import GamifiedWallet from "../../src/GamifiedWallet"
import Assets from "../../src/components/Assets"
import Activity from "../../src/components/Activity"
import Transactions from "../../src/components/Transactions"
import Watchers from "../../src/components/Watchers"
import { imgPin } from "../../src/assets"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
const callback = jest.fn();
const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        getParam: () => callback,
    },
    id: "GamifiedWallet"
}

const feature = loadFeature('./__tests__/features/GamifiedWallet-scenario.feature');

defineFeature(feature, (test) => {


    let activityItem = {
        item: {
            "profile_img": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5409f2fc4dd64bfc15a4d62fff1ceb8a4757f8ae/image",
            "name": "Rup_Barad",
            "msg": "Commented: Latest comment",
            "post_imag":"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5409f2fc4dd64bfc15a4d62fff1ceb8a4757f8ae/image",
            "count": null,
            "user_names": [],
            "user_pics": []
        },
        index: 1
    }
    let transactionItem = {
        item: {
            "id": "11",
            "type": "transaction",
            "attributes": {
                "id": 11,
                "user_profile_info_id": 3,
                "created_at": "2023-06-20T09:53:51.785Z",
                "type": {
                    "status": "Sent",
                    "type": "Clout",
                    "type_to": "Mitang",
                    "type_of_transaction": "To",
                    "amount": 500
                }
            }
        },
        index: 2
    }
    let watcherItem = {
        item: {
            "id": "3",
            "type": "top_watchers",
            "attributes": {
                "id": 3,
                "user_profile_info_id": {
                    "id": 3,
                    "user_name": "Rup_test_dev",
                    "role": "Fashion Designer",
                    "level": "Level 1",
                    "points": -57953,
                    "rank": 10,
                    "profile_pic": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cae1495d1580b47e408ef64402504a8701a511d0/image"
                },
                "action": {
                    "action": 88,
                    "points": 440
                }
            }
        },
        index: 1
    }
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to GamifiedWallet', ({ given, when, then }) => {
        let gamifiedWalletBlockWrapper: ShallowWrapper;
        let instance: GamifiedWallet;
        let assetBlockWrapper: ShallowWrapper;
        let activityBlockWrapper: ShallowWrapper;
        let transactionBlockWrapper: ShallowWrapper;
        let watcherBlockWrapper: ShallowWrapper;
        let assetInstance: Assets
        let activityInstance: Activity
        let transactionInstance: Transactions
        let watcherInstance: Watchers

        given('I am a User loading GamifiedWallet', () => {
            gamifiedWalletBlockWrapper = shallow(<GamifiedWallet {...screenProps} />);
            assetBlockWrapper = shallow(<Assets assetCategories={{
                id: "",
                type: "",
                attributes: {
                    id: 0,
                    points: 0,
                    push_points: 0,
                    pin_points: 0,
                    blast_points: 0,
                    clout_changes: {
                        clout_ballence: 0,
                        percentage: 0
                    }
                }
            }} />);
            activityBlockWrapper = shallow(<Activity activityFeeds={[]} />);
            transactionBlockWrapper = shallow(<Transactions transactions={[]} />);
            watcherBlockWrapper = shallow(<Watchers watchers={[]} />);
        });

        when('I navigate to the GamifiedWallet', () => {
            instance = gamifiedWalletBlockWrapper.instance() as GamifiedWallet
        });

        then('GamifiedWallet will load with out errors', () => {
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let btnSend = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSend",
            );
            btnSend.simulate("press");
            expect(btnSend).toHaveLength(1);

            let btnReceive = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnReceive",
            );
            btnReceive.simulate("press");
            expect(btnReceive).toHaveLength(1);

            let btnSwitch = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnSwitch",
            );
            btnSwitch.simulate("press");
            expect(btnSwitch).toHaveLength(1);

            let btnPush = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnPush",
            );
            btnPush.simulate("press");
            expect(btnPush).toHaveLength(1);

            let btnBuyPush = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBuyPush",
            );
            btnBuyPush.simulate("press");
            expect(btnBuyPush).toHaveLength(1);

            let btnBuyPin = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBuyPin",
            );
            btnBuyPin.simulate("press");
            expect(btnBuyPin).toHaveLength(1);

            let btnBuyBlast = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnBuyBlast",
            );
            btnBuyBlast.simulate("press");
            expect(btnBuyBlast).toHaveLength(1);

            let btnAsset = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnAsset",
            );
            btnAsset.simulate("press");
            expect(btnAsset).toHaveLength(1);

            let btnActivity = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnActivity",
            );
            btnActivity.simulate("press");
            expect(btnActivity).toHaveLength(1);

            let btnWatcher = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnWatcher",
            );
            btnWatcher.simulate("press");
            expect(btnWatcher).toHaveLength(1);

            let btnTransaction = gamifiedWalletBlockWrapper.findWhere(
                (node) => node.prop("testID") === "btnTransaction",
            );
            btnTransaction.simulate("press");
            expect(btnTransaction).toHaveLength(1);
            
        });

        then("I can select the Assets option with with out errors", () => {
            instance.setState({ selectedListOption: "Asset" })
            let flatList = assetBlockWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistAsset",
            );
            flatList.renderProp("renderItem")({
                item: {
                    id: "3",
                    img: imgPin,
                    heading: 'Pins',
                    desc: 'Pin to Home',
                    amount: '51,000',
                    percentage: ''
                }
            },);
            flatList.props().keyExtractor({ id: 3 });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

        });

        then("I can select the Activity option with with out errors", () => {
            instance.setState({ selectedListOption: "Activity" })
            let flatList = activityBlockWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistActivity",
            );
            flatList.renderProp("renderItem")(activityItem);

            flatList.renderProp("renderItem")({
                item: {
                    "profile_img": null,
                    "name": "Rup_Barad",
                    "msg": null,
                    "post_imag": null,
                    "count": null,
                    "user_names": [],
                    "user_pics": []
                },
                index: null
            });
            flatList.props().keyExtractor({id: 1 });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);

        });

        then("I can select the Transaction option with with out errors", () => {
            instance.setState({ selectedListOption: "Transaction" })
            let flatList = transactionBlockWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTransaction",
            );
            flatList.renderProp("renderItem")(transactionItem);
            flatList.renderProp("renderItem")( {
                item: {
                    "id": "11",
                    "type": "transaction",
                    "attributes": {
                        "id": 11,
                        "user_profile_info_id": 3,
                        "created_at": "2023-06-20T09:53:51.785Z",
                        "type": {
                            "status": "Received",
                            "type": "Clout",
                            "type_to": "Mitang",
                            "type_of_transaction": "To",
                            "amount": 500
                        }
                    }
                },
                index: 3
            });
            flatList.renderProp("renderItem")( {
                item: {
                    "id": "11",
                    "type": "transaction",
                    "attributes": {
                        "id": 11,
                        "user_profile_info_id": 3,
                        "created_at": "2023-06-20T09:53:51.785Z",
                        "type": {
                            "status": "Switched",
                            "type": "Clout",
                            "type_to": "Mitang",
                            "type_of_transaction": "To",
                            "amount": 500
                        }
                    }
                },
                index: 4
            });
            flatList.renderProp("renderItem")( {
                item: {
                    "id": "11",
                    "type": "transaction",
                    "attributes": {
                        "id": 11,
                        "user_profile_info_id": 3,
                        "created_at": "2023-06-20T09:53:51.785Z",
                        "type": {
                            "status": "Purchased",
                            "type": "Clout",
                            "type_to": "Mitang",
                            "type_of_transaction": "To",
                            "amount": 500
                        }
                    }
                },
                index: 5
            });
            flatList.props().keyExtractor({ id: 2 });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);
        });

        then("I can select the Watchers option with with out errors", () => {
            instance.setState({ selectedListOption: "Watcher" })
            let flatList = watcherBlockWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistWatchers",
            );
            flatList.renderProp("renderItem")(watcherItem);
            flatList.renderProp("renderItem")({
                item: {
                    "id": "4",
                    "type": "top_watchers",
                    "attributes": {
                        "id": 3,
                        "user_profile_info_id": {
                            "id": 3,
                            "user_name": "Rup_test_dev",
                            "role": "Fashion Designer",
                            "level": "Level 1",
                            "points": -57953,
                            "rank": 10,
                            "profile_pic": null
                        },
                        "action": {
                            "action": 88,
                            "points": 440
                        }
                    }
                },
                index: 3
            });
            flatList.props().keyExtractor({ id: 3 });
            flatList.simulate("press");
            expect(flatList).toHaveLength(1);
        });

        then("Asset categories List API load with out errors", () => {
            const apiGetAssetCategories: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetAssetCategories.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetAssetCategories.messageId,
            );
            apiGetAssetCategories.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    data: {
                        id: "2",
                        type: "asset",
                        attributes: {
                            id: 2,
                            points: 343,
                            push_points: 123,
                            pin_points: 345,
                            blast_points: 123,
                            clout_changes: {
                                clout_ballence: 234,
                                percentage: 200
                            }
                        }
                    }
                })),
            );
            instance.apiGetAssetCategories = apiGetAssetCategories.messageId;
            runEngine.sendMessage("Unit Test", apiGetAssetCategories);
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });

        then("Activities List API load with out errors", () => {
            const apiGetActivityFeed: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetActivityFeed.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetActivityFeed.messageId,
            );
            apiGetActivityFeed.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    "data": {
                        "id": "26",
                        "type": "activity_feed",
                        "attributes": {
                            "activity": [
                                {
                                    "profile_img": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5409f2fc4dd64bfc15a4d62fff1ceb8a4757f8ae/image",
                                    "name": "Rup_Barad",
                                    "msg": "Commented: Latest comment",
                                    "post_imag": null,
                                    "count": null,
                                    "user_names": [],
                                    "user_pics": []
                                },
                                {
                                    "profile_img": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82fadd9de6f7fdd2a9ccc62e38d55416382a1a74/image",
                                    "name": "test000_user",
                                    "msg": "Reposted: your post",
                                    "post_imag": null,
                                    "count": 2,
                                    "user_names": [
                                        "test0_user",
                                        "test000_user"
                                    ],
                                    "user_pics": [
                                        "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--27cd7f973050ce1fbe3d3ac56b4f1a43ba531209/image",
                                        "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82fadd9de6f7fdd2a9ccc62e38d55416382a1a74/image"
                                    ]
                                }
                            ]
                        }
                    }
                })),
            );
            instance.apiGetActivityFeed = apiGetActivityFeed.messageId;
            runEngine.sendMessage("Unit Test", apiGetActivityFeed);
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });

        then("Transactions List API load with out errors", () => {
            const apiGetTransactions: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetTransactions.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetTransactions.messageId,
            );
            apiGetTransactions.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    "data": [
                        {
                            "id": "10",
                            "type": "transaction",
                            "attributes": {
                                "id": 10,
                                "user_profile_info_id": 3,
                                "created_at": "2023-06-20T09:53:32.073Z",
                                "type": {
                                    "status": "Switched",
                                    "type": "Push",
                                    "type_to": "Clout",
                                    "type_of_transaction": "For",
                                    "amount": 10
                                }
                            }
                        },
                        {
                            "id": "11",
                            "type": "transaction",
                            "attributes": {
                                "id": 11,
                                "user_profile_info_id": 3,
                                "created_at": "2023-06-20T09:53:51.785Z",
                                "type": {
                                    "status": "Sent",
                                    "type": "Clout",
                                    "type_to": "Mitang",
                                    "type_of_transaction": "To",
                                    "amount": 500
                                }
                            }
                        },]
                })),
            );
            instance.apiGetTransactions = apiGetTransactions.messageId;
            runEngine.sendMessage("Unit Test", apiGetTransactions);
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });

        then("Watchers List API load with out errors", () => {
            const apiGetTop100Watchers: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage),
            );
            apiGetTop100Watchers.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiGetTop100Watchers.messageId,
            );
            apiGetTop100Watchers.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({
                    "data": [
                        {
                            "id": "3",
                            "type": "top_watchers",
                            "attributes": {
                                "id": 3,
                                "user_profile_info_id": {
                                    "id": 3,
                                    "user_name": "Rup_test_dev",
                                    "role": "Fashion Designer",
                                    "level": "Level 1",
                                    "points": -57953,
                                    "rank": 10,
                                    "profile_pic": "https://nxzwav-294793-ruby.b294793.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cae1495d1580b47e408ef64402504a8701a511d0/image"
                                },
                                "action": {
                                    "action": 88,
                                    "points": 440
                                }
                            }
                        },
                        {
                            "id": "8",
                            "type": "top_watchers",
                            "attributes": {
                                "id": 8,
                                "user_profile_info_id": {
                                    "id": 8,
                                    "user_name": "Mitang",
                                    "role": "A&R",
                                    "level": "Level 1",
                                    "points": 1525,
                                    "rank": 1,
                                    "profile_pic": null
                                },
                                "action": {
                                    "action": 0,
                                    "points": 0
                                }
                            }
                        }
                    ]
                })),
            );
            instance.apiGetTop100Watchers = apiGetTop100Watchers.messageId;
            runEngine.sendMessage("Unit Test", apiGetTop100Watchers);
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(gamifiedWalletBlockWrapper).toBeTruthy();
        });
    });


});

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { AssetCategories, TransactionItem, UserActivity, WatchersItem } from "./domain/gamification.dto";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  selectedListOption: string;
  assetCategories: AssetCategories,
  watchers: WatchersItem[],
  transactions: TransactionItem[],
  activityFeeds: UserActivity[],
  loader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GamifiedWalletController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetAssetCategories: string = "";
  apiGetTop100Watchers: string = "";
  apiGetTransactions: string = "";
  apiGetActivityFeed: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      selectedListOption: configJSON.labelAsset,
      assetCategories: {
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
      },
      watchers: [],
      transactions: [],
      activityFeeds: [],
      loader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      switch (apiRequestCallId) {
        case this.apiGetAssetCategories: {
          this.setState({ assetCategories: responseJson?.data, loader: false })
          break;
        }
        case this.apiGetTop100Watchers: {
          this.setState({ watchers: responseJson?.data, loader: false })
          break;
        }
        case this.apiGetTransactions: {
          this.setState({ transactions: responseJson?.data, loader: false })
          break;
        }
        case this.apiGetActivityFeed: {
          this.setState({ activityFeeds: responseJson?.data?.attributes?.activity, loader: false })
          break;
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start

  async componentDidMount() {
    await super.componentDidMount();
    this.setState({ loader: true })
    this.getAssetCategories();
  }

  getAssetCategories = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetAssetCategories = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAssetCategoriesApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  getTop100Watchers = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTop100Watchers = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTop100WatchersApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  getTransactions = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTransactions = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTransactionsApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  getActivities = () => {
    this.setState({ loader: true })
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzEzODYyMzI2fQ.6Re31NXWROFF2cKTfo3zPq3q5Gt4a6M1uXw4Zm2VQG-D6hfV0hd6pqVPn6LbySMq-yU5mcnorV2tk1CIavDqWg"
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetActivityFeed = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getActivityFeedsApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  selectListOption = (label: string) => {
    this.setState({ selectedListOption: label })
    switch (label) {
      case configJSON.labelAsset: {
        this.state.assetCategories.id !== "" && this.getAssetCategories();
        break;
      }
      case configJSON.labelWatcher: {
        this.state.watchers.length === 0 && this.getTop100Watchers();
        break;
      }
      case configJSON.labelActivity: {
        this.state.activityFeeds.length === 0 && this.getActivities();
        break;
      }
      case configJSON.labelTransaction: {
        this.state.transactions.length === 0 && this.getTransactions();
        break;
      }
    }
  }

  navigateBuyScreen = (type: string) => {
    this.props.navigation.navigate('BuyPoints', { screenType: type });
  }

  navigateScreen = (screenName: string) => {
    this.props.navigation.navigate(screenName);
  }

  // Customizable Area End
}
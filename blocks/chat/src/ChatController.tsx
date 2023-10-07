import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import { AsyncStorageKey } from "../../../components/src/AppGlobals";
import { APIConstant, APIRequest, APIEndPoint, Constant } from "../../../components/src/AppHelper/AppConstant";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChat {
  id: string;
  muted: boolean;
  unreadCount: number;
  lastMessage: string;
  name: string;
}

export interface IChatResponse {
  attributes: {
    id: number,
    created_at: string,
    profile_info: {
      profile_pic: string | null,
      user_name: string,
      user_role: string | null,
      user_id: number
    },
    message: {
      id: number,
      message: string,
      created_at: string,  //"2023-05-12T14:04:40.470Z"
      updated_at: string,
      is_mark_read: boolean,
      attachment: string | null,
      conversation_id: number,
      user_profile_info_id: number
    }
  }
}

// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  accountId: number;
  chatName: string;
  chatList: IChatResponse[];
  isVisibleModal: boolean;
  dmSelected: boolean;
  pmSelected: boolean;
  txtInputValue: string
  messageConversation: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getConversationListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  deleteConversationApiCallId: string = "";
  dmSelected = true;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.NavigationMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: -1,
      chatName: "",
      chatList: [],
      isVisibleModal: false,
      dmSelected: this.dmSelected,
      pmSelected: !this.dmSelected,
      txtInputValue: "",
      messageConversation: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getConversationList()
  }

  getChatList = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getConversationListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getMyChatsApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.NavigationMessage) === message.id) {
      const navigationPropMessage = message.getData(getName(MessageEnum.NavigationPropsMessage))
      if (navigationPropMessage.messageType === "readMessage") {
        //Refresh that row,   //Conversation ID
        //let conversationID = navigationPropMessage.conversationID
        this.getConversationList()
      }
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (apiRequestCallId === this.getConversationListApiCallId
        || apiRequestCallId === this.deleteConversationApiCallId) {
        this.doActionForRestAPIMessage(message, apiRequestCallId)
      }

    }
  }

  doActionForRestAPIMessage(message: Message, apiRequestCallId: string) {

    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (apiRequestCallId === this.getConversationListApiCallId) {
      this.setState({
        chatList: responseJson.data ? responseJson.data : [],
        messageConversation: responseJson.message ? responseJson.message : "",
      });
    }
    else if (apiRequestCallId === this.deleteConversationApiCallId) {
      this.getConversationList()
    }
  }

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  navigateToChatView = (chatId: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "ChatView");

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      chatId: chatId,
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  doButtonBackPressed = () => {
    this.props.navigation.goBack();
  };

  doButtonPressNewMessage = () => {
    this.navigateForNewMessage(this.state.dmSelected)
  };

  pressDmPmButton(dm: boolean) {
    this.setState(
      {
        dmSelected: dm,
        pmSelected: !dm,
        chatList: [],
        messageConversation: "",
      },
      () => {
        this.getConversationList();
      }
    );
  }

  onPressDm = () => {
    console.log("onPress - onPressDm ");
    this.pressDmPmButton(true);
  };

  onPressPm = () => {
    console.log("onPress - onPressPm ");
    this.pressDmPmButton(false);
  };

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
      console.log('textInput', text)
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  onPressSubmitting = () => {
    console.log("onPress - onPressWatching ", this.state.txtInputValue);

    this.setState(
      {
        chatList: [],
        messageConversation: "",
      },
      () => {
        this.getConversationList();
      }
    );
  };

  async getConversationList() {
    let search = this.state.txtInputValue ?? ''
    console.log("onPress - getConversationList ", search);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getConversationListApiCallId = requestMessage.messageId;

    let token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    //await getStorageData(AsyncStorageKey.headerToken);
    const header = {
      "Content-Type": APIRequest.jsonApiContentType,
      token: token,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpGetMethod
    );

    let apiEndPoint = "";
    let searchEndPoint = "";
    if (search.trim().length > 0) {
      searchEndPoint = APIConstant.markQuestion + APIConstant.paramsQuery + APIConstant.markEqual + search
      console.log("onPress - getConversationList searchEndPoint ", searchEndPoint);
    }
    if (this.state.dmSelected) {
      apiEndPoint =
        APIEndPoint.endPointAPIGetDMList + searchEndPoint

    } else if (this.state.pmSelected) {
      apiEndPoint =
        APIEndPoint.endPointAPIGetPMList + searchEndPoint
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    console.log("getConversationList API request  ", requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async deleteConversation(conversationID: string) {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteConversationApiCallId = requestMessage.messageId;

    let token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    //await getStorageData(AsyncStorageKey.headerToken);
    const header = {
      "Content-Type": APIRequest.jsonApiContentType,
      token: token,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpDeleteMethod
    );
    let conversationKey = "";
    if (this.state.dmSelected) {
      conversationKey = APIConstant.paramsDMConversationID
    } else if (this.state.pmSelected) {
      conversationKey = APIConstant.paramsPMConversationID
    }
    let apiEndPoint = APIEndPoint.endPointAPIDeleteConversation
      + APIConstant.markQuestion
      + conversationKey
      + APIConstant.markEqual + conversationID
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    console.log("getUserList API request  ", requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigateForNewMessage(dmSelected: boolean) {
    setStorageData(AsyncStorageKey.chatTypeDm, "" + dmSelected)
    this.props.navigation.navigate("ChatNew")
  }

  handleRowItemOnMessagePress(item: IChatResponse) {
    console.log("handleRowItemOnPress handleRowItemOnMessagePress ", this.state.dmSelected);
    setStorageData(AsyncStorageKey.chatTypeDm, '' + this.state.dmSelected)
    let id = this.state.dmSelected === true ? item.attributes.message.user_profile_info_id : item.attributes.profile_info.user_id
    this.storeConversationOFUserAndNavigateOnChatView(
      // "" + item.attributes.message.user_profile_info_id,
      // "" + item.attributes.profile_info.user_name,
      // "",
      // item.attributes.profile_info.profile_pic ?? "",
      // "",
      // "" + item.attributes.id
      "" + id,
      item.attributes.profile_info.user_name,
      item.attributes.profile_info.user_role ?? "",
      item.attributes.profile_info.profile_pic ?? "",
      "",
      "" + item.attributes.id
    );
  }

  handleRowItemOnDeletePress(item: IChatResponse) {
    console.log("handleRowItemOnPress handleRowItemOnDeletePress  ", item);
    Alert.alert(Constant.appName, configJSON.alertConversationDelete, [{
      text: configJSON.okText, onPress: () => {
        console.log("handleRowItemOnPress Delete okay");
        this.deleteConversation("" + item.attributes.id)
      }
    },
    {
      text: configJSON.cancelText, onPress: () => {
        console.log("handleRowItemOnPress Delete cancel");
      }
    }
    ]);
  }

  storeConversationOFUserAndNavigateOnChatView = (
    receiverUserID: string,
    receiverUserName: string,
    receiverUserRole: string,
    receiverUserPic: string,
    receiverUserPoints: string,
    conversationID: string) => {
    const userData = {
      userID: receiverUserID,
      userName: receiverUserName,
      userRole: receiverUserRole,
      userPic: receiverUserPic,
      userPoints: receiverUserPoints,
    }
    //this.props.navigation.navigate("ChatView", { receiverUser: userData, conversationID: conversationID })
    this.state.dmSelected === true
      ? this.props.navigation.navigate("ChatView", { receiverUser: userData, conversationID: conversationID })
      : this.props.navigation.navigate("PmChatView", { receiverUser: userData, conversationID: conversationID })
  }

  // Customizable Area End
}

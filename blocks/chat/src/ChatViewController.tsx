import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { ChangeEvent } from "react";
import { ScrollView } from "react-native";
import {
  InputProps
} from "@material-ui/core";
import { AsyncStorageKey } from "../../../components/src/AppGlobals";
import { APIConstant, APIEndPoint, APIRequest } from "../../../components/src/AppHelper/AppConstant";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChatData {
  id: string;
  attributes: {
    id: number;
    name: string;
    is_notification_mute: boolean;
    accounts_chats: [
      {
        id: string;
        attributes: {
          account_id: number;
          muted: boolean;
          unread_count: number;
        };
      }
    ];
    messages: IMessage[];
  };
  relationships: { accounts: { data: { id: string; type: string }[] } };
}

export interface IMessage {
  id: string;
  type: "conversation";
  attributes: {
    id: number;
    message: string;
    user_profile_info_id: number;
    conversation_id: number;
    created_at: string;
    updated_at: string;
    is_mark_read: boolean;
    profile_image: string | null;
    user_name: string | null;
  };
}

export interface ReceiveUser {
  userID: string,
  userName: string,
  userRole: string,
  userPic: string,
  userPoints: string,
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
  chatId: number;
  message: string;
  accountIdInput: string;
  accountId: number;
  chatData: IChatData | null;
  isVisibleModal: boolean;
  isVisiblePreviewModal: boolean;
  imageUrl: string;
  docRes: unknown;
  keyboardHeight: number;
  muted: boolean | null;
  messageList: IMessage[];
  receiverUserID: string;
  receiverUserName: string;
  receiverUserRole: string;
  receiverUserPic: string;
  receiverUserPoints: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatViewController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  addUserToChatApiCallId: string = "";
  leaveChatApiCallId: string = "";
  sendMessageApiCallId: string = "";
  
  updateReadMessageApiCallId: string = "";
  refreshChatInterval: unknown;
  scrollViewRef: React.RefObject<ScrollView>;
  fileInputRef: React.RefObject<InputProps & { click: Function }>;
  apiToken: string = "";
  loginUserProfileId: string = ""
  putReadMessageApiCallId: string = "";
  chatTypeDM: boolean = true;
  conversationID: string = "";
  navigationParams:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      chatId: 3,
      message: "",
      accountId: -1,
      accountIdInput: "",
      chatData: null,
      isVisibleModal: false,
      isVisiblePreviewModal: false,
      imageUrl: "",
      docRes: null,
      keyboardHeight: 0,
      muted: null,
      messageList: [],
      receiverUserID: "",
      receiverUserName: "",
      receiverUserRole: "",
      receiverUserPic: "",
      receiverUserPoints: "",

      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.scrollViewRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.navigationParams = this.props.navigation.state.params;
    // Customizable Area End
  }

  // Customizable Area Start
  getReceiverData(){
    let receiverUser = this.navigationParams.receiverUser;
    
    this.setState(
      {
        receiverUserID: receiverUser.userID,
        receiverUserName: receiverUser.userName,
        receiverUserRole: receiverUser.userRole,
        receiverUserPic: receiverUser.userPic,
        receiverUserPoints: receiverUser.userPoints,
      },
      () => {
        this.getChatList()
        this.refreshChatInterval = setInterval(
          () => this.getChatList(),
          30000
        );
      }
    );
  }

  async componentDidMount() {
    super.componentDidMount();
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    //await getStorageData(AsyncStorageKey.headerToken);
    this.apiToken = "" + token;
    let userProfileId = await getStorageData(AsyncStorageKey.profileUserID);
    this.loginUserProfileId = "" + userProfileId;
    this.getReceiverData();
    let isTypeDM = await getStorageData(AsyncStorageKey.chatTypeDm);
    this.chatTypeDM = Boolean(isTypeDM);
  }

  async componentWillUnmount() {
    clearInterval(this.refreshChatInterval as number);
  }

  isStringNullOrBlank = (string: string) => {
    return !string || string.length === 0;
  };

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  hidePreviewModal = () => {
    this.setState({ isVisiblePreviewModal: false, imageUrl: '', docRes: null });
  };

  handleAccountIdInputChange = (accountIdInput: string) => {
    this.setState({ accountIdInput });
  };

  handleMessageChange = (message: string) => {
    this.setState({ message });
  };

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && event.target.files) {
      const file = event.target.files[0] as Blob;
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.setState({ imageUrl: readerEvent.target?.result as string, docRes: file, isVisiblePreviewModal: true });
      };
      reader.readAsDataURL(file);
      this.setState({ docRes: file, isVisiblePreviewModal: true });
    }
    else {
      this.setState({ imageUrl: "", docRes: null })
    }
  };

  handleSendMessage = () => {
  };

  handleInsertImage = () => {
    const refrence = this.fileInputRef.current;
    if (refrence) {
      refrence.click();
    }
  };

  addUserToChat = (accountIdInput: string, chatId: number) => {
  }

  leaveChatRoom = (chatId: number) => {
  }

  sendChatMessage = async (receiverId: string, message: string, imageUrl?: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sendMessageApiCallId = requestMessage.messageId;

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
      APIRequest.httpPostMethod
    );

    let apiEndPoint =
      APIEndPoint.endPointAPIPostChat + APIConstant.markQuestion + APIConstant.paramsReceiverID + APIConstant.markEqual + receiverId

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    let httpBody = { message: message };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  changeNotificationStatus = () => {
    const { muted } = this.state;
    if (muted === null) {
      this.setState({ muted: true });
    } else {
      this.setState({ muted: !muted });
    }
  };

  inputMessageProps = {
    onChangeText: (text: string) => {
      this.setState({ message: text });
    },
  };

  btnSendMessageProps = {
    onPress: () => {
      this.sendChatMessage(this.state.receiverUserID, this.state.message);
      this.setState({ message: "", imageUrl: "", isVisiblePreviewModal: false });
    },
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (apiRequestCallId === this.sendMessageApiCallId
        || apiRequestCallId === this.getChatListApiCallId
        || apiRequestCallId === this.addUserToChatApiCallId
        || apiRequestCallId === this.putReadMessageApiCallId
        || apiRequestCallId === this.leaveChatApiCallId
        ) {
          this.doActionForRestAPIMessage(message, apiRequestCallId)
      }
    }
    else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("ChatViewController receive TOKEN", token);
      const responseData: string = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      runEngine.debugLog("ChatViewController receive responseData", responseData);
    }
  }

  doActionForRestAPIMessage(message: Message, apiRequestCallId:string){
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (responseJson) {
     if (
        apiRequestCallId === this.sendMessageApiCallId
      ) {
        this.getChatList();
      }
      else if (
        apiRequestCallId === this.getChatListApiCallId && responseJson.data
      ) {
        this.setState(
          {
            messageList: responseJson.data
          },
          () => {
            if (!this.conversationID && this.state.messageList.length > 0) {
              //This function call one time after the message list  
              this.conversationID = "" + this.state.messageList[0].attributes.conversation_id
              this.getReadMessage();
            }
          }
        );
      }
      else if (
        apiRequestCallId === this.addUserToChatApiCallId
      ) {
        this.hideModal();
      }
      else if (
        apiRequestCallId === this.putReadMessageApiCallId
      ) {
        //Callback message for conversation screen 
        this.refreshConversationListScreen()
      }
      else if (apiRequestCallId === this.leaveChatApiCallId) {
        this.props.navigation.goBack();
      }
    }
  }

  doButtonBackPressed = () => {
    this.props.navigation.goBack();
  };

  async getChatList() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getChatListApiCallId = requestMessage.messageId;

    const header = {
      "Content-Type": APIRequest.jsonApiContentType,
      token: this.apiToken,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpGetMethod
    );

    let apiEndPoint = APIEndPoint.endPointAPIGetDMChatList +
      APIConstant.markQuestion +
      APIConstant.paramsReceiverID +
      APIConstant.markEqual +
      this.state.receiverUserID;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getReadMessage() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.putReadMessageApiCallId = requestMessage.messageId;

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
      APIRequest.httpPutMethod
    );

    let conversationKey = "";
    if (this.chatTypeDM) {
      conversationKey = APIConstant.paramsDMConversationID
    } else {
      conversationKey = APIConstant.paramsPMConversationID
    }
    let apiEndPoint = APIEndPoint.endPointAPIPutReadMessage
      + APIConstant.markQuestion
      + conversationKey
      + APIConstant.markEqual + this.conversationID
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  refreshConversationListScreen() {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationPropsMessage), {
      messageType: "readMessage",
      conversationID: this.conversationID
    });
    this.send(message);
  }
  // Customizable Area End
}

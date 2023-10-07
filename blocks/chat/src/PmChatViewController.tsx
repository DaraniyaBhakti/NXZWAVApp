import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from "react";
import { ScrollView } from "react-native";
import {
  InputProps
} from "@material-ui/core";
import { AsyncStorageKey } from "../../../components/src/AppGlobals";
import { APIConstant, APIEndPoint, APIRequest } from "../../../framework/src/AppConstant";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IMessage {
  id: string;
  type: "pm_chat";
  attributes: {
    id: number;
    points: number;
    message: PMMessage;
    is_locked: boolean;
    image: string | null;
    is_mark_read: boolean;
    profile: PMProfile;
    conversation_id: number;
  };
}

export interface PMProfile {
  profile_pic: string | null,
  user_name: string,
  user_role: string | null
}

export interface PMMessage {
  message: string,
  created_at: string
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
  isVisiblePreviewModal: boolean;
  imageUrl: string;
  muted: boolean | null;
  messageList: IMessage[];
  receiverUserID: string;
  receiverUserName: string;
  receiverUserRole: string;
  receiverUserPic: string;
  conversationID: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class PmChatViewController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  unlockMessageApiCallId: string = "";
  getChatListApiCallId: string = "";
  sendMessageApiCallId: string = "";
  refreshChatInterval: unknown;
  scrollViewRef: React.RefObject<ScrollView>;
  fileInputRef: React.RefObject<InputProps & { click: Function }>;
  apiToken: string = "";
  loginUserProfileId: string = ""
  putReadMessageApiCallId: string = "";
  chatTypePM: boolean = true;
  conversationID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    const navigationParams = this.props.navigation.state.params;
    let receiverUser = navigationParams.receiverUser;
    let conversationID = navigationParams.conversationID;
    let userID = receiverUser.userID
    let userName = receiverUser.userName
    let userPic = receiverUser.userPic
    let userRole = receiverUser.userRole
    // Customizable Area End

    this.subScribedMessages = [
      // Customizable Area Start
      // getName(MessageEnum.SessionResponseMessage),
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
      isVisiblePreviewModal: false,
      imageUrl: "",
      muted: null,
      messageList: [],
      receiverUserID: userID,
      receiverUserName: userName,
      receiverUserRole: userRole,
      receiverUserPic: userPic,
      conversationID: conversationID
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.scrollViewRef = React.createRef();
    this.fileInputRef = React.createRef();
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    this.apiToken = "" + token;
    let userProfileId = await getStorageData(AsyncStorageKey.profileUserID);
    this.loginUserProfileId = "" + userProfileId;
    this.getChatList(),
      this.refreshChatInterval = setInterval(
        () => this.getChatList(),
        30000
      );
    let isTypePM = await getStorageData(AsyncStorageKey.chatTypeDm);
    this.chatTypePM = Boolean(isTypePM);
  }

  async componentWillUnmount() {
    clearInterval(this.refreshChatInterval as number);
  }

  handleMessageChange = (message: string) => {
    this.setState({ message });
  };

  sendChatMessage = async (receiverId: string, message: string, imageUrl?: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sendMessageApiCallId = requestMessage.messageId;

    let token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    const header = {
      'Content-Type': 'multipart/form-data',
      "token": token
    };

    const formData = new FormData();
    formData.append("message", this.state.message);
    formData.append("points", 0 as unknown as Blob);
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpPostMethod
    );

    let apiEndPoint =
      APIEndPoint.endPointAPIPmChat + APIConstant.markQuestion + APIConstant.paramsReceiverID + APIConstant.markEqual + receiverId

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    this.setState({ message: "", imageUrl: "", isVisiblePreviewModal: false });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  btnSendMessageProps = {
    onPress: () => {
      this.sendChatMessage(this.state.receiverUserID, this.state.message);
    },
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      switch (apiRequestCallId) {
        case this.sendMessageApiCallId: {
          this.getChatList();
          break;
        }
        case this.getChatListApiCallId: {
          this.setState(
            {
              messageList: responseJson?.data
            },
            () => {
              if (!this.state.conversationID && this.state.messageList.length > 0) {
                //This function call one time after the message list  
                this.conversationID = "" + this.state.messageList[0].attributes.conversation_id
                this.getReadMessage();
              }
            }
          );
          break;
        }
        case this.unlockMessageApiCallId: {
          if (responseJson.data) {
            this.getChatList();
          } else {
            this.showAlert(
              configJSON.errorTitle,
              responseJson.message,
              ""
            );
          }
          break;
        }
        case this.putReadMessageApiCallId: {
          //Callback message for conversation screen 
          this.refreshConversationListScreen()
          break;
        }
      }
    }
    else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      const responseData: string = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      if (responseData) {
        const messageData = JSON.parse(responseData);
        if (messageData && messageData.meta) {
          const accountId: number = messageData.meta.id;
          this.setState({ accountId });
        }
      }
    }
  }

  doButtonBackPressed = () => {
    this.props.navigation.navigate('Chat');
  };

  getChatList() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getChatListApiCallId = requestMessage.messageId;

    const header = {
      "Content-Type": APIRequest.jsonApiContentType,
      "token": 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA'
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpGetMethod
    );

    let apiEndPoint = APIEndPoint.endPointAPIGetPMChatList +
      APIConstant.markQuestion +
      APIConstant.paramsReceiverID +
      APIConstant.markEqual + this.state.receiverUserID;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async unlockMessage(message_id: number) {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.unlockMessageApiCallId = requestMessage.messageId;

    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      APIRequest.httpPutMethod
    );

    let apiEndPoint = APIEndPoint.endPointAPIUnlockMessage +
      APIConstant.markQuestion +
      APIConstant.paramsMessageID +
      APIConstant.markEqual + message_id;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getReadMessage() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.putReadMessageApiCallId = requestMessage.messageId;

    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA';
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
    if (this.chatTypePM) {
      conversationKey = APIConstant.paramsPMConversationID
    } else {
      conversationKey = APIConstant.paramsDMConversationID
    }
    let apiEndPoint = APIEndPoint.endPointAPIPutReadMessage
      + APIConstant.markQuestion
      + conversationKey
      + APIConstant.markEqual + this.state.conversationID
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
      conversationID: this.state.conversationID
    });
    this.send(message);
  }

  // Customizable Area End
}
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { AsyncStorageKey } from "../../../components/src/AppGlobals";
import { APIConstant, APIRequest, APIEndPoint } from "../../../components/src/AppHelper/AppConstant";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface UserResponse {
  id: string,
  type: string,
  attributes: {
    user_name: string,
    unlock_amount: string|null,
    apple_account_id: number,
    level_name: string | null,
    points: number,
    rank: number,
    profile_account_categories_id: {
      id: number,
      name: string
    },
    profile_pic: string | null,
    cover_pic: string | null
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
  dmSelected: boolean;
  currentSelectedUser: UserResponse | null;
  txtInputUserValue: string;
  userList: UserResponse[];
  messageUser:string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatNewController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getUserListApiCallId: string = "";
  dmSelected = true;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      dmSelected: this.dmSelected,
      currentSelectedUser: null,
      txtInputUserValue: "",
      userList: [],
      messageUser: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
  }


  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (apiRequestCallId === this.getUserListApiCallId) {
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

    this.setState({
      userList: responseJson.data,
      messageUser: responseJson.message ? responseJson.message : "",
    }); 
  }

  doButtonBackPressed = () => {
    this.props.navigation.goBack();
  };

  doButtonPressChatMessages = () => {
    this.storeUserAndNavigateOnChatView()
  };

  txtInputUserProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputUserValue: text });
      console.log('textInput', text)
    },
    secureTextEntry: false,
  };

  onPressUserSubmitting = () => {
    console.log("onPress - onPressWatching ");
    this.setState(
      {
        userList: [],
        messageUser:""
      },
      () => {
        let search = this.state.txtInputUserValue ?? ''
        this.getUserList(search);
      }
    );
  };

  async getUserList(search: string) {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserListApiCallId = requestMessage.messageId;

    let token = await getStorageData(AsyncStorageKey.headerToken);
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

    let apiEndPoint =
      APIEndPoint.endPointAPIGetUserList + APIConstant.markQuestion + APIConstant.paramsQuery + APIConstant.markEqual + search

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    console.log("getUserList API request  ", requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleRowItemOnPressUser(itmId: UserResponse) {
    this.setState({ currentSelectedUser: itmId });
  }

  storeUserAndNavigateOnChatView = async () => {
    const userData = {
      userID: this.state.currentSelectedUser?.id ?? "",
      userName: this.state.currentSelectedUser?.attributes.user_name ?? "",
      userRole: this.state.currentSelectedUser?.attributes.profile_account_categories_id.name ?? "",
      userPic: this.state.currentSelectedUser?.attributes.profile_pic ?? "",
      userPoints: this.state.currentSelectedUser?.attributes.points ?? "",
    }
    //this.props.navigation.navigate("ChatView", { receiverUser: userData })
    const dmSelected = await getStorageData(AsyncStorageKey.chatTypeDm)
    dmSelected === "true"
     ? this.props.navigation.navigate("ChatView", { receiverUser: userData }) 
     : this.props.navigation.navigate("PMCompose", { receiverUser: userData })
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
    this.props.navigation.navigate("ChatView", { receiverUser: userData, conversationID: conversationID })
  }

  // Customizable Area End
}

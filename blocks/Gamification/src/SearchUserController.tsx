import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { APIConstant, APIEndPoint, APIRequest } from "../../../framework/src/AppConstant";
import { UserResponse } from "./domain/gamification.dto";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

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
  chatList: [];
  isVisibleModal: boolean;
  txtInputValue: string;
  currentSelectedUser: UserResponse | null;
  txtInputUserValue: string;
  userList: UserResponse[];
  message: string;
  loader: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchUserController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getConversationListApiCallId: string = "";
  getUserListApiCallId: string = "";
  getSearchUserListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  deleteConversationApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);


    this.subScribedMessages = [
      // Customizable Area Start
      // getName(MessageEnum.SessionResponseMessage),
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
      txtInputValue: "",
      currentSelectedUser: null,
      txtInputUserValue: "",
      userList: [],
      message: "",
      loader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getUserList()
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);

      if (apiRequestCallId === this.getSearchUserListApiCallId) {
        this.setState({
          userList: responseJson.data,
          message: responseJson.message ? responseJson.message : "",
          loader: false
        });
      }
      else if (apiRequestCallId === this.getUserListApiCallId) {
        this.setState({
          userList: responseJson.data,
          loader: false
        });
      }
    }
  }

  txtInputUserProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputUserValue: text });
    },
    secureTextEntry: false,
  };


  onPressUserSubmitting = () => {
    this.setState(
      {
        userList: [],
        message: ""
      },
      () => {
        let search = this.state.txtInputUserValue ?? ''
        search === "" ? this.getUserList() : this.getSearchUserList(search);
      }
    );
  };

  async getSearchUserList(search: string) {
    this.setState({ loader: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSearchUserListApiCallId = requestMessage.messageId;

    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA'
    // await AsyncStorage.getItem(AsyncStorageKey.headerToken);
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
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getUserList() {
    this.setState({ loader: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserListApiCallId = requestMessage.messageId;

    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA'
    // await AsyncStorage.getItem(AsyncStorageKey.headerToken);
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
      configJSON.getUsersListApiEndpoint

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleRowItemOnPressUser(itmId: UserResponse) {
    this.setState({ currentSelectedUser: itmId });
    const setUserData = this.props.navigation.getParam('setUserData');
    setUserData(itmId);
    this.props.navigation.goBack()
  }
  // Customizable Area End
}
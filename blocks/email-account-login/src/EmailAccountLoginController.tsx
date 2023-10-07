import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert, AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { AppleLoginResponse } from "../../AppleLogin2/src/AppleLogin2Controller";
import { isStringNullOrBlank, showAlertView } from "../../../framework/src/BlockHelper";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isLoading: boolean;
  userId: string;
  identityToken: string;
  email: string;
  firstName: string;
  lastName: string;
  isNetConnected: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  appleSignInApiCallId: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.appleSignInApiCallId = "";
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isLoading: false,
      userId: "",
      identityToken: "",
      email: "",
      firstName: "",
      lastName: "",
      isNetConnected: true,
      // Customizable Area End
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    NetInfo.addEventListener((state) => {
      this.setState({ isNetConnected: state.isConnected });
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.appleSignInApiCallId) {
          this.onLoginSuccessRedirectOnScreen();
        }
      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      }
      this.setState({ isLoading: false });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  startLoading = () => {
    this.setState({ isLoading: true });
  };

  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  responseApple = (response: AppleLoginResponse | undefined) => {
    this.stopLoading();
    if (response) {
      if (response.success) {
        if(response.data){
          let data = response.data;
          this.setState(
            {
              userId: data.userId,
              identityToken: data.identityToken,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
            },
            () => {
              this.callAppleSignInAPI();
            }
          );
        }
      } else {
        //Show message as per the error
        showAlertView(
          configJSON.alertTitle,
          response.error?.message ?? "Error: something went wrong"
        );
      }
    }
  };

  appleViewPress = () => {
    this.startLoading();
  };

  prepareHttpBody = () => {
    let httpBody: {
      user: string;
      identityToken: string;
      email?: string;
      first_name?: string;
      last_name?: string;
    };
    httpBody = {
      user: this.state.userId,
      identityToken: this.state.identityToken,
    };
    let email = this.state.email;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    if (!isStringNullOrBlank(email)) {
      httpBody = { ...httpBody, email: email };
    }
    if (!isStringNullOrBlank(firstName)) {
      httpBody = { ...httpBody, first_name: firstName };
    }
    if (!isStringNullOrBlank(lastName)) {
      httpBody = { ...httpBody, last_name: lastName };
    }
    return httpBody;
  };

  callAppleSignInAPI = async () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.appleSignInApiCallId = requestMessage.messageId;
    const header = {
      "Content-Type": configJSON.apiContentType,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAppleSignInApiEndPoints
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(this.prepareHttpBody())
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onLoginSuccessRedirectOnScreen() {
    Alert.alert(configJSON.alertTitle, configJSON.signInSuccessfully, [
      { text: configJSON.okay, onPress: () => this.navigateOnNextScreen() },
    ]);
  }

  navigateOnNextScreen() {
    AsyncStorage.setItem("isUserLogin", JSON.stringify(true));
    this.props.navigation.replace(configJSON.navigationAfterSuccess);
  }
  // Customizable Area End
}

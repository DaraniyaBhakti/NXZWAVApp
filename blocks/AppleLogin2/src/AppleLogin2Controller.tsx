import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  appleAuth,
  AppleRequestResponse,
} from "@invertase/react-native-apple-authentication";
import { AsyncStorage, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { ButtonTitles } from "./AppleLogin2";
import { isStringNullOrBlank, showAlertView } from "../../../framework/src/BlockHelper";
export interface AppleLoginResponse {
  success: boolean;
  data?: {
    userId: string;
    identityToken: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  error?: {
    code: string;
    message: string;
  };
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  testId :string;
  buttonTitle: ButtonTitles;
  callback: (response?: AppleLoginResponse) => void;
  onPress: () => void;
}

interface S {
  // Customizable Area Start
  isNetConnected: boolean;
  userId: string;
  identityToken: string;
  email: string;
  firstName: string;
  lastName: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AppleLogin2Controller extends BlockComponent<
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
      isNetConnected: true,
      userId: "",
      identityToken: "",
      email: "",
      firstName: "",
      lastName: "",
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

  // Customizable Area Start
  handleSignInWithApple = async () => {
    if (!this.state.isNetConnected) {
      this.noInternetConnection();
      return;
    }
    if (Platform.OS === "ios" && appleAuth.isSupported) {
      this.appleSignInIos();
    }
  };

  noInternetConnection = () => {
    this.showAlert(configJSON.alertTitle, configJSON.noInternetAlertMessage);
  };

  appleSignInIos = async () => {
    try {
      if(this.props.onPress != null){
        this.props.onPress();
      }
      const appleAuthRequestResponse: AppleRequestResponse =
        await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        this.getAppleAuthResponse(appleAuthRequestResponse);
        let appleResponse = await AsyncStorage.getItem(
          appleAuthRequestResponse.user
        );
        this.setUserDetailIfItHas("" + appleResponse, appleAuthRequestResponse);
      }
    } catch (error) {
      this.handleAppleCatchError(error?.code?? "")
    }
  };

  handleAppleCatchError(errorCode:string){
    if (this.props.callback != null) {
      const response: AppleLoginResponse = {
        success: false,
        error: {
          code: errorCode ?? "",
          message: this.getAppleErrorMessage(errorCode)
        },
      };
      this.props.callback(response);
    } 
  }

  getAppleErrorMessage(errorCode:string): string{
    let message = "unknown error"
    if (errorCode === appleAuth.Error.CANCELED) {
      message = "The user canceled the authorization attempt."
    }
    else if (errorCode === appleAuth.Error.INVALID_RESPONSE) {
      message = "The authorization request received an invalid response."
    }
    else if (errorCode === appleAuth.Error.NOT_HANDLED) {
      message = "The authorization request wasn't handled."
    } 
    else if (errorCode === appleAuth.Error.FAILED) {
      message = "The authorization attempt failed."
    }else if (errorCode === appleAuth.Error.UNKNOWN) {
      message = "The authorization attempt failed for an unknown reason."
    } 
    return message
  }

  getAppleAuthResponse = async (
    appleAuthRequestResponse: AppleRequestResponse
  ) => {
    AsyncStorage.setItem(
      "userId",
      JSON.stringify(appleAuthRequestResponse.user)
    );
    AsyncStorage.setItem(
      "identityToken",
      JSON.stringify(appleAuthRequestResponse.identityToken)
    );

    let email = appleAuthRequestResponse.email
      ? appleAuthRequestResponse.email
      : "";
    if (!isStringNullOrBlank(email)) {
      //Store response to use for next time
      AsyncStorage.setItem(
        appleAuthRequestResponse.user,
        JSON.stringify(appleAuthRequestResponse)
      );
    }
  };

  setUserDetailIfItHas = async (
    appleResponse: string,
    appleAuthRequestResponse: AppleRequestResponse
  ) => {
    let email = "";
    let firstName = "";
    let lastName = "";
    if (appleResponse && JSON.parse(appleResponse)) {
      let appleStoreResponse = JSON.parse(appleResponse);
      if (!isStringNullOrBlank(JSON.stringify(appleStoreResponse.email))) {
        email = appleStoreResponse.email;
      }
      if (!isStringNullOrBlank(appleStoreResponse.fullName?.givenName)) {
        firstName = appleStoreResponse.fullName?.givenName;
      }
      if (!isStringNullOrBlank(appleStoreResponse.fullName?.familyName)) {
        lastName = appleStoreResponse.fullName?.familyName;
      }
    }

    this.setState(
      {
        userId: appleAuthRequestResponse.user,
        identityToken: "" + appleAuthRequestResponse.identityToken,
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
      () => {
        this.validateData();
      }
    );
  };

  isValidate = () => {
    if (
      isStringNullOrBlank(this.state.userId) ||
      isStringNullOrBlank(this.state.identityToken)
    ) {
      this.showAlert(configJSON.errorTitle, configJSON.errorMessageAppleLogin);
      return false;
    }
    return true;
  };

  validateData() {
    if (this.isValidate()) {
      //On success give response on screen      
      if (this.props.callback != null) {
        const response: AppleLoginResponse = {
          success: true,
          data: {
            userId: this.state.userId,
            identityToken: this.state.identityToken,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          },
        };
        this.props.callback(response);
      } else {
        showAlertView(configJSON.alertTitle, "User successfully login");
      }
    }
  }
  // Customizable Area End
}

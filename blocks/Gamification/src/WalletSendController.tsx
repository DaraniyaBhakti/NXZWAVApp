import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgBlast, imgClout, imgPin, imgPush } from "./assets";
import { APIConstant } from "../../../framework/src/AppConstant";
import { UserResponse } from "./domain/gamification.dto";
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
  payAmount: any;
  paySelectedValue: string;
  maxLimit: number;
  payLimit: number;
  userData: UserResponse;
  payImage: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class WalletSendController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiSendPoints: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      payAmount: '',
      paySelectedValue: 'Clout',
      maxLimit: 100000000,
      payLimit: 100000000,
      userData: {
        id: "",
        type: "",
        attributes: {
          user_name: "",
          unlock_amount: "",
          apple_account_id: 0,
          level_name: "",
          points: 0,
          rank: 0,
          profile_account_categories_id: {
            id: 0,
            name: ""
          },
          profile_pic: "",
          cover_pic: ""
        }
      },
      payImage: imgClout,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.apiSendPoints) {

        this.showAlert(
          "",
          responseJson.message,
          ""
        );
        // this.props.navigation.navigate("WalletSentMessage", {
        //   userName: this.state.userData.attributes.user_name,
        //   userImage: this.state.userData.attributes.profile_pic,
        //   pointType: this.state.paySelectedValue,
        //   amount: this.state.payAmount
        // })
      }

    }
    // Customizable Area End
  }

  // Customizable Area Start
  addAmount = (value: string) => {
    if (value === ".") {
      if (!this.state.payAmount.toString().includes(".")) {
        this.setState({ payAmount: this.state.payAmount.toString() + "." })
      }
    } else if ((this.state.payAmount + value).toString().includes(".")) {
      let decimalPlace = (this.state.payAmount + value).toString().split('.')
      if (decimalPlace[1].length < 3) {
        this.setState({ payAmount: parseFloat(this.state.payAmount + value) })
      }
    } else {
      this.setState({ payAmount: parseFloat(this.state.payAmount + value) })
    }

  }

  backSpaceClicked = () => {
    this.setState({
      payAmount: parseFloat((this.state.payAmount.toString().slice(0, -1)) !== "" ? this.state.payAmount.toString().slice(0, -1) : "0"),
    })

  }

  dropdownItems = [
    { value: 'Clout' },
    { value: 'Push' },
    { value: 'Pin' },
    { value: 'Blast' },
  ];

  handlePayDropdownSelect = (value: any) => {
    this.setState({ paySelectedValue: value, payImage: this.setImage(value) })
  };

  setImage = (value: string) => {
    let image = imgClout;
    switch (value) {
      case "Clout": {
        image = imgClout;
        break;
      }
      case "Pin": {
        image = imgPin;
        break;
      }
      case "Push": {
        image = imgPush;
        break;
      }
      case "Blast": {
        image = imgBlast;
        break;
      }
    }
    return image;
  }

  sendWalletPoints = () => {

    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiSendPoints = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putSendPointsApiEndpoint +
      APIConstant.markQuestion +
      "point" +
      APIConstant.markEqual + this.state.payAmount + "&" +
      "user_id" +
      APIConstant.markEqual + this.state.userData.id + "&" +
      "type" + APIConstant.markEqual + this.state.paySelectedValue
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  setUserData = (userData: UserResponse) => {
    this.setState({ userData: userData });
  };

  searchUserClick = () => {
    this.props.navigation.navigate('SearchUser', {
      setUserData: this.setUserData,
      userData: this.state.userData
    })
  }

  goBack() {
    this.props.navigation.goBack()
  }

  // Customizable Area End
}
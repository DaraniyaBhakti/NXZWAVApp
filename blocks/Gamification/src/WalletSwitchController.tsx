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
  isPayAmountSelected: boolean;
  receivedAmount: any;
  payAmount: any;
  paySelectedValue: string;
  receiveSelectedValue: string;
  maxLimit: number;
  payLimit: number;
  payImage: any;
  receiveImage: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class WalletSwitchController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiSwitchWalletPoints: string = "";
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
      isPayAmountSelected: false,
      receivedAmount: "",
      payAmount: '',
      paySelectedValue: 'Clout',
      receiveSelectedValue: 'Push',
      maxLimit: 200000000,
      payLimit: 200000000,
      payImage: imgClout,
      receiveImage: imgPush
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
      if (apiRequestCallId === this.apiSwitchWalletPoints) {
        this.showAlert(
          "",
          responseJson.message,
          ""
        );
      }

    }
    // Customizable Area End
  }


  // Customizable Area Start

  addAmount = (value: string) => {
    if (this.state.isPayAmountSelected) {
      if (value === ".") {
        if (!this.state.payAmount.toString().includes(".")) {
          this.setState({ payAmount: this.state.payAmount.toString() + "." }, () => this.setState({ payLimit: this.state.maxLimit - this.state.payAmount, receivedAmount: this.state.payAmount / 100 }))
        }
      } else {
        this.setState({ payAmount: parseFloat(this.state.payAmount + value) }, () => this.setState({ payLimit: this.state.maxLimit - this.state.payAmount, receivedAmount: this.state.payAmount / 100 }))
      }

    }
    else {
      if (value === ".") {
        if (!this.state.receivedAmount.toString().includes(".")) {
          this.setState({ receivedAmount: this.state.receivedAmount.toString() + "." }, () => this.setState({ payAmount: this.state.receivedAmount * 100, payLimit: this.state.maxLimit - (this.state.receivedAmount * 100) }))
        }
      } else {
        this.setState({ receivedAmount: parseFloat(this.state.receivedAmount + value) }, () => this.setState({ payAmount: this.state.receivedAmount * 100, payLimit: this.state.maxLimit - (this.state.receivedAmount * 100) }))
      }
    }
  }

  backSpaceClicked = () => {
    if (this.state.isPayAmountSelected) {
      this.setState({
        payAmount: parseFloat((this.state.payAmount.toString().slice(0, -1)) !== "" ? this.state.payAmount.toString().slice(0, -1) : "0"),
      }, () => this.setState({ payLimit: this.state.maxLimit - this.state.payAmount, receivedAmount: this.state.payAmount / 100 }))
    }
    else {
      this.setState({
        receivedAmount: parseFloat((this.state.receivedAmount.toString().slice(0, -1)) !== "" ? this.state.receivedAmount.toString().slice(0, -1) : "0"),
      }, () => this.setState({ payAmount: this.state.receivedAmount * 100, payLimit: this.state.maxLimit - (this.state.receivedAmount * 100) }))
    }
  }

  setReceiveAmount = () => {
    this.setState({ isPayAmountSelected: false, })
  }

  setPayAmount = () => {
    this.setState({ isPayAmountSelected: true })
  }

  dropdownItems = [
    { value: 'Clout' },
    { value: 'Push' },
    { value: 'Pin' },
    { value: 'Blast' },
  ];

  handlePayDropdownSelect = (value: string) => {
    this.setState({ paySelectedValue: value?.toLocaleLowerCase(), payImage: this.setImage(value) })
  };

  handleReceiveDropdownSelect = (value: string) => {
    this.setState({ receiveSelectedValue: value?.toLocaleLowerCase(), receiveImage: this.setImage(value) });
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

  swicthWalletPoints = () => {

    let switchType = this.state.paySelectedValue + "-" + this.state.receiveSelectedValue
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiSwitchWalletPoints = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSwitchWalletPointApiEndpoint +
      APIConstant.markQuestion +
      "point1" +
      APIConstant.markEqual + this.state.payAmount + "&" +
      "point2" +
      APIConstant.markEqual + this.state.receivedAmount + "&" +
      "type" + APIConstant.markEqual + switchType
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

  navigateToGamification = () => {
    this.props.navigation.navigate('GamifiedWallet')
  }

  // Customizable Area End
}
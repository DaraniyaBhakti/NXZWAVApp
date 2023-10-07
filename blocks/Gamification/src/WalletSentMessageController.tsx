import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgBlast, imgClout, imgPin, imgPush } from "./assets";
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
  userName: string,
  userImage: string,
  pointType: string,
  pointImage: any,
  amount: any
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class WalletSentMessageController extends BlockComponent<
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

    const navigationParams = this.props.navigation.state.params;
    let userName = navigationParams.userName;
    let userImage = navigationParams.userImage;
    let pointType = navigationParams.pointType;
    let amount = navigationParams.amount;
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
      userName: userName,
      userImage: userImage,
      pointType: pointType,
      pointImage: this.setImage(pointType),
      amount: amount
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  goBack() {
    this.props.navigation.navigate("GamifiedWallet");
  }

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
  // Customizable Area End
}
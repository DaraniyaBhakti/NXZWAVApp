import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  is50PointsSelected: boolean;
  is100PointsSelected: boolean;
  is250PointsSelected: boolean;
  unlockAmount: any;
  selectedFlag: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GamificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      is50PointsSelected: false,
      is100PointsSelected: false,
      is250PointsSelected: false,
      unlockAmount: 0,
      selectedFlag: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
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

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  updateAmount = () => {
    const { navigation } = this.props;
    const callback = navigation.getParam("setUnlockAmountData");
    const amount = this.state.unlockAmount;
    callback(amount);
    this.props.navigation.navigate('EditWavPostCreation')
  };

  async componentDidMount() {
    this.setState({ unlockAmount: this.props.navigation.getParam("postCreationData").unlockAmount })
  }

  addAmount = (value: string) => {
    if (value === ".") {
      if (!this.state.unlockAmount.toString().includes(".")) {
        this.setState({ unlockAmount: this.state.unlockAmount.toString() + "." })
      }
    } else {
      if (this.state.selectedFlag) {
        this.setState({ unlockAmount: (this.state.unlockAmount + parseFloat(value)) })
      } else {
        this.setState({ unlockAmount: parseFloat(this.state.unlockAmount + value) })
      }
    }
  }

  option50Selected = () => {
    this.setState({
      is50PointsSelected: true, selectedFlag: true,
      unlockAmount: this.state.unlockAmount + parseFloat("50")
    })
  }

  option100Selected = () => {
    this.setState({
      is100PointsSelected: true, selectedFlag: true,
      unlockAmount: this.state.unlockAmount + parseFloat("100")
    })
  }

  option250Selected = () => {
    this.setState({
      is250PointsSelected: true, selectedFlag: true,
      unlockAmount: this.state.unlockAmount + parseFloat("250")
    })
  }

  backSpaceClicked = () => {
    let amount = parseFloat(this.state.unlockAmount.toString().slice(0, -1))
    let is50Selected = amount < 50 ? false : this.state.is50PointsSelected
    let is100Selected = amount < 100 ? false : this.state.is100PointsSelected
    let is250Selected = amount < 250 ? false : this.state.is250PointsSelected
    this.setState({
      selectedFlag: false,
      unlockAmount: parseFloat((this.state.unlockAmount.toString().slice(0, -1)) !== "" ? this.state.unlockAmount.toString().slice(0, -1) : "0"),
      is50PointsSelected: this.state.is50PointsSelected ? is50Selected : false,
      is100PointsSelected: this.state.is100PointsSelected ? is100Selected : false,
      is250PointsSelected: this.state.is250PointsSelected ? is250Selected : false,
    })
  }

  navigateToPostCreation = () => {
    this.props.navigation.navigate('EditWavPostCreation')
  }
  // Customizable Area End
}